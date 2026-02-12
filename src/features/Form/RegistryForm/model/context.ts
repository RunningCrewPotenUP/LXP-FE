import type { ChangeEvent } from "react";
import { createContext } from "react";
import type { RegistryTag, SignUpFormState, SignUpType } from "./types";

type RegistryFormContextType = {
  formData: SignUpFormState;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleTypeChange: (type: SignUpType) => void;
  toggleInterest: (tagId: number) => void;
  selectedTags: RegistryTag[];
  categories: string[];
  groupedTags: Record<string, RegistryTag[]>;
  currentTagCategory: string;
  setCurrentTagCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingTags: boolean;
  tagLoadError: string;
  handleNext: () => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
  step: 1 | 2;
};

const RegistryFormContext = createContext<RegistryFormContextType | null>(null);

export default RegistryFormContext;
