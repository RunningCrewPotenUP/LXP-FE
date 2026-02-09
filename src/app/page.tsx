import { SearchIcon } from "lucide-react";
import Button from "../entities/Button";
import InputField from "../entities/InputField";
import CrewHero from "../widgets/Hero/CrewHero";
import Sidebar from "../widgets/Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-neutral-900 font-sans text-slate-900">
        <Sidebar />
        <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-300 py-6 px-4 md:py-10 md:px-8">
          <CrewHero />

          <div className="flex flex-col gap-2 lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <div className="flex space-x-2">
                <Button variant="border">전체</Button>
                <Button variant="border">기획</Button>
                <Button variant="border">디자인</Button>
                <Button variant="border">개발</Button>
                <Button variant="border">마케팅</Button>
                <Button variant="border">데이터</Button>
                <Button variant="border">비즈니스</Button>
              </div>
            </div>

            <InputField icon={SearchIcon} />
          </div>
        </main>
      </div>
    </>
  );
}
