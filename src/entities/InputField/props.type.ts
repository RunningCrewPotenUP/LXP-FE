import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  label?: string;
  icon?: LucideIcon;
  full?: boolean;
  error?: boolean;

  inputOptions?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
}

export type { InputFieldProps };
