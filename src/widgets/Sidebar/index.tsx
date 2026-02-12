import APP_ROUTES from "@/src/shared/constants/routes";
import { cookies } from "next/headers";
import sidebarStyle from "./style";
import {
  GuestContainer,
  LogoButton,
  MemberContainer,
  SidebarNavigation,
} from "./ui";

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
          {
            label: "메인",
            iconName: "home",
            href: APP_ROUTES.MAIN,
          },
          {
            label: "강의 개설",
            iconName: "courseCreate",
            href: APP_ROUTES.COURSE_CREATE,
          },
          { label: "내 학습", iconName: "learning", href: APP_ROUTES.ME },
        ]}
      />

      <div className={sidebarStyle.variants.footer}>
        {isAuthenticated ? <MemberContainer /> : <GuestContainer />}
      </div>
    </aside>
  );
};

export default Sidebar;
