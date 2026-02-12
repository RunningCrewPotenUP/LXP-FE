import Quotes from "@/src/entities/Quotes";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Quotes> = {
  title: "Entities/Quotes",
  component: Quotes,
};

export default meta;
type Story = StoryObj<typeof Quotes>;

export const Default: Story = {};
