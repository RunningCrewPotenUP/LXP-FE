"use client";

import TAG_DATA, { TagData } from "@/src/shared/constants/mocks/tags";
import APP_ROUTES from "@/src/shared/constants/routes";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import RegistryFormContext from "./model/context";
import { SignUpFormProps } from "./model/props.type";
import { registerAction } from "./model/register.action";
import type { SignUpFormState, SignUpType } from "./model/types";
import { signUpStyle } from "./style";
import FirstStep from "./ui/FirstStep";
import SecondStep from "./ui/SecondStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const ROLE_BY_TYPE: Record<SignUpType, string> = {
  LEARNER: "LEARNER",
  INSTRUCTOR: "INSTRUCTOR",
};

const LEVEL_BY_CAREER: Record<string, string> = {
  JUNIOR: "JUNIOR",
  MIDDLE: "MIDDLE",
  SENIOR: "SENIOR",
  EXPERT: "EXPERT",
};

const RegistryForm = ({ onComplete }: SignUpFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<SignUpFormState>({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    type: "LEARNER",
    career: "",
    interests: [],
  });

  const [currentTagCategory, setCurrentTagCategory] =
    useState<string>("서비스");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: SignUpType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const toggleInterest = (tagName: string) => {
    setFormData((prev) => {
      if (prev.interests.includes(tagName)) {
        return {
          ...prev,
          interests: prev.interests.filter((tag) => tag !== tagName),
        };
      }

      if (prev.interests.length >= 5) {
        alert("관심 주제는 최대 5개까지 선택 가능합니다.");
        return prev;
      }

      return { ...prev, interests: [...prev.interests, tagName] };
    });
  };

  const isStep1Valid =
    EMAIL_REGEX.test(formData.id) &&
    PASSWORD_REGEX.test(formData.password) &&
    formData.password === formData.confirmPassword &&
    formData.name.trim().length > 0 &&
    formData.career !== "";

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setSubmitError("");
      setStep(2);
      return;
    }

    if (step === 1) {
      setSubmitError(
        "이메일 형식과 비밀번호 규칙을 확인하고 필수값을 입력해주세요.",
      );
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!isStep1Valid) {
      setSubmitError(
        "계정 정보가 올바르지 않습니다. 1단계 입력값을 다시 확인해주세요.",
      );
      setStep(1);
      return;
    }

    const selectedTags = TAG_DATA.filter((tag) =>
      formData.interests.includes(tag.name),
    );
    const tagIds = selectedTags.map((tag) => tag.tagId);

    if (tagIds.length === 0) {
      setSubmitError("최소 1개 이상의 태그를 선택해주세요.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const result = await registerAction({
      email: formData.id,
      password: formData.password,
      name: formData.name,
      role: ROLE_BY_TYPE[formData.type],
      level: LEVEL_BY_CAREER[formData.career] ?? "JUNIOR",
      tagIds,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    onComplete?.();
    router.push(APP_ROUTES.LOGIN);
  };

  const categories = useMemo(() => {
    return Array.from(new Set(TAG_DATA.map((tag) => tag.category)));
  }, []);

  const groupedTags = useMemo(() => {
    const filtered = TAG_DATA.filter(
      (tag: TagData) =>
        tag.category === currentTagCategory &&
        (searchQuery === "" ||
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    return filtered.reduce(
      (acc, tag) => {
        const sub = tag.subCategory;
        if (!acc[sub]) acc[sub] = [];
        acc[sub].push(tag);
        return acc;
      },
      {} as Record<string, TagData[]>,
    );
  }, [currentTagCategory, searchQuery]);

  return (
    <RegistryFormContext
      value={{
        formData,
        handleInputChange,
        handleTypeChange,
        toggleInterest,
        categories,
        groupedTags,
        currentTagCategory,
        setCurrentTagCategory,
        searchQuery,
        setSearchQuery,
        handleNext,
        handleSubmit,
        isSubmitting,
        submitError,
        step,
      }}
    >
      <form className={signUpStyle.variants.container}>
        <div className={signUpStyle.variants.content}>
          {step === 1 && (
            <FirstStep formData={formData} onInputChange={handleInputChange} />
          )}
          {step === 2 && <SecondStep formData={formData} />}
        </div>
        {submitError && (
          <p className="mt-4 text-sm font-semibold text-red-500">
            {submitError}
          </p>
        )}
      </form>
    </RegistryFormContext>
  );
};

export default RegistryForm;
