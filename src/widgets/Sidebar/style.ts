import clsx from "clsx";
import { tv } from "tailwind-variants";

const sidebarStyle = tv({
  variants: {
    container: clsx(
      "hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-20 p-8",
      "bg-slate-50 dark:bg-neutral-900",
      "border-r border-slate-200 dark:border-neutral-700",
    ),

    footer: clsx(
      "mt-auto",
      "border-t border-slate-100 dark:border-neutral-700",
    ),
  },
});

export default sidebarStyle;
