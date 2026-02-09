type ButtonVariant = "primary" | "secondary" | "navigation" | "border";

interface ButtonProps {
  label: string;
  active?: boolean;
  shadow?: boolean;
  icon?: any;
  full?: boolean;

  variant?: ButtonVariant;
}

export type { ButtonProps };
