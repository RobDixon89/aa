import type { Meta, StoryFn } from "@storybook/react";
import Testimonials, { type TestimonialsProps } from "./Testimonials";

const meta: Meta<TestimonialsProps> = {
  component: Testimonials,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<TestimonialsProps> = (args: TestimonialsProps) => (
  <Testimonials {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "t-vwg97b2f9o8sisdi",
  title: "Reviews",
  children: (
    <>
      <p>
        Vestibulum in enim condimentum, tristique ligula vel, scelerisque felis.
        Fusce suscipit hendrerit metus et sodales. Phasellus ut euismod lacus.
        Mauris hendrerit dolor ligula, sit amet congue mauris luctus a. Ut
        volutpat sagittis fermentum.
      </p>
    </>
  ),
};
