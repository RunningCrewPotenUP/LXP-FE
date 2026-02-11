import { TextQuoteIcon } from "lucide-react";
import quotesStyle from "./style";

const Quotes = () => {
  return (
    <div className={quotesStyle.variants.container}>
      <TextQuoteIcon />

      <p>
        이것은 참고로 말하지만 완전 테스트용으로 작성한거기 때문에 알아서
        판단하고 잘 선택하길 바랍니다~
      </p>
    </div>
  );
};

export default Quotes;
