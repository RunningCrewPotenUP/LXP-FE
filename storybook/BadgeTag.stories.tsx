import Tag from "@/src/entities/Badge/Tag";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tag> = {
  title: "Entities/Badge/Tag",
  component: Tag,
  args: {
    label: "starter",
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const Hashtag: Story = {
  args: {
    label: "typescript",
  },
};
