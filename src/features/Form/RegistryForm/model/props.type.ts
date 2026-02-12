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

export type { FirstStepViewProps, SignUpFormProps };
