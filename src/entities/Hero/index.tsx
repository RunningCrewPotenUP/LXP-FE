import { HeroProps } from "./model/props.type";
import heroStyle from "./style";

const Hero = ({
  title,
  description,
  icon: Icon,
  children,
  iconSize,
  direction = "HORIZONTAL",
}: HeroProps) => {
  return (
    <section className={heroStyle({ container: direction })}>
      <div className={heroStyle.variants.textContainer}>
        <h1 className={heroStyle.variants.title}>{title}</h1>

        {description && (
          <p className={heroStyle.variants.description}>{description}</p>
        )}
      </div>

      {children && (
        <div className={heroStyle.variants.children}>{children}</div>
      )}

      <Icon size={iconSize ?? 250} className={heroStyle.variants.icon} />
    </section>
  );
};

export default Hero;
