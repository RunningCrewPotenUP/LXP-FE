import { SidebarNavigationItemProps } from "./model/props.type";
import { ActionButton } from "./ui";

const SidebarNavigationItem = ({
  label,
  icon,
  active,
}: SidebarNavigationItemProps) => {
  return (
    <ActionButton
      icon={icon}
      variant="navigation"
      active={active}
      label={label}
    />
  );
};

export default SidebarNavigationItem;
