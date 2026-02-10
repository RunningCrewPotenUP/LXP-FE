"use client";

import { useRouter } from "next/navigation";
import APP_ROUTES from "../shared/constants/routes";

const RootPage = () => {
  const router = useRouter();

  router.replace(APP_ROUTES.MAIN);

  return null;
};

export default RootPage;
