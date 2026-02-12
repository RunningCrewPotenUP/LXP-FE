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

const buildUsersRoleUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/users/role`;
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

export async function POST(request: Request) {
  const usersRoleUrl = buildUsersRoleUrl();

  if (!usersRoleUrl) {
    return NextResponse.json(
      {
        data: null,
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

  const upstreamResponse = await fetch(usersRoleUrl, {
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
          message:
            parsedBody?.error?.message ?? "강사로 역할 변경에 실패했습니다.",
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
