"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  ListTreeIcon,
  PlayCircleIcon,
  VideoIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LectureItem = {
  id: string;
  title: string;
  videoUrl?: string;
  order: number;
  durationInSeconds?: number;
};

type SectionItem = {
  id: string;
  title: string;
  order: number;
  lectures: LectureItem[];
};

type LearnViewerProps = {
  sections: SectionItem[];
  courseTitle?: string;
};

const formatDurationLabel = (durationInSeconds?: number) => {
  if (!durationInSeconds || durationInSeconds <= 0) {
    return "미등록";
  }

  const minutes = Math.ceil(durationInSeconds / 60);

  if (minutes < 60) {
    return `${minutes}분`;
  }

  const hour = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  if (remainMinutes === 0) {
    return `${hour}시간`;
  }

  return `${hour}시간 ${remainMinutes}분`;
};

const LearnViewer = ({ sections, courseTitle }: LearnViewerProps) => {
  const firstLecturePosition = useMemo(() => {
    for (const section of sections) {
      if (section.lectures.length > 0) {
        return {
          sectionId: section.id,
          lectureId: section.lectures[0].id,
        };
      }
    }

    return {
      sectionId: "",
      lectureId: "",
    };
  }, [sections]);

  const [selectedSectionId, setSelectedSectionId] = useState(
    firstLecturePosition.sectionId,
  );
  const [selectedLectureId, setSelectedLectureId] = useState(
    firstLecturePosition.lectureId,
  );
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const selectedSection = sections.find(
      (section) => section.id === selectedSectionId,
    );
    const hasSelectedLecture = selectedSection?.lectures.some(
      (lecture) => lecture.id === selectedLectureId,
    );

    if (!selectedSection || !hasSelectedLecture) {
      setSelectedSectionId(firstLecturePosition.sectionId);
      setSelectedLectureId(firstLecturePosition.lectureId);
    }
  }, [firstLecturePosition, sections, selectedLectureId, selectedSectionId]);

  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? null;
  const selectedLecture =
    selectedSection?.lectures.find(
      (lecture) => lecture.id === selectedLectureId,
    ) ?? null;

  return (
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
      <div className="xl:col-span-8 rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
            Lecture Player
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
            {selectedLecture?.title ?? "강의를 선택해주세요."}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {selectedSection?.title
              ? `${selectedSection.title} · ${courseTitle ?? "강의 시청"}`
              : (courseTitle ?? "강의 시청")}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-neutral-700 bg-slate-50/70 dark:bg-neutral-900/30 overflow-hidden aspect-video max-h-[calc(100vh-18rem)]">
          {selectedLecture?.videoUrl ? (
            <video
              key={selectedLecture.id}
              controls
              className="w-full h-full bg-black object-contain"
              src={selectedLecture.videoUrl}
            >
              브라우저가 비디오 재생을 지원하지 않습니다.
            </video>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <VideoIcon size={40} className="text-slate-300 mb-4" />
              <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                재생 가능한 동영상이 없습니다.
              </p>
              <p className="text-sm text-slate-400 mt-1">
                다른 강의를 선택하거나 동영상 URL을 확인해주세요.
              </p>
            </div>
          )}
        </div>

        <div className="text-sm font-semibold rounded-xl border border-slate-100 dark:border-neutral-700 px-4 py-3 bg-slate-50 dark:bg-neutral-700 text-slate-600 dark:text-slate-200 flex items-center gap-2">
          <ClockIcon size={16} />
          <span>
            {selectedLecture
              ? `재생시간: ${formatDurationLabel(selectedLecture.durationInSeconds)}`
              : "재생시간: 미등록"}
          </span>
        </div>
      </div>

      <aside className="xl:col-span-4 rounded-2xl border border-slate-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 shadow-sm xl:sticky xl:top-24 self-start space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <ListTreeIcon size={16} />
            동영상 섹션
          </p>
        </div>

        <div className="space-y-3 max-h-160 overflow-y-auto pr-1">
          {sections.length === 0 ? (
            <p className="rounded-xl border border-slate-100 dark:border-neutral-700 p-3 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-neutral-700/40">
              등록된 섹션이 없습니다.
            </p>
          ) : (
            sections.map((section, sectionIndex) => {
              const isCollapsed = Boolean(collapsedSections[section.id]);

              return (
                <div
                  key={section.id}
                  className="rounded-xl border border-slate-100 dark:border-neutral-700 p-3 bg-slate-50 dark:bg-neutral-700/40"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedSections((prev) => ({
                        ...prev,
                        [section.id]: !prev[section.id],
                      }))
                    }
                    className="flex items-center gap-2 text-left min-w-0 w-full"
                  >
                    {isCollapsed ? (
                      <ChevronRightIcon size={16} className="text-slate-400" />
                    ) : (
                      <ChevronDownIcon size={16} className="text-slate-400" />
                    )}
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                      {`섹션 ${section.order || sectionIndex + 1}. ${section.title}`}
                    </span>
                  </button>

                  {!isCollapsed ? (
                    <div className="mt-3 space-y-1">
                      {section.lectures.length === 0 ? (
                        <p className="text-xs text-slate-400 px-2 py-1">
                          등록된 강의가 없습니다.
                        </p>
                      ) : (
                        section.lectures.map((lecture, lectureIndex) => {
                          const isSelected =
                            section.id === selectedSectionId &&
                            lecture.id === selectedLectureId;

                          return (
                            <button
                              key={lecture.id}
                              type="button"
                              onClick={() => {
                                setSelectedSectionId(section.id);
                                setSelectedLectureId(lecture.id);
                              }}
                              className={`w-full rounded-lg border px-2.5 py-2 text-left transition-colors ${
                                isSelected
                                  ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/20"
                                  : "border-transparent hover:border-slate-200 dark:hover:border-neutral-600"
                              }`}
                            >
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate flex items-center gap-1.5">
                                <PlayCircleIcon
                                  size={14}
                                  className="text-slate-400"
                                />
                                {`${lecture.order || lectureIndex + 1}. ${lecture.title || "제목 없음"}`}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {formatDurationLabel(lecture.durationInSeconds)}
                              </p>
                            </button>
                          );
                        })
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </aside>
    </section>
  );
};

export default LearnViewer;
