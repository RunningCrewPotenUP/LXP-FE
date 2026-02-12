import Badge from "@/src/entities/Badge/Badge";
import IconHero from "@/src/entities/Hero/IconHero";
import type { Meta, StoryObj } from "@storybook/react";
import { RocketIcon } from "lucide-react";

const meta: Meta<typeof IconHero> = {
  title: "Entities/Hero/IconHero",
  component: IconHero,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Learn faster",
    description: "Build strong fundamentals with short, focused lessons.",
    icon: RocketIcon,
    iconSize: 220,
    direction: "HORIZONTAL",
    children: (
      <div className="flex gap-2">
        <Badge label="New" />
        <Badge label="Pro" />
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof IconHero>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    direction: "VERTICAL",
  },
};
