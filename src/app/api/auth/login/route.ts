import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const buildLoginUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/auth/login`;
};

export async function POST(request: Request) {
  const loginUrl = buildLoginUrl();

  if (!loginUrl) {
    return NextResponse.json(
      { message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요." },
      { status: 500 },
    );
  }

  const payload = await request.json();

  const upstreamResponse = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    credentials: "include",
  });

  const responseText = await upstreamResponse.text();
  const response = new NextResponse(responseText, {
    status: upstreamResponse.status,
    headers: {
      "Content-Type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });

  const setCookies = (
    upstreamResponse.headers as Headers & {
      getSetCookie?: () => string[];
    }
  ).getSetCookie?.();

  if (setCookies && setCookies.length > 0) {
    for (const cookie of setCookies) {
      response.headers.append("set-cookie", cookie);
    }
  } else {
    const setCookie = upstreamResponse.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }
  }

  return response;
}
