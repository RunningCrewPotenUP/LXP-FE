import Card from "@/src/entities/Card";
import { CardContainerProps } from "./model/props.type";

const CardContainer = ({ cardOptions }: CardContainerProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-300">
      {cardOptions.map((cardOption, index) => (
        <Card key={index} {...cardOption} />
      ))}
    </div>
  );
};

export default CardContainer;
