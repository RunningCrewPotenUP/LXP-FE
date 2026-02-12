import { LucideIcon } from "lucide-react";

type IconColor = "red" | "blue" | "green" | "amber" | "indigo";

interface InfoCardProps {
  title?: string;
  label: string;
  subLabel?: string;
  subLabelOnClick?: () => void;

  icon: LucideIcon;
  iconColor?: IconColor;
}

export type { InfoCardProps };
