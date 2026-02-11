import { TagProps } from "./model/props.type";
import tagStyle from "./style";

const Tag = ({ selected, onClick, label }: TagProps) => {
  return (
    <button type="button" className={tagStyle({ selected })} onClick={onClick}>
      {label}
    </button>
  );
};

export default Tag;
