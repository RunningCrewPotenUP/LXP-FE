import Button from "@/src/entities/Button";
import { UsersIcon } from "lucide-react";

const CrewHero = () => {
  return (
    <section className="relative overflow-hidden bg-indigo-600 dark:bg-indigo-800 rounded-4xl p-8 md:p-12 mb-12 text-white shadow-2xl shadow-indigo-200 dark:shadow-indigo-800">
      <div className="relative z-10 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
          오늘 함께 달릴
          <br />
          크루를 찾아보세요!
        </h1>
        <p className="text-indigo-100 mb-8 font-medium leading-relaxed">
          비전공자들을 위한 실무 밀착형 소셜 러닝 플랫폼,
          <br className="hidden md:block" />
          러닝크루에서 당신의 성장을 함께할 동료를 만나보세요.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button variant="primary">지금 참여하기</Button>
          <Button variant="secondary">자세히 알아보기</Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/2 opacity-10 md:opacity-20 pointer-events-none">
        <UsersIcon size={400} className="translate-x-1/4 -translate-y-1/4" />
      </div>
    </section>
  );
};

export default CrewHero;
