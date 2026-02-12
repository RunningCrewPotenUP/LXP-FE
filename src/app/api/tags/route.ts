import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

type UpstreamTag = {
  tagId?: number;
  name?: string;
  category?: string;
  subCategory?: string;
  status?: string;
};

type UpstreamResponse = {
  data?:
    | UpstreamTag[]
    | {
        content?: UpstreamTag[];
        tags?: UpstreamTag[];
      };
  error?: {
    message?: string;
  } | null;
};

const isValidTag = (tag: UpstreamTag) =>
  typeof tag.tagId === "number" &&
  typeof tag.name === "string" &&
  typeof tag.category === "string" &&
  typeof tag.subCategory === "string";

const extractTags = (parsedBody: UpstreamResponse | null) => {
  if (!parsedBody) {
    return [] as UpstreamTag[];
  }

  if (Array.isArray(parsedBody.data)) {
    return parsedBody.data;
  }

  if (Array.isArray(parsedBody.data?.content)) {
    return parsedBody.data.content;
  }

  if (Array.isArray(parsedBody.data?.tags)) {
    return parsedBody.data.tags;
  }

  return [] as UpstreamTag[];
};

const buildTagsUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/tags`;
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

export async function GET() {
  const tagsUrl = buildTagsUrl();

  if (!tagsUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  const upstreamResponse = await fetch(tagsUrl, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const parsedBody = await parseResponseAsJson(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        error: {
          message: parsedBody?.error?.message ?? "태그 목록 조회에 실패했습니다.",
        },
      },
      { status: upstreamResponse.status },
    );
  }

  const rawTags = extractTags(parsedBody);
  const tags = rawTags
    .filter(isValidTag)
    .map((tag) => ({
      tagId: tag.tagId as number,
      name: tag.name as string,
      category: tag.category as string,
      subCategory: tag.subCategory as string,
      status: tag.status ?? "ACTIVE",
    }));

  return NextResponse.json({
    data: {
      tags,
    },
    error: null,
  });
}
