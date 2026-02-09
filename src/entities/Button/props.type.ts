type ButtonVariant = "primary" | "secondary" | "navigation" | "border";

interface ButtonProps {
  children: string;
  active?: boolean;
  shadow?: boolean;
  icon?: any;

  variant?: ButtonVariant;
}

export type { ButtonProps };
