import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

interface HeroProps {
  title: ReactElement | string;
  description?: ReactElement | string;
  children?: ReactElement;
  direction?: "VERTICAL" | "HORIZONTAL";

  icon: LucideIcon;
  iconSize?: number;
}

export type { HeroProps };
