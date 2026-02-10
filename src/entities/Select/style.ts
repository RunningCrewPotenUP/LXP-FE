import clsx from "clsx";
import { tv } from "tailwind-variants";

const selectStyle = tv({
  variants: {
    container: clsx(
      "w-full border rounded-xl px-5 py-3.5 text-sm outline-none transition-all appearance-none",
      "text-slate-700 dark:text-slate-50",
      "bg-slate-50 dark:bg-neutral-800",
      "focus:ring-2 border-slate-100 dark:border-neutral-700 focus:ring-indigo-400 dark:focus:ring-indigo-500",
    ),
  },
});

export default selectStyle;
