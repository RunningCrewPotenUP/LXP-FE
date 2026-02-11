import clsx from "clsx";
import { tv } from "tailwind-variants";

const enrollmentSubmitFormStyle = tv({
  variants: {
    container: clsx(
      "rounded-3xl",
      "p-6 md:p-8",
      "bg-white dark:bg-neutral-800",
      "border border-slate-100 dark:border-neutral-700",
      "shadow-xl shadow-slate-200/50 dark:shadow-neutral-800/50",
    ),

    icon: clsx(
      "flex items-center justify-center rounded-2xl size-12 font-bold text-lg",
      "text-indigo-600 dark:text-indigo-400",
      "bg-indigo-100 dark:bg-indigo-900",
    ),

    instructorName: clsx(
      "text-sm font-bold",
      "text-slate-800 dark:text-slate-400",
    ),
  },
});

export default enrollmentSubmitFormStyle;
