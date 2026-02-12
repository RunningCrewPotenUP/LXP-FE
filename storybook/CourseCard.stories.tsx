import CourseCard from "@/src/entities/Card/CourseCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CourseCard> = {
  title: "Entities/Card/CourseCard",
  component: CourseCard,
  parameters: {
    layout: "centered",
  },
  args: {
    id: 1,
    title: "Intro to SQL",
    description: "Learn the foundations of queries and data modeling.",
    badgeOptions: {
      label: "Popular",
    },
    tagOptions: [{ label: "database" }, { label: "sql" }],
  },
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

export const Default: Story = {};

export const WithoutBadge: Story = {
  args: {
    badgeOptions: undefined,
  },
};

export const WithoutTags: Story = {
  args: {
    tagOptions: undefined,
  },
};
