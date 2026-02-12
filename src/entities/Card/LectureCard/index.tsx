"use client";

import { ClockIcon } from "lucide-react";
import { useState } from "react";
import { Tag } from "../../Badge";
import LectureDetailCard from "../LectureDetailCard";
import { LectureCardLectureProps, LectureCardProps } from "./model/props.type";
import lectureCardStyle from "./style";

const formatDuration = (durationInSeconds?: number) => {
  if (!durationInSeconds || durationInSeconds <= 0) {
    return "-";
  }

  if (durationInSeconds >= 3600 && durationInSeconds % 3600 === 0) {
    return `${durationInSeconds / 3600}시간`;
  }

  return `${Math.ceil(durationInSeconds / 60)}분`;
};

const DEFAULT_LECTURES: LectureCardLectureProps[] = [
  { order: 1, title: "기본 키와 외래 키", durationInSeconds: 900 },
  { order: 2, title: "SELECT문 기초", durationInSeconds: 1200 },
  { order: 3, title: "조건에 맞는 데이터 조회하기", durationInSeconds: 1500 },
  { order: 4, title: "정렬과 페이징", durationInSeconds: 600 },
  { order: 5, title: "집계 함수와 그룹화", durationInSeconds: 1800 },
];

const LectureCard = ({
  tagLabel,
  title,
  durationInSeconds,
  lectures,
}: LectureCardProps) => {
  const [toggle, setToggle] = useState(false);
  const safeTitle = title ?? "데이터베이스의 이해와 SELECT문";
  const safeTagLabel = tagLabel ?? "강의";
  const safeLectures =
    lectures && lectures.length > 0 ? lectures : DEFAULT_LECTURES;

  return (
    <div
      className={lectureCardStyle.variants.container}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <Tag label={safeTagLabel} />

      <h4 className={lectureCardStyle.variants.lectureTitle}>{safeTitle}</h4>

      <div className={lectureCardStyle.variants.infoContainer}>
        <ClockIcon size={12} />
        <span className={lectureCardStyle.variants.infoText}>
          {formatDuration(durationInSeconds)}
        </span>
      </div>

      {toggle && (
        <div
          className="space-y-3 mt-6 border border-slate-100 dark:border-neutral-700 inset-0 bg-slate-50 dark:bg-neutral-700/40 rounded-2xl p-4 text-slate-50 shadow-md shadow-slate-200/50 dark:shadow-neutral-900/70"
          onClick={(e) => e.defaultPrevented}
        >
          {safeLectures.map((lecture, index) => (
            <LectureDetailCard
              key={`lecture-detail-${lecture.id ?? index}`}
              order={lecture.order ?? index + 1}
              title={lecture.title ?? "강의"}
              time={formatDuration(lecture.durationInSeconds)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureCard;
