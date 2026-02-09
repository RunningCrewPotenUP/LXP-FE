"use client";

import { useRouter } from "next/navigation";
import APP_ROUTES from "../shared/constants/routes";

const RootPage = () => {
  const router = useRouter();

  return router.replace(APP_ROUTES.MAIN);
};

export default RootPage;
