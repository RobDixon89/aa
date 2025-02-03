import type { Meta, StoryFn } from "@storybook/react";
import CtaBlock, { type CtaBlockProps } from "./CtaBlock";

const meta: Meta<CtaBlockProps> = {
  component: CtaBlock,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<CtaBlockProps> = (args: CtaBlockProps) => (
  <CtaBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "dghgsddsjsd",
  items: [
    {
      text: "Button Text",
      url: "#",
    },
    {
      text: "Button Text",
      url: "#",
    },
  ],
};
