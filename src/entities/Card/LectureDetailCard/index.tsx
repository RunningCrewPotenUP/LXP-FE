import { ClockIcon } from "lucide-react";

const LectureDetailCard = ({ title, time, order }: LectureDetailCardProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-center text-base font-bold size-5">{order}</span>

      <div className="flex flex-1 rounded-lg text-slate-300 text-sm font-medium items-center bg-neutral-800/50 p-2 justify-between border border-neutral-700">
        <span>{title}</span>

        <div className="flex items-center text-slate-500">
          <ClockIcon size={14} />
          <span className="ml-1">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailCard;
