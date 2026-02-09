import clsx from "clsx";
import { tv } from "tailwind-variants";

const directButtonStyle = tv({
  variants: {
    container: clsx(
      "flex gap-1 w-fit items-center cursor-pointer px-3 py-2 transition-colors rounded-full",
      "hover:bg-slate-700/70",
    ),

    label: clsx("text-sm font-bold text-neutral-700 dark:text-slate-400"),

    icon: clsx("text-neutral-500 dark:text-slate-500"),
  },
});

export default directButtonStyle;
