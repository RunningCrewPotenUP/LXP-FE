import clsx from "clsx";
import { tv } from "tailwind-variants";

const radioStyle = tv({
  variants: {
    container: "flex items-center cursor-pointer group",

    checkBox: {
      square:
        "size-5 rounded-md border flex items-center justify-center mr-2 transition-all",
      circle: clsx(
        "size-5 rounded-full border flex items-center justify-center mr-2 transition-all",
      ),
    },

    checked: {
      true: "border-indigo-600 bg-indigo-600",
      false: "border-slate-300 bg-slate-50 group-hover:border-indigo-300",
    },

    label: {
      checked: "text-sm text-indigo-600 dark:text-indigo-500 font-bold",
      unchecked: "text-sm text-slate-600 dark:text-slate-300 font-medium",
    },
  },

  defaultVariants: {
    checkBox: "circle",
    checked: false,
  },
});

export default radioStyle;
