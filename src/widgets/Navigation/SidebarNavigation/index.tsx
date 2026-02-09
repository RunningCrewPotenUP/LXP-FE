import SidebarNavigationItem from "@/src/entities/Navigation/SidebarNavigationItem";
import { SidebarNavigationProps } from "./model/props.type";

const SidebarNavigation = ({ itemOptions }: SidebarNavigationProps) => {
  return (
    <nav className="space-y-2 flex flex-col">
      {itemOptions.map((item, index) => (
        <SidebarNavigationItem
          key={index}
          icon={item.icon}
          active={item.active}
          label={item.label}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
