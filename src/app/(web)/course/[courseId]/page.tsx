import { LectureCard } from "@/src/entities/Card";
import Quotes from "@/src/entities/Quotes";
import EnrollmentSubmitForm from "@/src/widgets/EnrollmentForm/EnrollmentSubmitForm";
import { CourseDetailHero } from "@/src/widgets/Hero";

const CourseDetailPage = () => {
  return (
    <div className="grid grid-rows-1">
      <CourseDetailHero />

      <Quotes />

      <div className="">
        <EnrollmentSubmitForm />
      </div>

      <h2 className="text-neutral-800 dark:text-slate-50 text-2xl font-bold mb-4 ml-2">
        강의 목록
      </h2>
      <div className="space-y-8">
        <LectureCard />
        <LectureCard />
        <LectureCard />
      </div>
    </div>
  );
};

export default CourseDetailPage;
