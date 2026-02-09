import { tv } from "tailwind-variants";

const buttonStyle = tv({
  base: "px-6 py-3 rounded-xl font-bold shadow-lg transition-colors cursor-pointer",

  variants: {
    variant: {
      primary: "bg-white text-indigo-600 hover:bg-indigo-50",
      secondary:
        "bg-indigo-500 text-white hover:bg-indigo-400 border border-indigo-400",

      navigation: "bg-transparent ",
    },
  },
});

export default buttonStyle;
