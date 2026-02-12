export type SignUpType = "LEARNER" | "INSTRUCTOR";

export type SignUpFormState = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  type: SignUpType;
  career: string;
  interests: string[];
};
