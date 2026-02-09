"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import directButtonStyle from "./style";

const DirectButton = ({ label, direction = "PREV" }: DirectButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={directButtonStyle.variants.container}
      onClick={() => router.back()}
    >
      {direction === "PREV" ? (
        <ArrowLeftIcon size={18} className={directButtonStyle.variants.icon} />
      ) : (
        <ArrowRightIcon size={18} className={directButtonStyle.variants.icon} />
      )}

      <span className={directButtonStyle.variants.label}>{label}</span>
    </button>
  );
};

export default DirectButton;
