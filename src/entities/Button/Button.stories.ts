import { type Meta } from "@storybook/react";
import Button from ".";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} as Meta<typeof Button>;
export default meta;

export const Primary = {
  args: {
    label: "Click Me",
  },
};
