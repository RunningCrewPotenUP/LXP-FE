import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

type UpstreamResponse = {
  data?: unknown;
  error?: {
    code?: string;
    message?: string;
  } | null;
};

type UpstreamEnrollmentPage = {
  content?: unknown[];
};

const normalizeBaseUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  return API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
};

const buildEnrollUrl = (courseId: number) => {
  const normalizedBaseUrl = normalizeBaseUrl();

  if (!normalizedBaseUrl) {
    return null;
  }

  return `${normalizedBaseUrl}/enrollments?courseId=${courseId}`;
};

const buildEnrollmentsUrl = () => {
  const normalizedBaseUrl = normalizeBaseUrl();

  if (!normalizedBaseUrl) {
    return null;
  }

  return `${normalizedBaseUrl}/enrollments`;
};

const parseResponseAsJson = async (response: Response) => {
  const rawText = await response.text();

  if (!rawText) {
    return null;
  }

  try {
    return JSON.parse(rawText) as UpstreamResponse;
  } catch {
    return null;
  }
};

const parseCourseId = (value: string | null) => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedCourseId = parseCourseId(searchParams.get("courseId"));

  if (!parsedCourseId) {
    return NextResponse.json(
      { error: { message: "유효한 강좌 ID가 필요합니다." } },
      { status: 400 },
    );
  }

  const enrollUrl = buildEnrollUrl(parsedCourseId);

  if (!enrollUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  const cookieHeader = request.headers.get("cookie");
  const headers: HeadersInit = {};

  if (cookieHeader) {
    headers.cookie = cookieHeader;
  }

  const upstreamResponse = await fetch(enrollUrl, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const parsedBody = await parseResponseAsJson(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: parsedBody?.error?.message ?? "수강 등록에 실패했습니다.",
          code: parsedBody?.error?.code,
        },
      },
      { status: upstreamResponse.status },
    );
  }

  return NextResponse.json(
    {
      data: parsedBody?.data ?? null,
      error: null,
    },
    { status: upstreamResponse.status },
  );
}

export async function GET(request: Request) {
  const enrollmentsUrl = buildEnrollmentsUrl();

  if (!enrollmentsUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  const cookieHeader = request.headers.get("cookie");
  const headers: HeadersInit = {};

  if (cookieHeader) {
    headers.cookie = cookieHeader;
  }

  const upstreamResponse = await fetch(enrollmentsUrl, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const parsedBody = await parseResponseAsJson(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        data: [],
        error: {
          message:
            parsedBody?.error?.message ?? "내 수강 목록 조회에 실패했습니다.",
          code: parsedBody?.error?.code,
        },
      },
      { status: upstreamResponse.status },
    );
  }

  const rawData = parsedBody?.data;
  const enrollmentData = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as UpstreamEnrollmentPage | undefined)?.content)
      ? ((rawData as UpstreamEnrollmentPage).content ?? [])
      : [];

  return NextResponse.json(
    {
      data: enrollmentData,
      error: null,
    },
    { status: upstreamResponse.status },
  );
}
