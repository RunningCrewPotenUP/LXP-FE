import CourseForm from "@/src/features/Form/CourseForm";

const CourseCreatePage = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">
          Create Course
        </p>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          강의 개설
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          2단계로 강의 정보를 입력하고 섹션/강의를 구성해보세요.
        </p>
      </header>

      <CourseForm />
    </div>
  );
};

export default CourseCreatePage;
