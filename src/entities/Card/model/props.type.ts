import { BadgeProps } from "@/src/entities/Badge/Badge/model/props.type";
import { TagProps } from "@/src/entities/Badge/Tag/model/props.type";

interface CardProps {
  title: string;
  description?: string;

  badgeOptions?: BadgeProps;
  tagOptions?: TagProps[];
}

export type { CardProps };
