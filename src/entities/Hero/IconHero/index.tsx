import { IconHeroProps } from "./model/props.type";
import iconHeroStyle from "./style";

const IconHero = ({
  title,
  description,
  icon: Icon,
  children,
  iconSize,
  direction = "HORIZONTAL",
}: IconHeroProps) => {
  return (
    <section className={iconHeroStyle({ container: direction })}>
      <div className={iconHeroStyle.variants.textContainer}>
        <h1 className={iconHeroStyle.variants.title}>{title}</h1>

        {description && (
          <p className={iconHeroStyle.variants.description}>{description}</p>
        )}
      </div>

      {children && (
        <div className={iconHeroStyle.variants.children}>{children}</div>
      )}

      <Icon size={iconSize ?? 250} className={iconHeroStyle.variants.icon} />
    </section>
  );
};

export default IconHero;
