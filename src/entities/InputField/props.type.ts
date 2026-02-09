import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  icon?: LucideIcon;
  full?: boolean;

  inputOptions?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
}

export type { InputFieldProps };
