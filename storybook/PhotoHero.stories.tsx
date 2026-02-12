import PhotoHero from "@/src/entities/Hero/PhotoHero";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PhotoHero> = {
  title: "Entities/Hero/PhotoHero",
  component: PhotoHero,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Build your next routine",
    category: "Training",
  },
};

export default meta;
type Story = StoryObj<typeof PhotoHero>;

export const Default: Story = {};

export const NoCategory: Story = {
  args: {
    category: undefined,
  },
};
