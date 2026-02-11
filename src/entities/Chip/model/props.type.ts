import { MouseEventHandler } from "react";

interface TagProps {
  label: string;
  selected?: boolean;

  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type { TagProps };
