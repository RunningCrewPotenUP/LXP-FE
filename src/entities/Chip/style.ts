import clsx from "clsx";
import { tv } from "tailwind-variants";

const tagStyle = tv({
  base: clsx(
    "px-4 py-2.5 rounded-full text-sm font-medium border shadow-none",
    "transition-all duration-100",
  ),

  variants: {
    selected: {
      true: clsx(
        "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900",
        "text-slate-50",
        "border-indigo-600 dark:border-indigo-800",
        "shadow-md shadow-indigo-200 dark:shadow-indigo-800",
      ),

      false: clsx(
        "bg-slate-50 hover:bg-indigo-50 dark:bg-neutral-800 dark:hover:bg-neutral-900",
        "text-slate-600 hover:text-indigo-600 dark:text-slate-50 dark:hover:text-indigo-300",
        "border-slate-200 hover:border-indigo-300 dark:border-neutral-700 dark:hover:border-neutral-800",
      ),
    },
  },
});

export default tagStyle;
