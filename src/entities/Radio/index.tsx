"use client";

import { CheckIcon } from "lucide-react";
import { RadioProps } from "./model/props.type";
import radioStyle from "./style";

const Radio = ({
  name,
  value,
  label,
  checked,
  onChange,
  variant,
}: RadioProps) => {
  return (
    <label className={radioStyle.variants.container}>
      <div className={radioStyle({ checkBox: variant, checked })}>
        {checked && <CheckIcon size={12} className="text-white" />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={radioStyle.variants.label[checked ? "checked" : "unchecked"]}
      >
        {label ?? value}
      </span>
    </label>
  );
};

export default Radio;
