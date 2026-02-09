import { SearchIcon } from "lucide-react";
import InputField from "../entities/InputField";
import CardContainer from "../widgets/CardContainer";
import CategoryControl from "../widgets/CategoryControl";
import CrewHero from "../widgets/Hero/CrewHero";

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
              title: "test1",
              description: "test1 description",
              badgeOptions: { label: "개발" },
              tagOptions: [
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
              ],
            },
            {
              title: "test2",
              description: "test2 description",
              badgeOptions: { label: "디자인" },
              tagOptions: [
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
                {
                  label: "tags",
                },
              ],
            },
          ]}
        />
      </main>
    </>
  );
}
