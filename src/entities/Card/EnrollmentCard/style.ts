import clsx from "clsx";
import { tv } from "tailwind-variants";

const enrollmentCardStyle = tv({
  variants: {
    container: clsx(
      "flex flex-col sm:flex-row rounded-4xl",
      "items-center justify-between",
      "bg-white dark:bg-neutral-800",
      "p-6 gap-4",
      "border border-indigo-100 dark:border-neutral-700",
      "shadow-md shadow-indigo-100/20 dark:shadow-neutral-900/70",
    ),

    infoContainer: clsx("flex items-center space-x-4"),

    thumbnailContainer: clsx(
      "w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden shrink-0",
    ),

    title: clsx(
      "text-neutral-800 dark:text-slate-200",
      "text-lg font-bold mb-1 line-clamp-1",
    ),

    status: clsx("text-xs text-slate-400 mt-1 font-medium flex items-center"),
  },
});

export default enrollmentCardStyle;
