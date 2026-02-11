import clsx from "clsx";
import { tv } from "tailwind-variants";

const quotesStyle = tv({
  variants: {
    container: clsx(
      "flex items-start gap-4",
      "rounded-2xl",
      "font-medium",
      "text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base md:text-lg",
      "bg-white dark:bg-slate-800",
      "border border-slate-100 dark:border-slate-700",
      "mb-12 p-6",
      "shadow-sm",
    ),

    icon: "",
  },
});

export default quotesStyle;
