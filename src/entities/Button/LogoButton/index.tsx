import APP_ROUTES from "@/src/shared/constants/routes";
import { ZapIcon } from "lucide-react";
import Link from "next/link";
import logoButtonStyle from "./style";

const LogoButton = () => {
  return (
    <Link href={APP_ROUTES.MAIN}>
      <div className={logoButtonStyle.variants.container}>
        {/* Logo Icon */}
        <div className={logoButtonStyle.variants.iconWrapper}>
          <ZapIcon size={24} fill="white" />
        </div>

        {/* Logo Text */}
        <span className={logoButtonStyle.variants.logoText}>러닝크루</span>
      </div>
    </Link>
  );
};

export default LogoButton;
