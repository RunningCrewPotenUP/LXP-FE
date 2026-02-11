import { ActionButton } from "@/src/entities/Button";
import enrollmentSubmitFormStyle from "./style";

const EnrollmentSubmitForm = () => {
  return (
    <div className="xl:w-80 h-fit sticky top-6">
      <div className={enrollmentSubmitFormStyle.variants.container}>
        <div className="mb-6">
          <p className="text-slate-400 text-xs font-bold uppercase mb-2">
            크루 리더
          </p>
          <div className="flex items-center space-x-3">
            <div className={enrollmentSubmitFormStyle.variants.icon}>종</div>
            <div>
              <p className={enrollmentSubmitFormStyle.variants.instructorName}>
                종원컴퍼니
              </p>
              <p className="text-[10px] text-slate-500 font-medium">강사</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 dark:border-slate-600 pb-3">
            <span className="text-slate-500">소요 시간</span>
            <span className="text-slate-800 dark:text-slate-500 font-bold">
              10시간
            </span>
          </div>
        </div>

        <ActionButton label={"트랙 합류하기"} full />

        <p className="text-[10px] text-slate-400 text-center mt-4 font-medium leading-relaxed">
          달리던 트랙은 크루 리더가 중단할 때까지 유지됩니다.
        </p>
      </div>
    </div>
  );
};

export default EnrollmentSubmitForm;
