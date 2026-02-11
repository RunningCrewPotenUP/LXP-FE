import Image from "next/image";
import Thumbnail from "../../../../public/image.png";
import { Badge } from "../../Badge";
import { PhotoHeroProps } from "./model/props.tyle";
import photoHeroStyle from "./style";

const PhotoHero = ({ title, category }: PhotoHeroProps) => {
  return (
    <section className={photoHeroStyle.variants.container}>
      <Image className="object-cover size-full" src={Thumbnail} alt="" />

      <div className={photoHeroStyle.variants.textContainer}>
        {category && (
          <div className="flex">
            <Badge label={category} />
          </div>
        )}
        <h1 className={photoHeroStyle.variants.title}>{title}</h1>
      </div>
    </section>
  );
};

export default PhotoHero;
