import Tag from "@/src/entities/Chip";
import { SearchIcon } from "lucide-react";
import { useContext } from "react";
import { InputField } from "..";
import RegistryFormContext from "../../model/context";

const CATEGORY_ORDER = ["서비스", "개발", "디자인", "AI"];

const TagSelector = () => {
  const context = useContext(RegistryFormContext);

  if (!context) {
    return null;
  }

  const orderedCategories = [
    ...CATEGORY_ORDER.filter((category) => context.categories.includes(category)),
    ...context.categories.filter((category) => !CATEGORY_ORDER.includes(category)),
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar">
          {orderedCategories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => {
                context.setCurrentTagCategory(category);
                context.setSearchQuery("");
              }}
              className={`px-6 py-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                context.currentTagCategory === category
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              }`}
            >
              {category}
              {context.currentTagCategory === category && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-75 space-y-6">
        <InputField
          icon={SearchIcon}
          inputOptions={{
            type: "text",
            value: context.searchQuery,
            onChange: (e) => context.setSearchQuery(e.target.value),
            placeholder: `${context.currentTagCategory} 분야 태그 검색`,
          }}
        />

        {context.isLoadingTags ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            태그 목록을 불러오는 중입니다.
          </div>
        ) : context.tagLoadError ? (
          <div className="text-center py-10 text-red-400 text-sm">
            {context.tagLoadError}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(context.groupedTags).length > 0 ? (
              Object.entries(context.groupedTags).map(([subCategory, tags]) => (
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
                        onClick={() => context.toggleInterest(tag.tagId)}
                        selected={context.formData.selectedTagIds.includes(tag.tagId)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
