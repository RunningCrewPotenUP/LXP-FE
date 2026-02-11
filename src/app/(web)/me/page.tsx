import { InfoCard } from "@/src/entities/Card";
import {
  AwardIcon,
  CheckCircle2Icon,
  ClockIcon,
  MessageSquareIcon,
} from "lucide-react";

const MePage = () => {
  return (
    <div>
      <div className="text-white grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <InfoCard
          label={"4개"}
          title="완주한 크루"
          icon={CheckCircle2Icon}
          iconColor="green"
        />
        <InfoCard
          label={"28회"}
          title="토론 참여"
          subLabel="상위 10%"
          icon={MessageSquareIcon}
          iconColor="blue"
        />
        <InfoCard
          label={"124.5h"}
          title="총 학습 시간"
          icon={ClockIcon}
          iconColor="indigo"
        />
        <InfoCard
          label={"12개"}
          title="획득 뱃지"
          icon={AwardIcon}
          iconColor="amber"
        />
      </div>
    </div>
  );
};

export default MePage;
