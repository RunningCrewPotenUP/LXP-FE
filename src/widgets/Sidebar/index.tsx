import { CompassIcon, HouseIcon } from "lucide-react";
import sidebarStyle from "./style";
import { GuestContainer, LogoButton, SidebarNavigation } from "./ui";

const Sidebar = () => {
  return (
    <aside className={sidebarStyle.variants.container}>
      <LogoButton />

      <SidebarNavigation
        itemOptions={[
          { label: "메인", icon: HouseIcon, active: true },
          { label: "둘러보기", icon: CompassIcon },
        ]}
      />

      <div className={sidebarStyle.variants.footer}>
        <GuestContainer />
      </div>
    </aside>
  );
};

export default Sidebar;
