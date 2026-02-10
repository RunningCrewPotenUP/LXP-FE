import { AlertCircle, Check, Search } from "lucide-react";
import { SecondStepViewProps } from "../../model/props.type";

const SecondStep = ({ formData }: SecondStepViewProps) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
        <div className="flex items-center space-x-2 text-indigo-600 mb-2">
          <div className="p-1 bg-white rounded-md shadow-sm">
            <Check size={12} />
          </div>
          <span className="text-sm font-bold">관심 주제</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          관심 있는 주제를 선택하면 맞춤 강좌를 추천받을 수 있습니다.
          <br />
          <span className="text-slate-400 text-xs">*최대 5개 설정 가능</span>
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {formData.interests.length > 0 ? (
            formData.interests.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-indigo-200 text-xs font-bold text-indigo-600 shadow-sm animate-in zoom-in-50"
              >
                {tag}
                <button
                  // onClick={() => toggleInterest(tag)}
                  className="ml-1.5 hover:text-indigo-800"
                >
                  <AlertCircle size={10} className="rotate-45" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-slate-400 px-1 py-1.5">
              선택된 태그가 없습니다.
            </span>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-slate-100">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar">
          {/* Ensure specific order: 서비스, 개발, 디자인, AI if they exist in data */}
          {/* {["서비스", "개발", "디자인", "AI"]
            .filter((cat) => categories.includes(cat))
            .map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCurrentTagCategory(category);
                  setSearchQuery(""); // Reset search when switching categories
                }}
                className={`px-6 py-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                  currentTagCategory === category
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {category}
                {currentTagCategory === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>
                )}
              </button>
            ))} */}
        </div>
      </div>

      {/* Tag Selection Area */}
      <div className="min-h-[300px]">
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            // placeholder={`${currentTagCategory} 분야 태그 검색`}
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-8">
          {/* {Object.keys(groupedTags).length > 0 ? (
            Object.entries(groupedTags).map(([subCategory, tags]) => (
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
                    <button
                      key={tag.tagId}
                      // onClick={() => toggleInterest(tag.name)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        formData.interests.includes(tag.name)
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-700"
                          : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm">
              검색 결과가 없습니다.
            </div>
          )} */}
        </div>
      </div>

      {/* <button
        onClick={handleSubmit}
        disabled={formData.interests.length === 0}
        className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all transform active:scale-[0.99] ${
          formData.interests.length > 0
            ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700"
            : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
        }`}
      >
        회원 가입하기
      </button> */}
    </div>
  );
};

export default SecondStep;
