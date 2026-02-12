import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

type UpstreamTag = {
  content?: string;
};

type UpstreamLevel = {
  value?: string;
};

type UpstreamCourse = {
  id?: number;
  title?: string;
  description?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  level?: UpstreamLevel;
  tags?: UpstreamTag[];
};

type UpstreamCoursePage = {
  content?: UpstreamCourse[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
};

type UpstreamResponse = {
  data?: UpstreamCoursePage;
  error?: {
    message?: string;
  } | null;
};

const buildSearchCoursesUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/courses/search`;
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

export async function GET(request: Request) {
  const searchCoursesUrl = buildSearchCoursesUrl();

  if (!searchCoursesUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "10";
  const keyword = searchParams.get("keyword");

  const sorts = searchParams.getAll("sort");
  const normalizedSorts = sorts.length > 0 ? sorts : ["createdAt,DESC"];

  const upstreamSearchParams = new URLSearchParams();
  upstreamSearchParams.set("page", page);
  upstreamSearchParams.set("size", size);

  for (const sort of normalizedSorts) {
    upstreamSearchParams.append("sort", sort);
  }

  if (keyword) {
    upstreamSearchParams.set("keyword", keyword);
  }

  const upstreamResponse = await fetch(
    `${searchCoursesUrl}?${upstreamSearchParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const parsedBody = await parseResponseAsJson(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        error: {
          message:
            parsedBody?.error?.message ?? "강의 목록 조회에 실패했습니다.",
        },
      },
      { status: upstreamResponse.status },
    );
  }

  const pageData = parsedBody?.data;
  const content = pageData?.content ?? [];

  const cards = content
    .filter((course) => typeof course.id === "number" && !!course.title)
    .map((course) => ({
      id: course.id as number,
      title: course.title as string,
      description: course.description,
      thumbnail:
        course.thumbnailUrl ?? course.imageUrl ?? course.thumbnail ?? undefined,
      badgeOptions: course.level?.value
        ? {
            label: course.level.value,
          }
        : undefined,
      tagOptions: (course.tags ?? [])
        .map((tag) => tag.content)
        .filter((tag): tag is string => !!tag)
        .slice(0, 3)
        .map((tag) => ({
          label: tag,
        })),
    }));

  return NextResponse.json({
    data: {
      cards,
      page: {
        totalElements: pageData?.totalElements ?? cards.length,
        totalPages: pageData?.totalPages ?? 1,
        number: pageData?.number ?? Number(page),
        size: pageData?.size ?? Number(size),
      },
    },
    error: null,
  });
}
