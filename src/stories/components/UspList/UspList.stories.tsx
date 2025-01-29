import type { Meta, StoryFn } from "@storybook/react";
import { IconType } from "../../../utils/icon";
import UspList, { type UspListProps } from "./UspList";

const meta: Meta<UspListProps> = {
  component: UspList,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<UspListProps> = (args: UspListProps) => (
  <UspList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "bshgj",
  items: [
    {
      icon: IconType.ratingTick,
      text: "5 Star Google Rated",
    },
    {
      icon: IconType.brain,
      text: "20 Years' Experience",
    },
    {
      icon: IconType.clipboard,
      text: "Free Quote",
    },
    {
      icon: IconType.thumbsUp,
      text: "Free Survey",
    },
  ],
  theme: "default",
};

export const Light = Template.bind({});
Light.args = {
  ...Default.args,
  theme: "light",
};
