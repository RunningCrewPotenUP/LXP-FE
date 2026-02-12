import Chip from "@/src/entities/Chip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = {
  title: "Entities/Chip",
  component: Chip,
  args: {
    label: "Design",
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => {},
  },
};
