import clsx from "clsx";
import { tv } from "tailwind-variants";

const lectureCardStyle = tv({
  variants: {
    container: clsx(
      "flex-1 relative overflow-hidden space-y-2 cursor-pointer",
      "p-5 md:p-6",
      "bg-white dark:bg-slate-800",
      "border border-slate-100 hover:border-indigo-200 dark:border-neutral-700 dark:hover:border-indigo-600",
      "rounded-2xl",
      "hover:shadow-md",
      "hover:scale-[1.005]",
      "transition-all duration-300",
    ),

    lectureTitle: clsx(
      "text-lg font-bold mb-1 text-slate-800 dark:text-slate-200",
    ),

    infoContainer: clsx(
      "flex space-x-1.5 items-center",
      "text-xs text-slate-400 font-medium",
    ),
    infoText: clsx(""),
  },
});

export default lectureCardStyle;
