import { SelectHTMLAttributes } from "react";

interface OptionData {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options?: OptionData[];

  selectOptions?: Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">;
}

export type { SelectProps };
