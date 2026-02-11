"use client";

import { ClockIcon } from "lucide-react";
import { useState } from "react";
import { Tag } from "../../Badge";
import LectureDetailCard from "../LectureDetailCard";
import lectureCardStyle from "./style";

const LectureCard = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={lectureCardStyle.variants.container}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <Tag />

      <h4 className={lectureCardStyle.variants.lectureTitle}>
        데이터베이스의 이해와 SELECT문
      </h4>

      <div className={lectureCardStyle.variants.infoContainer}>
        <ClockIcon size={12} />
        <span className={lectureCardStyle.variants.infoText}>2시간</span>
      </div>

      {toggle && (
        <div
          className="space-y-3 mt-6 inset-0 bg-slate-700/40 rounded-2xl p-4 text-slate-50"
          onClick={(e) => e.defaultPrevented}
        >
          <LectureDetailCard
            order={1}
            title={"기본 키와 외래 키"}
            time={"15분"}
          />
          <LectureDetailCard order={2} title={"SELECT문 기초"} time={"20분"} />
          <LectureDetailCard
            order={3}
            title={"조건에 맞는 데이터 조회하기"}
            time={"25분"}
          />
          <LectureDetailCard order={4} title={"정렬과 페이징"} time={"10분"} />
          <LectureDetailCard
            order={5}
            title={"집계 함수와 그룹화"}
            time={"30분"}
          />
        </div>
      )}
    </div>
  );
};

export default LectureCard;
