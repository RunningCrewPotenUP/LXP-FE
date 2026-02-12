import InfoCard from "@/src/entities/Card/InfoCard";
import type { Meta, StoryObj } from "@storybook/react";
import { BookIcon, UsersIcon } from "lucide-react";

const meta: Meta<typeof InfoCard> = {
  title: "Entities/Card/InfoCard",
  component: InfoCard,
  args: {
    title: "Students",
    label: "1,024",
    icon: UsersIcon,
    iconColor: "indigo",
  },
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {};

export const WithSubLabel: Story = {
  args: {
    subLabel: "+12%",
  },
};

export const RedIcon: Story = {
  args: {
    title: "Reading",
    label: "32",
    icon: BookIcon,
    iconColor: "red",
  },
};
