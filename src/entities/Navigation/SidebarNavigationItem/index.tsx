"use client";

import { SidebarNavigationItemProps } from "./model/props.type";
import { ActionButton } from "./ui";
import { CompassIcon, HouseIcon, SquarePlusIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ICON_BY_NAME = {
  home: HouseIcon,
  courseCreate: SquarePlusIcon,
  learning: CompassIcon,
};

const SidebarNavigationItem = ({
  label,
  iconName,
  active,
  href,
  buttonOptions,
}: SidebarNavigationItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const Icon = ICON_BY_NAME[iconName];

  const isRouteActive = (() => {
    if (!href) {
      return false;
    }

    if (pathname === href) {
      return true;
    }

    return pathname.startsWith(`${href}/`);
  })();

  const resolvedActive = active ?? isRouteActive;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    buttonOptions?.onClick?.(event);

    if (event.defaultPrevented || !href) {
      return;
    }

    router.push(href);
  };

  return (
    <ActionButton
      icon={Icon}
      variant="navigation"
      active={resolvedActive}
      label={label}
      buttonOptions={{
        ...buttonOptions,
        onClick: handleClick,
      }}
    />
  );
};

export default SidebarNavigationItem;
