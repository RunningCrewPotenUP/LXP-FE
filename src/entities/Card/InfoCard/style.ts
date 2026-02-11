import clsx from "clsx";
import { tv } from "tailwind-variants";

const infoCardStyle = tv({
  variants: {
    container: clsx(
      "bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow",
    ),

    title: clsx(
      "text-xs text-slate-400 font-bold uppercase mb-1 tracking-wider",
    ),
    label: clsx("text-2xl font-black text-slate-800"),
    subLabel: clsx("text-[10px] text-slate-400 font-medium mb-1"),

    icon: {
      indigo: "bg-indigo-50 text-indigo-600",
      green: "bg-green-50 text-green-600",
      blue: "bg-blue-50 text-blue-600",
      red: "bg-red-50 text-red-600",
      amber: "bg-amber-50 text-amber-600",
    },
  },
});

export default infoCardStyle;
