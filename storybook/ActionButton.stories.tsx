import ActionButton from "@/src/entities/Button/ActionButton";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRightIcon, FlameIcon } from "lucide-react";

const meta: Meta<typeof ActionButton> = {
  title: "Entities/Button/ActionButton",
  component: ActionButton,
  args: {
    label: "Continue",
    icon: ArrowRightIcon,
    variant: "primary",
    shadow: true,
    buttonOptions: {
      type: "button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Navigation: Story = {
  args: {
    variant: "navigation",
  },
};

export const Border: Story = {
  args: {
    variant: "border",
  },
};

export const Active: Story = {
  args: {
    active: true,
    icon: FlameIcon,
  },
};

export const FullWidth: Story = {
  args: {
    full: true,
  },
};
