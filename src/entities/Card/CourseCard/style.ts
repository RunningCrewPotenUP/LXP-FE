import clsx from "clsx";
import { tv } from "tailwind-variants";

const cardStyle = tv({
  variants: {
    container: clsx(
      "bg-slate-50 dark:bg-slate-800",
      "rounded-2xl overflow-hidden shadow-sm cursor-pointer group flex flex-col h-full",
      "border border-slate-100 dark:border-slate-800",
      "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
    ),

    image: clsx(
      "object-cover group-hover:scale-105 transition-transform duration-300",
    ),

    title: clsx(
      "font-bold text-base mb-2 line-clamp-2 transition-colors",
      "text-slate-800, dark:text-slate-200",
      "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    ),

    description: clsx(
      "text-xs mb-4 line-clamp-2 leading-relaxed font-medium flex-1",
      "text-slate-500 dark:text-slate-400",
    ),
  },

  defaultVariants: {},
});

export default cardStyle;
