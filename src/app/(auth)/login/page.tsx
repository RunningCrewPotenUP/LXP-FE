import InputField from "@/src/entities/InputField";
import { LockIcon, LogInIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { ActionButton, DirectButton, LoginHero } from "./ui";

const LoginPage = () => {
  return (
    <main className="h-full md:flex place-items-center">
      <LoginHero />

      <div className="flex flex-col gap-3 w-full px-0 md:px-6 transition-all">
        <DirectButton label="이전 페이지로 돌아가기" />

        <form className="flex flex-col gap-8 flex-1 w-full">
          <div className="flex flex-col gap-4 w-full">
            <InputField
              icon={UserIcon}
              inputOptions={{
                placeholder: "아이디",
              }}
            />

            <InputField
              icon={LockIcon}
              inputOptions={{
                placeholder: "비밀번호",
                type: "password",
              }}
            />
          </div>

          <ActionButton label="로그인" icon={LogInIcon} />
        </form>
        <ActionButton
          label="회원가입"
          variant="secondary"
          icon={UserPlusIcon}
        />
      </div>
    </main>
  );
};

export default LoginPage;
