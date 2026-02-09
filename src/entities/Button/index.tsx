import { ButtonProps } from "./props.type";
import buttonStyle from "./style";

const Button = ({
  children,
  variant,
  icon: Icon,
  active,
  shadow,
}: ButtonProps) => {
  return (
    <button className={buttonStyle({ variant, active, shadow })}>
      {Icon && (
        <Icon
          size={20}
          className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
