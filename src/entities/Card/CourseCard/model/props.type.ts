import { BadgeProps } from "@/src/entities/Badge/Badge/model/props.type";
import { TagProps } from "@/src/entities/Chip/model/props.type";

interface CardProps {
  id: number;
  title: string;
  description?: string;

  badgeOptions?: BadgeProps;
  tagOptions?: TagProps[];
}

export type { CardProps };
