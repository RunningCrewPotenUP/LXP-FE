import Image from "next/image";
import Thumbnail from "../../../../public/image.png";
import { Badge, Tag } from "../../Badge";
import { CardProps } from "./model/props.type";
import cardStyle from "./style";

const CourseCard = ({
  title,
  description,
  thumbnail,
  badgeOptions,
  tagOptions,
}: CardProps) => {
  const thumbnailSrc =
    typeof thumbnail === "string" && thumbnail.trim().length > 0
      ? thumbnail
      : Thumbnail;

  return (
    <button className={cardStyle.variants.container}>
      {/* Thumbnail Image */}
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-neutral-700">
        <Image
          className={cardStyle.variants.image}
          src={thumbnailSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {badgeOptions && (
          <div className="absolute top-4 left-4">
            <Badge {...badgeOptions} />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 text-start">
        {/* Title */}
        <h3 className={cardStyle.variants.title}>{title}</h3>

        {/* Description */}
        <p className={cardStyle.variants.description}>{description}</p>

        {tagOptions && (
          <div className="flex flex-nowrap gap-1.5 mt-auto">
            {tagOptions.map((tagOption, index) => (
              <Tag key={index} {...tagOption} />
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export default CourseCard;
