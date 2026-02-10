import { ChangeEvent } from "react";

interface SignUpFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

interface FirstStepViewProps {
  formData: FormData;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface SecondStepViewProps {
  formData: FormData;
}

type UserType = "general" | "instructor";

interface FormData {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  type: UserType;
  career: string;
  interests: string[];
}

export type {
  FirstStepViewProps,
  FormData,
  SecondStepViewProps,
  SignUpFormProps,
};
