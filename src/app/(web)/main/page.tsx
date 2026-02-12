import { SearchIcon } from "lucide-react";
import InputField from "../../../entities/InputField";
import CardContainer from "../../../widgets/CardContainer";
import CategoryControl from "../../../widgets/CategoryControl";
import { CrewHero } from "../../../widgets/Hero/";

export default function Home() {
  return (
    <>
      <main className="">
        <CrewHero />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 gap-2">
          <CategoryControl />

          <InputField icon={SearchIcon} />
        </div>

        <CardContainer
          cardOptions={[
            {
              id: 1,
              title: "4주 만에 피그마 기초 끝내기: 비전공자 실무 UI 디자인",
              description:
                "디자인 툴이 처음이신가요? 이론보다는 직접 그려보며 익히는 실습 중심의 크루입니다. 매주 한 번의 라이브 토론을 통해 서로의 결과물을 피드백합니다.",
              badgeOptions: { label: "디자인" },
              tagOptions: [
                {
                  label: "Figma",
                },
                {
                  label: "디자인",
                },
                {
                  label: "UI/UX",
                },
              ],
            },
            {
              id: 2,
              title: "비전공자를 위한 SQL 첫걸음: 데이터 리터러시 기르기",
              description:
                "데이터가 무서운 문과생을 위한 SQL 입문 과정입니다. 실제 커머스 데이터를 가지고 쿼리를 작성해보며 데이터 문해력을 길러봅시다.",
              badgeOptions: { label: "데이터" },
              tagOptions: [
                {
                  label: "데이터기초",
                },
                {
                  label: "실무응용",
                },
                {
                  label: "MySQL",
                },
              ],
            },
          ]}
        />
      </main>
    </>
  );
}
