import { ButtonProps } from "./model/props.type";
import buttonStyle from "./style";

const ActionButton = ({
  label,
  variant,
  icon: Icon,
  active,
  shadow,
  full,
  buttonOptions,
}: ButtonProps) => {
  return (
    <button
      className={buttonStyle({ variant, active, shadow, full })}
      {...buttonOptions}
    >
      {Icon && (
        <Icon
          size={20}
          className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}
        />
      )}
      {label}
    </button>
  );
};

export default ActionButton;
