import { CompassIcon, HouseIcon } from "lucide-react";
import { cookies } from "next/headers";
import sidebarStyle from "./style";
import { GuestContainer, LogoButton, MemberContainer, SidebarNavigation } from "./ui";

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const buildMeUrl = () => {
  if (!API_BASE_URL) {
    return null;
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  return `${normalizedBaseUrl}/users/me`;
};

const getIsAuthenticated = async () => {
  const meUrl = buildMeUrl();
  if (!meUrl) {
    return false;
  }

  const cookieHeader = (await cookies()).toString();
  if (!cookieHeader) {
    return false;
  }

  try {
    const response = await fetch(meUrl, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
};

const Sidebar = async () => {
  const isAuthenticated = await getIsAuthenticated();

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
        {isAuthenticated ? <MemberContainer /> : <GuestContainer />}
      </div>
    </aside>
  );
};

export default Sidebar;
