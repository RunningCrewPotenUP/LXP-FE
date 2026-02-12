import type { TagData } from "@/src/shared/constants/mocks/tags";
import type { ChangeEvent } from "react";
import { createContext } from "react";
import type { SignUpFormState, SignUpType } from "./types";

type RegistryFormContextType = {
  formData: SignUpFormState;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleTypeChange: (type: SignUpType) => void;
  toggleInterest: (tagName: string) => void;
  categories: string[];
  groupedTags: Record<string, TagData[]>;
  currentTagCategory: string;
  setCurrentTagCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleNext: () => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
  step: 1 | 2;
};

const RegistryFormContext = createContext<RegistryFormContextType | null>(null);

export default RegistryFormContext;
