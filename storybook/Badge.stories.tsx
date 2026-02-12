import Badge from "@/src/entities/Badge/Badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
  title: "Entities/Badge/Badge",
  component: Badge,
  args: {
    label: "New",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    label: "Limited Offer",
  },
};
