import clsx from "clsx";

const Tag = () => {
  return (
    <span
      className={clsx(
        "text-[11px] font-bold border px-2.5 py-1 rounded-md",
        "text-slate-400 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-700",
        "border-slate-200 dark:border-slate-800",
      )}
    >
      #Tag
    </span>
  );
};

export default Tag;
