import LogoButton from "@/src/entities/Button/LogoButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LogoButton> = {
  title: "Entities/Button/LogoButton",
  component: LogoButton,
};

export default meta;
type Story = StoryObj<typeof LogoButton>;

export const Default: Story = {};
