import clsx from "clsx";
import { tv } from "tailwind-variants";

const chipStyle = tv({
  base: clsx(
    "px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer",
    "border transition-all duration-200",
  ),

  variants: {
    selected: {
      true: clsx(
        "text-slate-50",
        "bg-indigo-600 hover:bg-indigo-700",
        "border-indigo-600",
        "shadow-md shadow-indigo-200",
      ),
      false: clsx(
        "hover:bg-indigo-50",
        "text-slate-600 hover:text-indigo-600",
        "bg-white",
        "border-slate-200 hover:border-indigo-300",
      ),
    },
  },

  defaultVariants: {
    selected: false,
  },
});

export default chipStyle;
