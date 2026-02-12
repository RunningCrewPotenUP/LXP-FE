import { TagsIcon } from "lucide-react";
import { IconHero } from "..";

const SecondStepHero = () => {
  return (
    <IconHero
      title={"관심사 설정"}
      description={
        <>
          <span>관심사를 설정해서 맞춤 학습 경험을 누리세요</span>
          <br />
          <span className="text-sm text-slate-50/40">
            최대 5개 까지 설정 가능
          </span>
        </>
      }
      iconSize={80}
      icon={TagsIcon}
    />
  );
};

export default SecondStepHero;
