export type SignUpType = "LEARNER" | "INSTRUCTOR";

export type RegistryTag = {
  tagId: number;
  name: string;
  category: string;
  subCategory: string;
  status: string;
};

export type SignUpFormState = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  type: SignUpType;
  career: string;
  selectedTagIds: number[];
};
