"use client";

import ActionButton from "@/src/entities/Button/ActionButton";
import Tag from "@/src/entities/Chip";
import InputField from "@/src/entities/InputField";
import Select from "@/src/entities/Select";
import APP_ROUTES from "@/src/shared/constants/routes";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloudUploadIcon,
  ListTreeIcon,
  LoaderCircleIcon,
  PlusIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, DragEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Difficulty = "JUNIOR" | "MIDDLE" | "SENIOR" | "EXPERT";

type CourseTag = {
  tagId: number;
  name: string;
  category: string;
  subCategory: string;
};

type TagsApiSuccessResponse = {
  data?: {
    tags?: CourseTag[];
  };
};

type TagsApiErrorResponse = {
  error?: {
    message?: string;
  };
};

type UploadApiSuccessResponse = {
  data?: {
    fileUrl?: string;
    key?: string;
  };
  error?: {
    message?: string;
    detail?: string;
    code?: string;
    hint?: string;
    upstreamMessage?: string;
  } | null;
};

type CourseCreateResponse = {
  data?: {
    courseId?: number;
    id?: number;
  };
  error?: {
    message?: string;
  } | null;
};

type LectureDraft = {
  id: string;
  title: string;
  videoUrl: string;
  durationSeconds: number;
  fileName: string;
  isUploading: boolean;
  uploadError: string;
};

type SectionDraft = {
  id: string;
  title: string;
  collapsed: boolean;
  lectures: LectureDraft[];
};

const LEVEL_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "JUNIOR", label: "주니어" },
  { value: "MIDDLE", label: "미들" },
  { value: "SENIOR", label: "시니어" },
  { value: "EXPERT", label: "익스퍼트" },
];

const MAX_LECTURES_PER_SECTION = 5;
const MAX_TAG_SELECTION = 5;

const createId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createLectureDraft = (order: number): LectureDraft => ({
  id: createId(),
  title: `강의 ${order}`,
  videoUrl: "",
  durationSeconds: 0,
  fileName: "",
  isUploading: false,
  uploadError: "",
});

const createSectionDraft = (order: number): SectionDraft => ({
  id: createId(),
  title: `섹션 ${order}`,
  collapsed: false,
  lectures: [createLectureDraft(1)],
});

const formatDurationLabel = (durationSeconds: number) => {
  if (!durationSeconds || durationSeconds <= 0) {
    return "미등록";
  }

  if (durationSeconds >= 3600 && durationSeconds % 3600 === 0) {
    return `${durationSeconds / 3600}시간`;
  }

  return `${Math.ceil(durationSeconds / 60)}분`;
};

const extractCourseId = (payload: CourseCreateResponse) => {
  const candidate = payload.data?.courseId ?? payload.data?.id;
  if (typeof candidate !== "number" || !Number.isSafeInteger(candidate)) {
    return null;
  }

  return candidate;
};

const getVideoDurationSeconds = (file: File) =>
  new Promise<number>((resolve, reject) => {
    const videoElement = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    videoElement.preload = "metadata";
    videoElement.src = objectUrl;

    videoElement.onloadedmetadata = () => {
      const duration = Number.isFinite(videoElement.duration)
        ? Math.max(1, Math.round(videoElement.duration))
        : 0;
      URL.revokeObjectURL(objectUrl);
      resolve(duration);
    };

    videoElement.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("영상 길이를 확인할 수 없습니다."));
    };
  });

const CourseForm = () => {
  const router = useRouter();
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const [tags, setTags] = useState<CourseTag[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagLoadError, setTagLoadError] = useState("");

  const [sections, setSections] = useState<SectionDraft[]>([
    createSectionDraft(1),
  ]);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedLectureId, setSelectedLectureId] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedSectionId((prev) => prev || sections[0]?.id || "");
  }, [sections]);

  useEffect(() => {
    const selectedSection = sections.find(
      (section) => section.id === selectedSectionId,
    );
    const fallbackLectureId = selectedSection?.lectures[0]?.id ?? "";

    setSelectedLectureId((prev) => {
      if (!selectedSection) {
        return "";
      }

      const exists = selectedSection.lectures.some(
        (lecture) => lecture.id === prev,
      );
      return exists ? prev : fallbackLectureId;
    });
  }, [sections, selectedSectionId]);

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

        const nextTags = "data" in payload ? payload.data?.tags : [];
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

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) ?? null,
    [sections, selectedSectionId],
  );

  const selectedLecture = useMemo(
    () =>
      selectedSection?.lectures.find(
        (lecture) => lecture.id === selectedLectureId,
      ) ?? null,
    [selectedLectureId, selectedSection],
  );

  const groupedTags = useMemo(() => {
    return tags.reduce<Record<string, CourseTag[]>>((acc, tag) => {
      const key = tag.category;
      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(tag);
      return acc;
    }, {});
  }, [tags]);

  const isStep1Valid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    Boolean(difficulty) &&
    selectedTagIds.length > 0;

  const getSelectedIndices = () => {
    const sectionIndex = sections.findIndex(
      (section) => section.id === selectedSectionId,
    );
    const lectureIndex =
      sectionIndex >= 0
        ? sections[sectionIndex].lectures.findIndex(
            (lecture) => lecture.id === selectedLectureId,
          )
        : -1;

    return { sectionIndex, lectureIndex };
  };

  const updateSelectedLecture = (
    updater: (lecture: LectureDraft) => LectureDraft,
  ) => {
    const { sectionIndex, lectureIndex } = getSelectedIndices();

    if (sectionIndex < 0 || lectureIndex < 0) {
      return;
    }

    setSections((prev) => {
      const next = [...prev];
      const section = { ...next[sectionIndex] };
      const lectures = [...section.lectures];
      lectures[lectureIndex] = updater(lectures[lectureIndex]);
      section.lectures = lectures;
      next[sectionIndex] = section;
      return next;
    });
  };

  const updateSelectedSection = (
    updater: (section: SectionDraft) => SectionDraft,
  ) => {
    const { sectionIndex } = getSelectedIndices();

    if (sectionIndex < 0) {
      return;
    }

    setSections((prev) => {
      const next = [...prev];
      next[sectionIndex] = updater(next[sectionIndex]);
      return next;
    });
  };

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }

      if (prev.length >= MAX_TAG_SELECTION) {
        alert("태그는 최대 5개까지 선택할 수 있습니다.");
        return prev;
      }

      return [...prev, tagId];
    });
  };

  const uploadFileToR2 = async (file: File, resource: "video" | "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource", resource);

    const uploadResponse = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const payload = (await uploadResponse.json()) as UploadApiSuccessResponse;

    if (!uploadResponse.ok) {
      const errorMessage =
        payload.error?.message ?? "파일 업로드에 실패했습니다.";
      const upstreamMessage = payload.error?.upstreamMessage;
      const code = payload.error?.code;
      const hint = payload.error?.hint;
      const detail = payload.error?.detail;

      const parts = [
        errorMessage,
        code ? `code: ${code}` : "",
        upstreamMessage ? `upstream: ${upstreamMessage}` : "",
        hint ? `hint: ${hint}` : "",
        detail ? `detail: ${detail}` : "",
      ].filter(Boolean);

      throw new Error(parts.join("\n"));
    }

    const fileUrl = payload.data?.fileUrl;

    if (!fileUrl) {
      throw new Error("업로드 결과 URL을 확인할 수 없습니다.");
    }

    return fileUrl;
  };

  const handleThumbnailSelect = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSubmitError("썸네일은 이미지 파일만 등록할 수 있습니다.");
      event.target.value = "";
      return;
    }

    setSubmitError("");
    setIsUploadingThumbnail(true);

    try {
      const fileUrl = await uploadFileToR2(file, "image");
      setThumbnailUrl(fileUrl);
      setThumbnailName(file.name);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "썸네일 업로드에 실패했습니다.",
      );
    } finally {
      setIsUploadingThumbnail(false);
      event.target.value = "";
    }
  };

  const handleLectureVideoUpload = async (file: File) => {
    if (!selectedLecture) {
      return;
    }

    if (!file.type.startsWith("video/")) {
      updateSelectedLecture((lecture) => ({
        ...lecture,
        uploadError: "동영상 파일만 등록할 수 있습니다.",
      }));
      return;
    }

    updateSelectedLecture((lecture) => ({
      ...lecture,
      isUploading: true,
      uploadError: "",
    }));

    try {
      const [durationSeconds, videoUrl] = await Promise.all([
        getVideoDurationSeconds(file),
        uploadFileToR2(file, "video"),
      ]);

      updateSelectedLecture((lecture) => ({
        ...lecture,
        fileName: file.name,
        videoUrl,
        durationSeconds,
        isUploading: false,
        uploadError: "",
      }));
    } catch (error) {
      updateSelectedLecture((lecture) => ({
        ...lecture,
        isUploading: false,
        uploadError:
          error instanceof Error
            ? error.message
            : "동영상 업로드에 실패했습니다.",
      }));
    }
  };

  const handleLectureFileSelect = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await handleLectureVideoUpload(file);
    event.target.value = "";
  };

  const handleVideoDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    await handleLectureVideoUpload(file);
  };

  const handleNextStep = () => {
    if (!isStep1Valid) {
      setSubmitError("STEP1 필수값(제목, 설명, 난이도, 태그)을 입력해주세요.");
      return;
    }

    setSubmitError("");
    setStep(2);
  };

  const addSection = () => {
    setSubmitError("");
    setSections((prev) => {
      const nextSection = createSectionDraft(prev.length + 1);
      const next = [...prev, nextSection];
      setSelectedSectionId(nextSection.id);
      setSelectedLectureId(nextSection.lectures[0].id);
      return next;
    });
  };

  const removeSection = (sectionId: string) => {
    setSubmitError("");

    setSections((prev) => {
      if (prev.length <= 1) {
        setSubmitError("섹션은 최소 1개 이상 필요합니다.");
        return prev;
      }

      const next = prev.filter((section) => section.id !== sectionId);

      if (selectedSectionId === sectionId) {
        const fallbackSection = next[0];
        setSelectedSectionId(fallbackSection.id);
        setSelectedLectureId(fallbackSection.lectures[0].id);
      }

      return next;
    });
  };

  const addLecture = (sectionId: string) => {
    setSubmitError("");

    setSections((prev) => {
      const next = prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        if (section.lectures.length >= MAX_LECTURES_PER_SECTION) {
          setSubmitError("한 섹션에는 강의를 최대 5개까지 등록할 수 있습니다.");
          return section;
        }

        const nextLecture = createLectureDraft(section.lectures.length + 1);
        setSelectedSectionId(sectionId);
        setSelectedLectureId(nextLecture.id);

        return {
          ...section,
          collapsed: false,
          lectures: [...section.lectures, nextLecture],
        };
      });

      return next;
    });
  };

  const removeLecture = (sectionId: string, lectureId: string) => {
    setSubmitError("");

    setSections((prev) => {
      const next = prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        if (section.lectures.length <= 1) {
          setSubmitError("각 섹션에는 최소 1개의 강의가 필요합니다.");
          return section;
        }

        const nextLectures = section.lectures.filter(
          (lecture) => lecture.id !== lectureId,
        );

        if (
          sectionId === selectedSectionId &&
          lectureId === selectedLectureId
        ) {
          setSelectedLectureId(nextLectures[0]?.id ?? "");
        }

        return {
          ...section,
          lectures: nextLectures,
        };
      });

      return next;
    });
  };

  const validateStep2 = () => {
    if (sections.length === 0) {
      return "섹션은 최소 1개 이상 필요합니다.";
    }

    for (const section of sections) {
      if (!section.title.trim()) {
        return "섹션 제목을 입력해주세요.";
      }

      if (section.lectures.length === 0) {
        return "각 섹션에는 최소 1개의 강의가 필요합니다.";
      }

      if (section.lectures.length > MAX_LECTURES_PER_SECTION) {
        return "한 섹션에는 강의를 최대 5개까지 등록할 수 있습니다.";
      }

      for (const lecture of section.lectures) {
        if (!lecture.title.trim()) {
          return "강의 제목을 입력해주세요.";
        }

        if (!lecture.videoUrl) {
          return "모든 강의에 동영상을 등록해주세요.";
        }

        if (!lecture.durationSeconds || lecture.durationSeconds <= 0) {
          return "동영상 길이를 확인할 수 없는 강의가 있습니다.";
        }
      }
    }

    return "";
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!isStep1Valid) {
      setSubmitError("STEP1 필수값을 먼저 입력해주세요.");
      setStep(1);
      return;
    }

    const step2Error = validateStep2();
    if (step2Error) {
      setSubmitError(step2Error);
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      level: difficulty,
      tagIds: selectedTagIds,
      thumbnailUrl: thumbnailUrl || undefined,
      sections: sections.map((section, sectionIndex) => ({
        title: section.title.trim(),
        order: sectionIndex + 1,
        lectures: section.lectures.map((lecture, lectureIndex) => ({
          title: lecture.title.trim(),
          videoUrl: lecture.videoUrl,
          durationSeconds: lecture.durationSeconds,
          order: lectureIndex + 1,
        })),
      })),
    };

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as CourseCreateResponse;

      if (!response.ok) {
        setSubmitError(result.error?.message ?? "강의 생성에 실패했습니다.");
        setIsSubmitting(false);
        return;
      }

      const createdCourseId = extractCourseId(result);

      if (createdCourseId) {
        router.push(`${APP_ROUTES.COURSE_DETAIL}/${createdCourseId}`);
        return;
      }

      router.push(APP_ROUTES.MAIN);
    } catch {
      setSubmitError("강의 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 text-sm">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
              step === 1
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-500 dark:bg-neutral-700 dark:text-slate-300"
            }`}
          >
            STEP 1
          </button>
          <span className="text-slate-300">/</span>
          <button
            type="button"
            onClick={() => {
              if (isStep1Valid) {
                setStep(2);
              }
            }}
            className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
              step === 2
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-500 dark:bg-neutral-700 dark:text-slate-300"
            }`}
          >
            STEP 2
          </button>
        </div>
      </div>

      {step === 1 ? (
        <section className="rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-5 sm:p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              label="강의 제목"
              inputOptions={{
                value: title,
                onChange: (event) => setTitle(event.target.value),
                placeholder: "강의 제목을 입력해주세요.",
                maxLength: 120,
              }}
            />

            <Select
              label="난이도"
              options={LEVEL_OPTIONS}
              selectOptions={{
                value: difficulty,
                onChange: (event) =>
                  setDifficulty(event.target.value as Difficulty),
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-800 dark:text-slate-100">
              강의 설명
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="강의 설명을 입력해주세요."
              maxLength={2000}
              className="w-full min-h-36 resize-y border rounded-xl py-3 px-4 text-sm outline-none transition-all shadow-sm bg-slate-50 dark:bg-neutral-800 text-slate-700 dark:text-slate-50 border-slate-100 dark:border-neutral-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-neutral-800 dark:text-slate-100">
                태그 선택
              </label>
              <span className="text-xs text-slate-400">
                {selectedTagIds.length}/{MAX_TAG_SELECTION}
              </span>
            </div>

            {isLoadingTags ? (
              <p className="text-sm text-slate-400">
                태그를 불러오는 중입니다.
              </p>
            ) : tagLoadError ? (
              <p className="text-sm text-red-500">{tagLoadError}</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedTags).map(([category, categoryTags]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categoryTags.map((tag) => (
                        <Tag
                          key={tag.tagId}
                          label={tag.name}
                          selected={selectedTagIds.includes(tag.tagId)}
                          onClick={() => toggleTag(tag.tagId)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-800 dark:text-slate-100">
              썸네일 (선택)
            </label>

            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailSelect}
              className="hidden"
            />

            <div className="flex flex-wrap gap-2 items-center">
              <ActionButton
                label={isUploadingThumbnail ? "업로드 중" : "썸네일 업로드"}
                icon={isUploadingThumbnail ? LoaderCircleIcon : CloudUploadIcon}
                variant="border"
                buttonOptions={{
                  type: "button",
                  disabled: isUploadingThumbnail,
                  onClick: () => thumbnailInputRef.current?.click(),
                }}
              />
              {thumbnailName ? (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {thumbnailName}
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  등록된 썸네일 없음
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <ActionButton
              label="STEP2로 이동"
              variant="primary"
              buttonOptions={{
                type: "button",
                onClick: handleNextStep,
              }}
            />
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-8 rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 sm:p-6 shadow-sm space-y-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                Lecture Editor
              </p>
              <InputField
                label="섹션 제목"
                inputOptions={{
                  value: selectedSection?.title ?? "",
                  onChange: (event) =>
                    updateSelectedSection((section) => ({
                      ...section,
                      title: event.target.value,
                    })),
                  placeholder: "섹션 제목을 입력해주세요.",
                }}
              />
            </div>

            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleVideoDrop}
              className="min-h-90 sm:min-h-115 rounded-2xl border-2 border-dashed border-slate-200 dark:border-neutral-600 bg-slate-50/70 dark:bg-neutral-900/30 flex flex-col justify-center items-center text-center px-6"
            >
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleLectureFileSelect}
                className="hidden"
              />

              <VideoIcon size={40} className="text-slate-300 mb-4" />

              <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                동영상을 드래그하여 등록하세요
              </p>

              <p className="text-sm text-slate-400 mt-1">
                또는 버튼을 눌러 파일을 선택할 수 있습니다.
              </p>

              <ActionButton
                label="동영상 선택"
                variant="border"
                icon={CloudUploadIcon}
                buttonOptions={{
                  type: "button",
                  className: "mt-4",
                  disabled: selectedLecture?.isUploading,
                  onClick: () => videoInputRef.current?.click(),
                }}
              />

              {selectedLecture?.isUploading ? (
                <p className="text-xs text-indigo-500 mt-3">
                  업로드 중입니다...
                </p>
              ) : selectedLecture?.fileName ? (
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <p>{selectedLecture.fileName}</p>
                  <p className="mt-1">
                    길이: {formatDurationLabel(selectedLecture.durationSeconds)}
                  </p>
                </div>
              ) : null}

              {selectedLecture?.uploadError ? (
                <p className="text-xs text-red-500 mt-3">
                  {selectedLecture.uploadError}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
              <InputField
                label="강의 제목"
                inputOptions={{
                  value: selectedLecture?.title ?? "",
                  onChange: (event) =>
                    updateSelectedLecture((lecture) => ({
                      ...lecture,
                      title: event.target.value,
                    })),
                  placeholder: "강의 제목을 입력해주세요.",
                }}
              />

              <div className="text-sm font-semibold rounded-xl border border-slate-100 dark:border-neutral-700 px-4 py-3 bg-slate-50 dark:bg-neutral-700 text-slate-600 dark:text-slate-200">
                {selectedLecture
                  ? `재생시간: ${formatDurationLabel(selectedLecture.durationSeconds)}`
                  : "재생시간: 미등록"}
              </div>
            </div>
          </div>

          <aside className="xl:col-span-4 rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 shadow-sm xl:sticky xl:top-24 self-start space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <ListTreeIcon size={16} />
                강의 트리
              </p>

              <ActionButton
                label="섹션 추가"
                variant="secondary"
                icon={PlusIcon}
                buttonOptions={{
                  type: "button",
                  onClick: addSection,
                }}
              />
            </div>

            <div className="space-y-3 max-h-160 overflow-y-auto pr-1">
              {sections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className="rounded-xl border border-slate-100 dark:border-neutral-700 p-3 bg-slate-50 dark:bg-neutral-700/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSections((prev) =>
                          prev.map((item) =>
                            item.id === section.id
                              ? { ...item, collapsed: !item.collapsed }
                              : item,
                          ),
                        )
                      }
                      className="flex items-center gap-2 text-left min-w-0"
                    >
                      {section.collapsed ? (
                        <ChevronRightIcon
                          size={16}
                          className="text-slate-400"
                        />
                      ) : (
                        <ChevronDownIcon size={16} className="text-slate-400" />
                      )}
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {`섹션 ${sectionIndex + 1}. ${section.title}`}
                      </span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => addLecture(section.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                        title="강의 추가"
                      >
                        <PlusIcon size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        title="섹션 삭제"
                      >
                        <Trash2Icon size={15} />
                      </button>
                    </div>
                  </div>

                  {!section.collapsed ? (
                    <div className="mt-3 space-y-1">
                      {section.lectures.map((lecture, lectureIndex) => {
                        const isSelected =
                          section.id === selectedSectionId &&
                          lecture.id === selectedLectureId;

                        return (
                          <div
                            key={lecture.id}
                            className={`rounded-lg border px-2.5 py-2 text-left transition-colors ${
                              isSelected
                                ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/20"
                                : "border-transparent hover:border-slate-200 dark:hover:border-neutral-600"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSectionId(section.id);
                                setSelectedLectureId(lecture.id);
                              }}
                              className="w-full text-left"
                            >
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                {`${lectureIndex + 1}. ${lecture.title || "제목 없음"}`}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {formatDurationLabel(lecture.durationSeconds)}
                              </p>
                            </button>

                            <div className="flex justify-end mt-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  removeLecture(section.id, lecture.id)
                                }
                                className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                title="강의 삭제"
                              >
                                <Trash2Icon size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </aside>
        </section>
      )}

      {submitError ? (
        <p className="text-sm text-red-500 px-1">{submitError}</p>
      ) : null}

      <div className="flex justify-between">
        <ActionButton
          label={step === 1 ? "취소" : "STEP1로"}
          variant="border"
          buttonOptions={{
            type: "button",
            onClick: () => {
              if (step === 1) {
                router.push(APP_ROUTES.MAIN);
                return;
              }

              setStep(1);
              setSubmitError("");
            },
          }}
        />

        <ActionButton
          label={isSubmitting ? "강의 생성 중" : "강의 생성 완료"}
          icon={isSubmitting ? LoaderCircleIcon : undefined}
          variant="primary"
          buttonOptions={{
            type: "button",
            disabled: isSubmitting,
            onClick: handleSubmit,
          }}
        />
      </div>
    </div>
  );
};

export default CourseForm;
