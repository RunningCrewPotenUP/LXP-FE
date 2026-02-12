import { ButtonProps } from "@/src/entities/Button/ActionButton/model/props.type";

type SidebarNavigationIconName = "home" | "courseCreate" | "learning";

interface SidebarNavigationItemProps extends Omit<
  ButtonProps,
  "icon" | "variant"
> {
  href?: string;
  iconName: SidebarNavigationIconName;
}

export type { SidebarNavigationItemProps };
