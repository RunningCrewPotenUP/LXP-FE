import { ChevronDown } from "lucide-react";
import { SelectProps } from "./model/props.type";
import selectStyle from "./style";

const Select = ({ selectOptions, label, options }: SelectProps) => {
  return (
    <div className="relative">
      <select className={selectStyle.variants.container} {...selectOptions}>
        <option value="" disabled hidden>
          {label}
        </option>

        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={18}
      />
    </div>
  );
};

export default Select;
