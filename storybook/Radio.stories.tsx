import Radio from "@/src/entities/Radio";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Radio> = {
  title: "Entities/Radio",
  component: Radio,
  args: {
    name: "level",
    value: "Beginner",
    label: "Beginner",
    checked: true,
    variant: "circle",
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const CheckedCircle: Story = {};

export const UncheckedCircle: Story = {
  args: {
    checked: false,
  },
};

export const CheckedSquare: Story = {
  args: {
    value: "Advanced",
    label: "Advanced",
    checked: true,
    variant: "square",
  },
};
