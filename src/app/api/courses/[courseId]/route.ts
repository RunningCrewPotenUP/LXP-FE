import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

type UpstreamTag = {
  content?: string;
};

type UpstreamLevel = {
  value?: string;
};

type UpstreamInstructor = {
  name?: string;
};

type UpstreamLecture = {
  id?: number;
  title?: string;
  videoUrl?: string;
  order?: number;
  durationInSeconds?: number;
};

type UpstreamSection = {
  id?: number;
  title?: string;
  durationInSeconds?: number;
  order?: number;
  lectures?: UpstreamLecture[];
};

type UpstreamCourseDetail = {
  id?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  level?: UpstreamLevel;
  instructor?: UpstreamInstructor;
  tags?: UpstreamTag[];
  durationInHours?: number;
  sections?: UpstreamSection[];
};

type UpstreamResponse = {
  data?: UpstreamCourseDetail | null;
  error?: {
    message?: string;
  } | null;
};

const buildCourseDetailUrl = (courseId: number) => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/courses/${courseId}`;
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

const parseCourseId = (value: string) => {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  const parsedCourseId = parseCourseId(courseId);

  if (!parsedCourseId) {
    return NextResponse.json(
      { error: { message: "유효한 강좌 ID가 필요합니다." } },
      { status: 400 },
    );
  }

  const detailUrl = buildCourseDetailUrl(parsedCourseId);

  if (!detailUrl) {
    return NextResponse.json(
      {
        error: {
          message: "API 주소가 설정되지 않았습니다. 환경변수를 확인해주세요.",
        },
      },
      { status: 500 },
    );
  }

  const upstreamResponse = await fetch(detailUrl, {
    method: "GET",
    cache: "no-store",
  });

  const parsedBody = await parseResponseAsJson(upstreamResponse);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      {
        error: {
          message:
            parsedBody?.error?.message ?? "강좌 상세 조회에 실패했습니다.",
        },
      },
      { status: upstreamResponse.status },
    );
  }

  const detailData = parsedBody?.data;

  if (!detailData || typeof detailData.id !== "number" || !detailData.title) {
    return NextResponse.json(
      { error: { message: "강좌 상세 데이터 형식이 올바르지 않습니다." } },
      { status: 502 },
    );
  }

  return NextResponse.json({
    data: {
      id: detailData.id,
      title: detailData.title,
      description: detailData.description,
      thumbnailUrl: detailData.thumbnailUrl,
      badgeOptions: detailData.level?.value
        ? {
            label: detailData.level.value,
          }
        : undefined,
      instructorName: detailData.instructor?.name,
      durationInHours: detailData.durationInHours,
      tagOptions: (detailData.tags ?? [])
        .map((tag) => tag.content)
        .filter((tag): tag is string => !!tag)
        .slice(0, 5)
        .map((tag) => ({
          label: tag,
        })),
      sections: (detailData.sections ?? []).map((section) => ({
        id: section.id,
        title: section.title,
        durationInSeconds: section.durationInSeconds,
        order: section.order,
        lectures: (section.lectures ?? []).map((lecture) => ({
          id: lecture.id,
          title: lecture.title,
          videoUrl: lecture.videoUrl,
          order: lecture.order,
          durationInSeconds: lecture.durationInSeconds,
        })),
      })),
    },
    error: null,
  });
}
