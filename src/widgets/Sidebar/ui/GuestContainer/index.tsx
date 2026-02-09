import { ActionButton } from "@/src/entities/Button";
import APP_ROUTES from "@/src/shared/constants/routes";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import guestContainerStyle from "./style";

const GuestContainer = () => {
  return (
    <div className={guestContainerStyle.variants.container}>
      <Link href={APP_ROUTES.LOGIN}>
        <ActionButton label="로그인" icon={LogInIcon} shadow full />
      </Link>

      <Link href={APP_ROUTES.REGISTER}>
        <ActionButton
          label="회원가입"
          variant="secondary"
          icon={UserPlusIcon}
          shadow
          full
        />
      </Link>
    </div>
  );
};

export default GuestContainer;
