"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActionButton } from "../../Button";
import { EnrollmentCardProps } from "./model/props.type";
import enrollmentCardStyle from "./style";

const EnrollmentCard = ({
  thumbnail,
  title,
  progress,
  learnHref,
}: EnrollmentCardProps) => {
  const router = useRouter();

  return (
    <div>
      <div className={enrollmentCardStyle.variants.container}>
        <div className={enrollmentCardStyle.variants.infoContainer}>
          <div className={enrollmentCardStyle.variants.thumbnailContainer}>
            <Image
              src={thumbnail}
              className="size-full object-cover"
              alt="crew"
              width={64}
              height={64}
              priority
            />
          </div>
          <div>
            <h4 className={enrollmentCardStyle.variants.title}>{title}</h4>

            {progress && (
              <p className={enrollmentCardStyle.variants.status}>
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />

                <span>진행률 {progress}%</span>
              </p>
            )}
          </div>
        </div>

        <ActionButton
          label={"트랙 입장"}
          buttonOptions={{
            type: "button",
            onClick: () => {
              if (learnHref) {
                router.push(learnHref);
              }
            },
            disabled: !learnHref,
          }}
        />
      </div>
    </div>
  );
};

export default EnrollmentCard;
