import DirectButton from "@/src/entities/Button/DirectButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DirectButton> = {
  title: "Entities/Button/DirectButton",
  component: DirectButton,
  args: {
    label: "Back",
    direction: "PREV",
  },
};

export default meta;
type Story = StoryObj<typeof DirectButton>;

export const Prev: Story = {};

export const Next: Story = {
  args: {
    label: "Next",
    direction: "NEXT",
  },
};
