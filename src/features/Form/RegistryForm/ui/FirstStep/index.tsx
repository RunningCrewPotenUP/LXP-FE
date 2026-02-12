"use client";

import { LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";
import { ChangeEvent, useContext } from "react";
import { ActionButton, InputField, Radio, Select } from "..";
import RegistryFormContext from "../../model/context";
import { FirstStepViewProps } from "../../model/props.type";
import Hero from "./Hero";

const FirstStep = ({ formData, onInputChange }: FirstStepViewProps) => {
  const context = useContext(RegistryFormContext);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onInputChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col">
      <Hero />

      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <InputField
          label="*아이디"
          icon={MailIcon}
          error
          inputOptions={{
            type: "email",
            name: "id",
            placeholder: "이메일을 입력해주세요",
            onChange: onInputChange,
            value: formData.id,
          }}
        />

        <InputField
          label="*비밀번호"
          icon={LockKeyholeIcon}
          inputOptions={{
            type: "password",
            name: "password",
            placeholder: "8자 이상으로 작성해주세요",
            onChange: onInputChange,
            value: formData.password,
          }}
        />

        <InputField
          label="비밀번호 확인"
          icon={LockKeyholeIcon}
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            placeholder: "다시 한번 비밀번호를 입력해주세요",
            onChange: onInputChange,
            value: formData.confirmPassword,
          }}
        />

        <InputField
          label="*이름"
          icon={UserIcon}
          inputOptions={{
            type: "text",
            name: "name",
            placeholder: "본명을 입력해주세요",
            onChange: onInputChange,
            value: formData.name,
          }}
        />

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-50 mb-3">
            *가입 유형
          </label>
          <div className="flex space-x-6">
            <Radio
              name="type"
              value="LEARNER"
              label="일반 회원"
              checked={formData.type === "LEARNER"}
              onChange={onInputChange}
            />
            <Radio
              name="type"
              value="INSTRUCTOR"
              label="강사"
              checked={formData.type === "INSTRUCTOR"}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-50 mb-2">
            *경력
          </label>
          <Select
            label="경력을 선택해주세요"
            options={[
              { value: "JUNIOR", label: "주니어" },
              { value: "MIDDLE", label: "미들" },
              { value: "SENIOR", label: "시니어" },
              { value: "EXPERT", label: "익스퍼트" },
            ]}
            selectOptions={{
              name: "career",
              onChange: handleSelectChange,
              value: formData.career,
            }}
          />
        </div>

        <ActionButton
          label={"다음"}
          full
          buttonOptions={{
            type: "button",
            onClick: () => context?.handleNext(),
          }}
        />
      </div>
    </div>
  );
};

export default FirstStep;
