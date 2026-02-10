import { TabProps } from "./model/props.type";
import tabStyle from "./style";

const Tab = ({ label, active, onClick }: TabProps) => {
  return (
    <button type="button" onClick={onClick} className={tabStyle({ active })}>
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
      )}
    </button>
  );
};

export default Tab;
