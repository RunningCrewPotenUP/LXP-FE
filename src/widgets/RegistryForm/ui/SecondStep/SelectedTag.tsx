import clsx from "clsx";
import { CheckCircle2Icon } from "lucide-react";

interface SelectedTagProps {
  tag: string;
  toggleInterest: () => void;
}

const SelectedTag = ({ tag, toggleInterest }: SelectedTagProps) => {
  return (
    <button
      type="button"
      onClick={toggleInterest}
      className={clsx(
        "flex space-x-1.5 items-center rounded-lg text-xs font-bold",
        "text-indigo-800 dark:text-indigo-200 ",
        "px-3 py-1.5",
        "bg-slate-50 dark:bg-neutral-800",
        "border border-indigo-600 dark:border-indigo-900",
        "animate-in zoom-in-50",
      )}
    >
      <CheckCircle2Icon size={14} className="" />
      <span>{tag}</span>
    </button>
  );
};

export default SelectedTag;
