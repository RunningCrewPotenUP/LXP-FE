"use client";

import TAG_DATA, { TagData } from "@/src/shared/constants/mocks/tags";
import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import RegistryFormContext from "./model/context";
import { SignUpFormProps } from "./model/props.type";
import { signUpStyle } from "./style";
import FirstStep from "./ui/FirstStep";
import SecondStep from "./ui/SecondStep";

type SignUpType = "general" | "instructor";

type SignUpFormState = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  type: SignUpType;
  career: string;
  interests: string[];
};

const RegistryForm = ({ onBack, onComplete }: SignUpFormProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<SignUpFormState>({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    type: "general",
    career: "",
    interests: [],
  });

  const [currentTagCategory, setCurrentTagCategory] =
    useState<string>("서비스");
  const [searchQuery, setSearchQuery] = useState("");

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
    formData.id.length > 0 &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.name.length > 0 &&
    formData.career !== "";

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    alert(`${formData.name}님, 회원가입이 완료되었습니다!`);
    onComplete?.();
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
      </form>
    </RegistryFormContext>
  );
};

export default RegistryForm;
