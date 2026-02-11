import { ClockIcon } from "lucide-react";

const LectureDetailCard = ({ title, time, order }: LectureDetailCardProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-center text-base text-neutral-500 dark:text-slate-50 font-bold size-5">
        {order}
      </span>

      <div className="flex flex-1 rounded-lg text-neutral-700 dark:text-slate-300 text-sm font-medium items-center bg-slate-100/50 dark:bg-neutral-700 p-2 justify-between border border-neutral-200/80 dark:border-neutral-700">
        <span>{title}</span>

        <div className="flex items-center text-neutral-500">
          <ClockIcon size={14} />
          <span className="ml-1">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailCard;
