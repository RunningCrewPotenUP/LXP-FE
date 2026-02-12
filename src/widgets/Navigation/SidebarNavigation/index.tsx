import SidebarNavigationItem from "@/src/entities/Navigation/SidebarNavigationItem";
import { SidebarNavigationProps } from "./model/props.type";

const SidebarNavigation = ({ itemOptions }: SidebarNavigationProps) => {
  return (
    <nav className="space-y-2 flex flex-col">
      {itemOptions.map((item, index) => (
        <SidebarNavigationItem
          key={index}
          iconName={item.iconName}
          active={item.active}
          label={item.label}
          href={item.href}
          buttonOptions={item.buttonOptions}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
