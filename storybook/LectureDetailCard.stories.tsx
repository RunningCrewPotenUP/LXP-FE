import LectureDetailCard from "@/src/entities/Card/LectureDetailCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LectureDetailCard> = {
  title: "Entities/Card/LectureDetailCard",
  component: LectureDetailCard,
  args: {
    order: 1,
    title: "Primary Keys and Indexes",
    time: "15 min",
  },
};

export default meta;
type Story = StoryObj<typeof LectureDetailCard>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    order: 2,
    title: "Filtering rows with complex conditional logic",
    time: "28 min",
  },
};
