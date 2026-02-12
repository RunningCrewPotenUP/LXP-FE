"use client";

import { ActionButton } from "@/src/entities/Button";
import APP_ROUTES from "@/src/shared/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import enrollmentSubmitFormStyle from "./style";

type EnrollmentSubmitFormProps = {
  courseId: number;
  instructorName?: string;
  durationInHours?: number;
};

const EnrollmentSubmitForm = ({
  courseId,
  instructorName,
  durationInHours,
}: EnrollmentSubmitFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const safeInstructorName = instructorName ?? "종원컴퍼니";
  const instructorInitial = safeInstructorName.charAt(0) || "크";
  const safeDuration =
    typeof durationInHours === "number" && durationInHours > 0
      ? `${durationInHours}시간`
      : "10시간";

  const handleEnroll = async () => {
    if (isSubmitting) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const response = await fetch(`/api/enrollments?courseId=${courseId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      let message = "수강 등록에 실패했습니다.";
      const rawText = await response.text();

      if (rawText) {
        try {
          const parsed = JSON.parse(rawText) as {
            message?: string;
            error?: { message?: string };
          };

          message = parsed.error?.message ?? parsed.message ?? rawText;
        } catch {
          message = rawText;
        }
      }

      setSubmitError(message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.push(APP_ROUTES.ME);
  };

  return (
    <div className="xl:w-80 h-fit sticky top-6">
      <div className={enrollmentSubmitFormStyle.variants.container}>
        <div className="mb-6">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">
            크루 리더
          </p>
          <div className="flex items-center space-x-3">
            <div className={enrollmentSubmitFormStyle.variants.icon}>
              {instructorInitial}
            </div>
            <div>
              <p className={enrollmentSubmitFormStyle.variants.instructorName}>
                {safeInstructorName}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">강사</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 dark:border-slate-600 pb-3">
            <span className="text-slate-500">소요 시간</span>
            <span className="text-slate-800 dark:text-slate-500 font-bold">
              {safeDuration}
            </span>
          </div>
        </div>

        <ActionButton
          label={isSubmitting ? "합류 처리 중..." : "트랙 합류하기"}
          full
          buttonOptions={{
            type: "button",
            onClick: handleEnroll,
            disabled: isSubmitting,
          }}
        />

        {submitError && (
          <p className="text-sm font-semibold text-red-500 mt-3 text-center">
            {submitError}
          </p>
        )}

        <p className="text-[10px] text-slate-400 text-center mt-4 font-medium leading-relaxed">
          달리던 트랙은 크루 리더가 중단할 때까지 유지됩니다.
        </p>
      </div>
    </div>
  );
};

export default EnrollmentSubmitForm;
