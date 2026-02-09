import clsx from "clsx";
import { tv } from "tailwind-variants";

const logoButtonStyle = tv({
  variants: {
    container: "flex items-center space-x-3 mb-10 cursor-pointer",

    iconWrapper: clsx(
      "flex items-center justify-center text-slate-50 size-10 rounded-2xl",
      "bg-indigo-600 dark:bg-indigo-800",
      "shadow-indigo-200 dark:shadow-indigo-800 shadow-md",
    ),

    logoText: clsx(
      "text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight",
    ),
  },
});

export default logoButtonStyle;
