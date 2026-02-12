import { LectureCard } from "@/src/entities/Card";
import Quotes from "@/src/entities/Quotes";
import EnrollmentSubmitForm from "@/src/features/Form/EnrollmentForm/ui/EnrollmentSubmitForm";
import { CourseDetailHero } from "@/src/widgets/Hero";
import { headers } from "next/headers";

type CourseDetailApiResponse = {
  data?: {
    title?: string;
    description?: string;
    badgeOptions?: {
      label: string;
    };
    tagOptions?: {
      label: string;
    }[];
    instructorName?: string;
    durationInHours?: number;
    sections?: {
      id?: number;
      title?: string;
      durationInSeconds?: number;
      order?: number;
      lectures?: {
        id?: number;
        title?: string;
        order?: number;
        durationInSeconds?: number;
      }[];
    }[];
  };
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

const CourseDetailPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const courseDetail = await getCourseDetail(courseId);
  const sections = courseDetail?.sections ?? [];
  const tagOptions = courseDetail?.tagOptions ?? [];

  return (
    <div className="grid grid-rows-1">
      <CourseDetailHero
        title={courseDetail?.title}
        category={courseDetail?.badgeOptions?.label}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:order-1 xl:col-span-8 xl:col-start-1">
          <Quotes
            description={courseDetail?.description}
            tagOptions={tagOptions}
          />
        </div>

        <div className="xl:order-2 xl:col-span-4 xl:col-start-9 xl:row-start-1 xl:row-span-2 xl:sticky xl:top-24 self-start">
          <EnrollmentSubmitForm
            courseId={Number(courseId)}
            instructorName={courseDetail?.instructorName}
            durationInHours={courseDetail?.durationInHours}
          />
        </div>

        <section className="xl:order-3 xl:col-span-8 xl:col-start-1">
          <h2 className="text-neutral-800 dark:text-slate-50 text-2xl font-bold mb-4 ml-2">
            강의 목록
          </h2>
          <div className="space-y-8">
            {sections.length > 0
              ? sections.map((section, index) => (
                  <LectureCard
                    key={`lecture-card-${section.id ?? index}`}
                    tagLabel={`섹션 ${section.order ?? index + 1}`}
                    title={section.title}
                    durationInSeconds={section.durationInSeconds}
                    lectures={section.lectures}
                  />
                ))
              : [<LectureCard key="lecture-card-fallback" />]}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailPage;
