import { InfoCard } from "@/src/entities/Card";
import EnrollmentCard from "@/src/entities/Card/EnrollmentCard";
import {
  AwardIcon,
  CheckCircle2Icon,
  ClockIcon,
  MessageSquareIcon,
} from "lucide-react";
import Thumbnail from "../../../../public/image.png";

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

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2">
          참여 중인 크루
        </h3>

        <EnrollmentCard
          thumbnail={Thumbnail.src}
          title={"아이씨 진짜 어떡함"}
        />
        <EnrollmentCard thumbnail={Thumbnail.src} title={"내일 발표인데"} />
        <EnrollmentCard thumbnail={Thumbnail.src} title={"너무 힘들다"} />
        <EnrollmentCard
          thumbnail={Thumbnail.src}
          title={"ㅠㅠ"}
          progress={50}
        />
      </div>
    </div>
  );
};

export default MePage;
