import { ChipProps } from "./model/props.type";
import chipStyle from "./style";

const Chip = ({ label, selected, onClick }: ChipProps) => {
  return (
    <button type="button" onClick={onClick} className={chipStyle({ selected })}>
      {label}
    </button>
  );
};

export default Chip;
