"use client";

import APP_ROUTES from "@/src/shared/constants/routes";
import InputField from "@/src/entities/InputField";
import { LockIcon, LogInIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { ActionButton, DirectButton, LoginHero } from "./ui";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
      return;
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!email.trim() || !password.trim()) {
      setSubmitError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    let message = "로그인에 실패했습니다.";

    if (!response.ok) {
      const rawText = await response.text();

      if (rawText) {
        try {
          const data = JSON.parse(rawText);
          if (data?.message && typeof data.message === "string") {
            message = data.message;
          } else {
            message = rawText;
          }
        } catch {
          message = rawText;
        }
      }
    }

    setIsSubmitting(false);

    if (!response.ok) {
      setSubmitError(message);
      return;
    }

    router.push(APP_ROUTES.MAIN);
  };

  return (
    <main className="h-full md:flex place-items-center">
      <LoginHero />

      <div className="flex flex-col gap-3 w-full px-0 md:px-6 transition-all">
        <DirectButton label="이전 페이지로 돌아가기" />

        <form
          className="flex flex-col gap-8 flex-1 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 w-full">
            <InputField
              icon={UserIcon}
              inputOptions={{
                name: "email",
                type: "email",
                placeholder: "아이디",
                value: email,
                onChange: handleInputChange,
              }}
            />

            <InputField
              icon={LockIcon}
              inputOptions={{
                name: "password",
                placeholder: "비밀번호",
                type: "password",
                value: password,
                onChange: handleInputChange,
              }}
            />
          </div>

          <ActionButton
            label={isSubmitting ? "로그인 중..." : "로그인"}
            icon={LogInIcon}
            buttonOptions={{
              type: "submit",
              disabled: isSubmitting,
            }}
          />
        </form>

        {submitError && (
          <p className="text-sm font-semibold text-red-500">{submitError}</p>
        )}

        <ActionButton
          label="회원가입"
          variant="secondary"
          icon={UserPlusIcon}
          buttonOptions={{
            type: "button",
            onClick: () => router.push(APP_ROUTES.REGISTER),
          }}
        />
      </div>
    </main>
  );
};

export default LoginPage;
