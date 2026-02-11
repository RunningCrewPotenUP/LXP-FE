import clsx from "clsx";
import { tv } from "tailwind-variants";

const photoHeroStyle = tv({
  variants: {
    container: clsx(
      "relative flex flex-row items-center overflow-hidden rounded-4xl mb-12 shadow-2xl max-h-50 md:max-h-80 text-white transition-all",
      "bg-indigo-600 dark:bg-indigo-800",
      "shadow-indigo-200 dark:shadow-indigo-800",
    ),

    textContainer:
      "absolute space-y-2 z-10 bottom-0 left-0 py-3 px-6 xl:py-5 xl:px-8 transition-all",

    title: clsx(
      "text-xl md:text-3xl xl:text-4xl",
      "font-black leading-tight",
      "mb-4",
    ),

    description: clsx("text-indigo-100", "font-medium leading-relaxed", "mb-8"),

    children: clsx("absolute top-0 right-0 h-full w-full"),

    icon: clsx(
      "absolute h-full opacity-10 pointer-events-none",
      "bottom-0 right-10",
    ),
  },
});

export default photoHeroStyle;
