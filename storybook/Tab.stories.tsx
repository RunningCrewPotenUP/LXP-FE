import Tab from "@/src/entities/Tab";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tab> = {
  title: "Entities/Tab",
  component: Tab,
  args: {
    label: "Overview",
    active: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Active: Story = {};

export const Inactive: Story = {
  args: {
    active: false,
    label: "Details",
  },
};
