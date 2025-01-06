import type { Meta, StoryFn } from "@storybook/react";
import Steps, { type StepsProps } from "./Steps";

const meta: Meta<StepsProps> = {
  component: Steps,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<StepsProps> = (args: StepsProps) => <Steps {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "sc-sjdgldskjabsaldj",
  title: "Our Services",
  content: `<p>Vestibulum in enim condimentum, tristique ligula vel, scelerisque felis. Fusce suscipit hendrerit metus et sodales. Phasellus ut euismod lacus. Mauris hendrerit dolor ligula, sit amet congue mauris luctus a. Ut volutpat sagittis fermentum. </p>`,
};
