"use client";

import APP_ROUTES from "@/src/shared/constants/routes";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import RegistryFormContext from "./model/context";
import { SignUpFormProps } from "./model/props.type";
import { registerAction } from "./model/register.action";
import type { RegistryTag, SignUpFormState, SignUpType } from "./model/types";
import { signUpStyle } from "./style";
import FirstStep from "./ui/FirstStep";
import SecondStep from "./ui/SecondStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const MAX_TAG_SELECTION_COUNT = 5;
const MIN_TAG_SELECTION_COUNT = 3;

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

type TagsApiSuccessResponse = {
  data?: {
    tags?: RegistryTag[];
  };
};

type TagsApiErrorResponse = {
  error?: {
    message?: string;
  };
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
    selectedTagIds: [],
  });

  const [tags, setTags] = useState<RegistryTag[]>([]);
  const [currentTagCategory, setCurrentTagCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [tagLoadError, setTagLoadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTags = async () => {
      setIsLoadingTags(true);
      setTagLoadError("");

      try {
        const response = await fetch("/api/tags", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json()) as
          | TagsApiSuccessResponse
          | TagsApiErrorResponse;

        if (!response.ok) {
          if (!isMounted) {
            return;
          }

          const message =
            "error" in payload
              ? payload.error?.message
              : "태그 목록을 불러오지 못했습니다.";
          setTagLoadError(message ?? "태그 목록을 불러오지 못했습니다.");
          setTags([]);
          return;
        }

        if (!isMounted) {
          return;
        }

        const nextTags = "data" in payload ? payload.data?.tags : undefined;
        setTags(nextTags ?? []);
      } catch {
        if (!isMounted) {
          return;
        }

        setTagLoadError(
          "태그 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
        );
        setTags([]);
      } finally {
        if (isMounted) {
          setIsLoadingTags(false);
        }
      }
    };

    fetchTags();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: SignUpType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const toggleInterest = (tagId: number) => {
    setFormData((prev) => {
      if (prev.selectedTagIds.includes(tagId)) {
        return {
          ...prev,
          selectedTagIds: prev.selectedTagIds.filter((id) => id !== tagId),
        };
      }

      if (prev.selectedTagIds.length >= MAX_TAG_SELECTION_COUNT) {
        alert("관심 주제는 최대 5개까지 선택 가능합니다.");
        return prev;
      }

      return { ...prev, selectedTagIds: [...prev.selectedTagIds, tagId] };
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

    if (formData.selectedTagIds.length < MIN_TAG_SELECTION_COUNT) {
      setSubmitError("최소 3개 이상의 태그를 선택해주세요.");
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
      tagIds: formData.selectedTagIds,
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
    return Array.from(new Set(tags.map((tag) => tag.category)));
  }, [tags]);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    if (currentTagCategory && categories.includes(currentTagCategory)) {
      return;
    }

    setCurrentTagCategory(categories[0]);
  }, [categories, currentTagCategory]);

  const groupedTags = useMemo(() => {
    const filtered = tags.filter(
      (tag) =>
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
      {} as Record<string, RegistryTag[]>,
    );
  }, [currentTagCategory, searchQuery, tags]);

  const selectedTags = useMemo(() => {
    const tagsById = new Map(tags.map((tag) => [tag.tagId, tag]));

    return formData.selectedTagIds
      .map((tagId) => tagsById.get(tagId))
      .filter((tag): tag is RegistryTag => !!tag);
  }, [formData.selectedTagIds, tags]);

  return (
    <RegistryFormContext
      value={{
        formData,
        handleInputChange,
        handleTypeChange,
        toggleInterest,
        selectedTags,
        categories,
        groupedTags,
        currentTagCategory,
        setCurrentTagCategory,
        searchQuery,
        setSearchQuery,
        isLoadingTags,
        tagLoadError,
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
          {step === 2 && <SecondStep />}
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
