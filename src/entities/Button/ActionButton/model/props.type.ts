type ButtonVariant = "primary" | "secondary" | "navigation" | "border";

interface ButtonProps {
  label: string;
  active?: boolean;
  shadow?: boolean;
  icon?: any;
  full?: boolean;

  variant?: ButtonVariant;

  buttonOptions?: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;
}

export type { ButtonProps };
