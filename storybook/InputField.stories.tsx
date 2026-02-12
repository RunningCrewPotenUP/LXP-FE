import InputField from "@/src/entities/InputField";
import type { Meta, StoryObj } from "@storybook/react";
import { MailIcon, UserIcon } from "lucide-react";

const meta: Meta<typeof InputField> = {
  title: "Entities/InputField",
  component: InputField,
  args: {
    label: "Email",
    icon: MailIcon,
    inputOptions: {
      placeholder: "you@example.com",
      type: "email",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: {
    label: "Name",
    icon: undefined,
    inputOptions: {
      placeholder: "Jane Doe",
      type: "text",
    },
  },
};

export const AlternateIcon: Story = {
  args: {
    icon: UserIcon,
    inputOptions: {
      placeholder: "username",
      type: "text",
    },
  },
};
