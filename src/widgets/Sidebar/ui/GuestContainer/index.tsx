import { ActionButton } from "@/src/entities/Button";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import guestContainerStyle from "./style";

const GuestContainer = () => {
  return (
    <div className={guestContainerStyle.variants.container}>
      <ActionButton label="로그인" icon={LogInIcon} />
      <ActionButton label="회원가입" variant="secondary" icon={UserPlusIcon} />
    </div>
  );
};

export default GuestContainer;
