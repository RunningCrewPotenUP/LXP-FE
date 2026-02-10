import { tv } from "tailwind-variants";

const tabStyle = tv({
  base: "px-6 py-3 text-sm font-bold transition-all relative whitespace-nowrap",

  variants: {
    active: {
      true: "text-indigo-600",
      false: "text-slate-400 hover:text-slate-600",
    },
  },

  defaultVariants: {
    active: false,
  },
});

export default tabStyle;
