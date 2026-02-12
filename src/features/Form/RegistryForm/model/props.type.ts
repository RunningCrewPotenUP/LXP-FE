import { ChangeEvent } from "react";
import type { SignUpFormState } from "./types";

interface SignUpFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

interface FirstStepViewProps {
  formData: SignUpFormState;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface SecondStepViewProps {
  formData: SignUpFormState;
}

export type { FirstStepViewProps, SecondStepViewProps, SignUpFormProps };
