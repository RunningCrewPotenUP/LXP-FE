import clsx from "clsx";
import { tv } from "tailwind-variants";

const infoCardStyle = tv({
  variants: {
    container: clsx(
      "bg-white dark:bg-neutral-800 p-6 rounded-3xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow",
    ),

    title: clsx(
      "text-xs text-slate-400 font-bold uppercase mb-1 tracking-wider",
    ),
    label: clsx("text-2xl font-black text-slate-800 dark:text-slate-300"),
    subLabel: clsx("text-[10px] text-slate-400 font-medium mb-1"),

    icon: {
      indigo:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-600/50 dark:text-indigo-50",
      green:
        "bg-green-50 text-green-600 dark:bg-green-600/50 dark:text-green-50",
      blue: "bg-blue-50 text-blue-600 dark:bg-blue-600/50 dark:text-blue-50",
      red: "bg-red-50 text-red-600",
      amber:
        "bg-amber-50 text-amber-600 dark:bg-amber-600/50 dark:text-amber-50",
    },
  },
});

export default infoCardStyle;
