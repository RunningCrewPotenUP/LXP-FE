import { UserPlus2Icon } from "lucide-react";
import { IconHero } from "..";

const FirstStepHero = () => {
  return (
    <IconHero
      title={"회원가입"}
      description={"회원가입을 통해 학습을 기록하고 열정을 키우세요"}
      iconSize={80}
      icon={UserPlus2Icon}
    />
  );
};

export default FirstStepHero;
