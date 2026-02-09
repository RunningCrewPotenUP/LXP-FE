import clsx from "clsx";
import { tv } from "tailwind-variants";

const buttonStyle = tv({
  base: "group px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer",

  variants: {
    variant: {
      primary: "bg-white text-indigo-600 hover:bg-indigo-50",
      secondary:
        "bg-indigo-500 text-white hover:bg-indigo-400 border border-indigo-400",

      navigation:
        "flex items-center gap-2 bg-transparent flex-1 text-center dark:text-slate-50 text-neutral-700 hover:bg-indigo-50 dark:hover:bg-indigo-800",

      border: clsx(
        "flex items-center bg-transparent px-5 py-2.5 text-sm text-center whitespace-nowrap",
        "dark:text-slate-50 text-neutral-700 hover:text-indigo-500 dark:hover:text-indigo-400",
        "border border-slate-200 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700",
      ),
    },

    active: {
      true: "text-slate-50 shadow-lg bg-indigo-500 dark:bg-indigo-800 shadow-indigo-200 dark:shadow-indigo-700/50 hover:bg-indigo-500 dark:hover:bg-indigo-700",
      false: "",
    },

    shadow: {
      true: "shadow-lg",
      false: "",
    },
  },
});

export default buttonStyle;
