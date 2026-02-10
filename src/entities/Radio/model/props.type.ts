import { ChangeEvent } from "react";

type RadioVariant = "circle" | "square";

interface RadioProps {
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  variant?: RadioVariant;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  radioOptions?: Omit<HTMLOptionElement, "className" | "name">[];
}

export type { RadioProps };
