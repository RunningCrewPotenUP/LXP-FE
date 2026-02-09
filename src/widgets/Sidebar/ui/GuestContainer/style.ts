import clsx from "clsx";
import { tv } from "tailwind-variants";

const guestContainerStyle = tv({
  variants: {
    container: clsx(
      "space-y-3 flex flex-col",
      "animate-in fade-in slide-in-from-bottom-2",
    ),
  },
});

export default guestContainerStyle;
