import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import LearnViewer from "./ui/LearnViewer";

type CourseDetailApiResponse = {
  data?: {
    id?: number;
    title?: string;
    sections?: {
      id?: number;
      title?: string;
      order?: number;
      lectures?: {
        id?: number;
        title?: string;
        order?: number;
        durationInSeconds?: number;
        videoUrl?: string;
      }[];
    }[];
  };
  error?: {
    message?: string;
  } | null;
};

type EnrollmentCheckApiResponse = {
  data?: unknown[];
  error?: {
    message?: string;
  } | null;
};

const getBaseUrl = async () => {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const forwardedProtocol = headerStore.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
};

const getCourseDetail = async (courseId: string) => {
  if (!courseId) {
    return null;
  }

  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl}/api/courses/${courseId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as CourseDetailApiResponse;
    return result.data ?? null;
  } catch {
    return null;
  }
};

const checkEnrollment = async (courseId: string) => {
  try {
    const baseUrl = await getBaseUrl();
    const cookieHeader = (await cookies()).toString();

    const response = await fetch(
      `${baseUrl}/api/enrollments?courseId=${encodeURIComponent(courseId)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: cookieHeader
          ? {
              cookie: cookieHeader,
            }
          : undefined,
      },
    );

    if (response.status === 401) {
      return { isEnrolled: false, unauthorized: true };
    }

    if (!response.ok) {
      return { isEnrolled: false, unauthorized: false };
    }

    const result = (await response.json()) as EnrollmentCheckApiResponse;
    const enrollments = Array.isArray(result.data) ? result.data : [];

    return {
      isEnrolled: enrollments.length > 0,
      unauthorized: false,
    };
  } catch {
    return { isEnrolled: false, unauthorized: false };
  }
};

const LearnPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  const [courseDetail, enrollmentState] = await Promise.all([
    getCourseDetail(courseId),
    checkEnrollment(courseId),
  ]);

  if (enrollmentState.unauthorized) {
    redirect("/login");
  }

  if (!enrollmentState.isEnrolled) {
    redirect(`/course/${courseId}`);
  }

  const sections = (courseDetail?.sections ?? []).map(
    (section, sectionIndex) => ({
      id: String(section.id ?? `section-${sectionIndex}`),
      title: section.title?.trim() || `섹션 ${sectionIndex + 1}`,
      order: section.order ?? sectionIndex + 1,
      lectures: (section.lectures ?? []).map((lecture, lectureIndex) => ({
        id: String(lecture.id ?? `lecture-${sectionIndex}-${lectureIndex}`),
        title: lecture.title?.trim() || `강의 ${lectureIndex + 1}`,
        order: lecture.order ?? lectureIndex + 1,
        durationInSeconds: lecture.durationInSeconds,
        videoUrl: lecture.videoUrl,
      })),
    }),
  );

  return (
    <div className="grid grid-rows-1">
      <LearnViewer sections={sections} courseTitle={courseDetail?.title} />
    </div>
  );
};

export default LearnPage;
