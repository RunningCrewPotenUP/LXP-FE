import clsx from "clsx";
import { tv } from "tailwind-variants";

const buttonStyle = tv({
  base: "flex group px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer gap-2",

  variants: {
    variant: {
      primary: clsx(
        "bg-white hover:bg-indigo-50",
        "text-indigo-600",
        "items-center justify-center",
      ),

      secondary: clsx(
        "bg-indigo-500 hover:bg-indigo-700",
        "text-white",
        "border border-indigo-400 dark:hover:border-indigo-600",
        "items-center justify-center",
      ),

      navigation: clsx(
        "flex-1 items-center text-center",
        "bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-800/70",
        "text-neutral-700 dark:text-slate-50",
      ),

      border: clsx(
        "items-center bg-transparent px-5 py-2.5 text-sm text-center whitespace-nowrap",
        "dark:text-slate-50 text-neutral-700 hover:text-indigo-500 dark:hover:text-indigo-400",
        "border border-slate-200 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700",
      ),
    },

    active: {
      true: clsx(
        "shadow-lg",
        "text-slate-50",
        "bg-indigo-500 hover:bg-indigo-500 dark:bg-indigo-800 dark:hover:bg-indigo-700",
        "shadow-indigo-200 dark:shadow-indigo-700/50",
      ),
      false: "",
    },

    shadow: {
      true: "shadow-lg",
      false: "",
    },

    full: {
      true: "w-full",
      false: "",
    },
  },

  defaultVariants: {
    variant: "primary",
    active: false,
    shadow: false,
  },
});

export default buttonStyle;
