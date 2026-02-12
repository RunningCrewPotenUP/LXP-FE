import clsx from "clsx";
import { TagProps } from "./model/props.type";

const Tag = ({ label }: TagProps) => {
  return (
    <span
      className={clsx(
        "text-[11px] font-bold border px-2.5 py-1 rounded-md",
        "text-slate-400 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-700",
        "border-slate-200 dark:border-slate-800",
      )}
    >
      #{label}
    </span>
  );
};

export default Tag;
