import clsx from "clsx";
import { tv } from "tailwind-variants";

const iconHeroStyle = tv({
  variants: {
    container: {
      VERTICAL: clsx(
        "relative overflow-hidden rounded-4xl p-8 md:p-12 mb-12 shadow-2xl text-white",
        "bg-indigo-600 dark:bg-indigo-800",
        "shadow-indigo-200 dark:shadow-indigo-800",
      ),

      HORIZONTAL: clsx(
        "relative flex flex-row items-center overflow-hidden rounded-4xl p-8 md:p-12 mb-12 shadow-2xl text-white",
        "bg-indigo-600 dark:bg-indigo-800",
        "shadow-indigo-200 dark:shadow-indigo-800",
      ),
    },

    textContainer: "relative z-10 max-w-xl",

    title: clsx("text-3xl md:text-4xl", "font-black leading-tight", "mb-4"),

    description: clsx("text-indigo-100", "font-medium leading-relaxed", "mb-8"),

    children: clsx("absolute top-0 right-0 h-full w-full"),

    icon: clsx(
      "absolute h-full opacity-10 pointer-events-none",
      "bottom-0 right-10",
    ),
  },
});

export default iconHeroStyle;
