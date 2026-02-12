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

const buildCoursesUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/courses`;
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

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const getTagIds = (payload: unknown) => {
  if (!isRecord(payload)) {
    return [] as number[];
  }

  const candidate = payload.tagIds;

  if (!Array.isArray(candidate)) {
    return [] as number[];
  }

  return candidate.filter(
    (value): value is number =>
      typeof value === "number" && Number.isSafeInteger(value) && value > 0,
  );
};

const isTagValidationError = (status: number, message?: string) => {
  if (status < 400 || status >= 500) {
    return false;
  }

  if (!message) {
    return false;
  }

  return /태그|tag/i.test(message);
};

const buildTagPayloadVariants = (payload: unknown) => {
  if (!isRecord(payload)) {
    return [payload];
  }

  const tagIds = getTagIds(payload);

  if (tagIds.length === 0) {
    return [payload];
  }

  const variants: unknown[] = [payload];

  variants.push({
    ...payload,
    tags: tagIds,
  });

  variants.push({
    ...payload,
    tags: tagIds.map((tagId) => ({ tagId })),
  });

  variants.push({
    ...payload,
    tagIdList: tagIds,
  });

  const deduplicated = new Map<string, unknown>();

  for (const variant of variants) {
    const key = JSON.stringify(variant);
    deduplicated.set(key, variant);
  }

  return [...deduplicated.values()];
};

export async function POST(request: Request) {
  const coursesUrl = buildCoursesUrl();

  if (!coursesUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "요청 본문(JSON) 형식이 올바르지 않습니다.",
        },
      },
      { status: 400 },
    );
  }

  const cookieHeader = request.headers.get("cookie");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (cookieHeader) {
    headers.cookie = cookieHeader;
  }

  const requestUpstream = async (payload: unknown) => {
    const upstreamResponse = await fetch(coursesUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const parsedBody = await parseResponseAsJson(upstreamResponse);

    return {
      upstreamResponse,
      parsedBody,
    };
  };

  const primary = await requestUpstream(body);

  if (primary.upstreamResponse.ok) {
    return NextResponse.json(
      {
        data: primary.parsedBody?.data ?? null,
        error: null,
      },
      { status: primary.upstreamResponse.status },
    );
  }

  const initialMessage = primary.parsedBody?.error?.message;

  if (!isTagValidationError(primary.upstreamResponse.status, initialMessage)) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: initialMessage ?? "강의 생성에 실패했습니다.",
          code: primary.parsedBody?.error?.code,
        },
      },
      { status: primary.upstreamResponse.status },
    );
  }

  const variants = buildTagPayloadVariants(body);

  for (let index = 1; index < variants.length; index += 1) {
    const retried = await requestUpstream(variants[index]);

    if (retried.upstreamResponse.ok) {
      return NextResponse.json(
        {
          data: retried.parsedBody?.data ?? null,
          error: null,
        },
        { status: retried.upstreamResponse.status },
      );
    }
  }

  return NextResponse.json(
    {
      data: null,
      error: {
        message: initialMessage ?? "강의 생성에 실패했습니다.",
        code: primary.parsedBody?.error?.code,
      },
    },
    { status: primary.upstreamResponse.status },
  );
}
