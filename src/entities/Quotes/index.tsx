import { TextQuoteIcon } from "lucide-react";
import { Tag } from "../Badge";
import quotesStyle from "./style";

type QuotesProps = {
  description?: string;
  tagOptions?: {
    label: string;
  }[];
};

const Quotes = ({ description, tagOptions }: QuotesProps) => {
  const content =
    description ??
    "이것은 참고로 말하지만 완전 테스트용으로 작성한거기 때문에 알아서 판단하고 잘 선택하길 바랍니다~";

  return (
    <div className={quotesStyle.variants.container}>
      <TextQuoteIcon />

      <div className="flex-1">
        <p className="whitespace-pre-line">{content}</p>

        {tagOptions && tagOptions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tagOptions.map((tagOption, index) => (
              <Tag
                key={`quote-tag-${tagOption.label}-${index}`}
                label={tagOption.label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
