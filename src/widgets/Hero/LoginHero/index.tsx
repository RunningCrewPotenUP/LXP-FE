import { LogInIcon } from "lucide-react";
import { Hero } from "./ui";

const LoginHero = () => {
  return (
    <Hero
      title={
        <>
          러닝크루
          <br />
          로그인
        </>
      }
      description={
        <>
          러닝크루에 오신 것을 환영합니다.
          <br />
          계정에 로그인하여 나만의 학습 여정을 시작하세요!
        </>
      }
      icon={LogInIcon}
      iconSize={100}
      direction="VERTICAL"
    />
  );
};

export default LoginHero;
