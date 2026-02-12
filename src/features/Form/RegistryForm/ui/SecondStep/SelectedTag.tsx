import clsx from "clsx";
import { CheckCircle2Icon } from "lucide-react";

interface SelectedTagProps {
  tagName: string;
  onRemove: () => void;
}

const SelectedTag = ({ tagName, onRemove }: SelectedTagProps) => {
  return (
    <button
      type="button"
      onClick={onRemove}
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
      <span>{tagName}</span>
    </button>
  );
};

export default SelectedTag;
