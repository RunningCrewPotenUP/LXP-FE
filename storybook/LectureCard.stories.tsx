import LectureCard from "@/src/entities/Card/LectureCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LectureCard> = {
  title: "Entities/Card/LectureCard",
  component: LectureCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LectureCard>;

export const Default: Story = {};
