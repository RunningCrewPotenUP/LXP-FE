import buttonStyle from "./style";

const Button = ({ children, variant }: ButtonProps) => {
  return <button className={buttonStyle({ variant })}>{children}</button>;
};

export default Button;
