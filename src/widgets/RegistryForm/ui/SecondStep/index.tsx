import Tag from "@/src/entities/Chip";
import { SearchIcon } from "lucide-react";
import { useContext } from "react";
import { ActionButton, InputField } from "..";
import RegistryFormContext from "../../model/context";
import { SecondStepViewProps } from "../../model/props.type";
import Hero from "./Hero";
import SelectedTag from "./SelectedTag";
import secondStepStyle from "./style";

const SecondStep = ({ formData }: SecondStepViewProps) => {
  const context = useContext(RegistryFormContext);

  return (
    <div className={secondStepStyle.variants.container}>
      <Hero />

      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <div className="flex flex-wrap gap-2">
          {formData.interests.length > 0 ? (
            formData.interests.map((tag, index) => (
              <SelectedTag
                key={tag}
                tag={tag}
                toggleInterest={() => context?.toggleInterest(tag)}
              />
            ))
          ) : (
            <span className="text-xs text-slate-400 px-1 py-1.5">
              선택된 태그가 없습니다.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Category Tabs */}
        <div className="border-b border-slate-100 dark:border-slate-700">
          <div className="flex space-x-1 overflow-x-auto no-scrollbar">
            {/* Ensure specific order: 서비스, 개발, 디자인, AI if they exist in data */}
            {["서비스", "개발", "디자인", "AI"]
              .filter((cat) => context?.categories.includes(cat))
              .map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => {
                    context?.setCurrentTagCategory(category);
                    context?.setSearchQuery("");
                  }}
                  className={`px-6 py-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                    context?.currentTagCategory === category
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  }`}
                >
                  {category}
                  {context?.currentTagCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Tag Selection Area */}
        <div className="min-h-75 space-y-6">
          <InputField
            icon={SearchIcon}
            inputOptions={{
              type: "text",
              value: context?.searchQuery,
              onChange: (e) => context?.setSearchQuery(e.target.value),
              placeholder: `${context?.currentTagCategory} 분야 태그 검색`,
            }}
          />

          <div className="space-y-8">
            {Object.keys(context?.groupedTags ?? {}).length > 0 ? (
              Object.entries(context?.groupedTags ?? {}).map(
                ([subCategory, tags]) => (
                  <div
                    key={subCategory}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                  >
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1 flex items-center">
                      <span className="w-1 h-3 bg-indigo-200 rounded-full mr-2"></span>
                      {subCategory}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {tags.map((tag) => (
                        <Tag
                          key={tag.tagId}
                          label={tag.name}
                          onClick={() => context?.toggleInterest(tag.name)}
                          selected={formData.interests.includes(tag.name)}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>

        <ActionButton label={"다음"} full buttonOptions={{}} />
      </div>
    </div>
  );
};

export default SecondStep;
