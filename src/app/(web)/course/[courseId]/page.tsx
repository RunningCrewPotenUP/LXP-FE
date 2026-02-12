import { LectureCard } from "@/src/entities/Card";
import Quotes from "@/src/entities/Quotes";
import EnrollmentSubmitForm from "@/src/features/Form/EnrollmentForm/ui/EnrollmentSubmitForm";
import { CourseDetailHero } from "@/src/widgets/Hero";

const CourseDetailPage = () => {
  return (
    <div className="grid grid-rows-1">
      <CourseDetailHero />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:order-1 xl:col-span-8 xl:col-start-1">
          <Quotes />
        </div>

        <div className="xl:order-2 xl:col-span-4 xl:col-start-9 xl:row-start-1 xl:row-span-2 xl:sticky xl:top-24 self-start">
          <EnrollmentSubmitForm />
        </div>

        <section className="xl:order-3 xl:col-span-8 xl:col-start-1">
          <h2 className="text-neutral-800 dark:text-slate-50 text-2xl font-bold mb-4 ml-2">
            강의 목록
          </h2>
          <div className="space-y-8">
            <LectureCard />
            <LectureCard />
            <LectureCard />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailPage;
