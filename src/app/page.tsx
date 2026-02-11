"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import APP_ROUTES from "../shared/constants/routes";

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(APP_ROUTES.MAIN);
  }, []);

  return null;
};

export default RootPage;
