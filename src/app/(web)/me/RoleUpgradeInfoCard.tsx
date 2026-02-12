"use client";

import { InfoCard } from "@/src/entities/Card";
import { ShieldCheckIcon } from "lucide-react";
import { useCallback, useState } from "react";

type RoleUpgradeInfoCardProps = {
  role: string;
  canUpgrade: boolean;
};

const RoleUpgradeInfoCard = ({
  role,
  canUpgrade,
}: RoleUpgradeInfoCardProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleUpgradeRole = useCallback(async () => {
    if (isPending) {
      return;
    }

    try {
      setIsPending(true);

      const response = await fetch("/api/users/role", {
        method: "POST",
      });

      if (!response.ok) {
        console.error("강사로 역할 변경 요청에 실패했습니다.", {
          status: response.status,
        });
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error("강사로 역할 변경 요청 중 오류가 발생했습니다.", error);
    } finally {
      setIsPending(false);
    }
  }, [isPending]);

  return (
    <InfoCard
      label={role}
      title="역할"
      subLabel={canUpgrade ? "크루 리더로 승급" : undefined}
      subLabelOnClick={canUpgrade ? handleUpgradeRole : undefined}
      icon={ShieldCheckIcon}
      iconColor="indigo"
    />
  );
};

export default RoleUpgradeInfoCard;
