import { useContext } from "react";
import { ActionButton } from "..";
import RegistryFormContext from "../../model/context";
import Hero from "./Hero";
import SelectedTag from "./SelectedTag";
import TagSelector from "./TagSelector";
import secondStepStyle from "./style";

const SecondStep = () => {
  const context = useContext(RegistryFormContext);

  if (!context) {
    return null;
  }

  return (
    <div className={secondStepStyle.variants.container}>
      <Hero />

      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <div className="flex flex-wrap gap-2">
          {context.selectedTags.length > 0 ? (
            context.selectedTags.map((tag) => (
              <SelectedTag
                key={tag.tagId}
                tagName={tag.name}
                onRemove={() => context.toggleInterest(tag.tagId)}
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
        <TagSelector />
        <ActionButton
          label={context.isSubmitting ? "가입 중..." : "가입하기"}
          full
          buttonOptions={{
            type: "button",
            disabled: context.isSubmitting,
            onClick: () => context.handleSubmit(),
          }}
        />
      </div>
    </div>
  );
};

export default SecondStep;
