import { CourseCard } from "@/src/entities/Card";
import APP_ROUTES from "@/src/shared/constants/routes";
import Link from "next/link";
import { CardContainerProps } from "./model/props.type";

const CardContainer = ({ cardOptions }: CardContainerProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-300">
      {cardOptions.map((cardOption, index) => (
        <Link
          key={cardOption.id}
          href={`${APP_ROUTES.COURSE_DETAIL}/${cardOption.id}`}
        >
          <CourseCard key={index} {...cardOption} />
        </Link>
      ))}
    </div>
  );
};

export default CardContainer;
