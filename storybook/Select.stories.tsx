import Select from "@/src/entities/Select";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "Entities/Select",
  component: Select,
  args: {
    label: "Select level",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    selectOptions: {
      defaultValue: "intermediate",
    },
  },
};
