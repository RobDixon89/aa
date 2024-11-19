import type { Meta, StoryFn } from "@storybook/react";
import Section, { Themes } from "../Section/Section";
import Button, { type ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <>
    {Object.values(Themes).map((theme) => (
      <Section theme={theme}>
        <Button {...args} />
      </Section>
    ))}
  </>
);

export const Default = Template.bind({});
Default.args = {
  theme: "default",
  label: "Button Text",
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  ...Default.args,
  // @ts-ignore
  disabled: true,
};

export const Outline = Template.bind({});
Outline.args = {
  ...Default.args,
  theme: "outline",
};

export const OutlineDisabled = Template.bind({});
OutlineDisabled.args = {
  ...Outline.args,
  // @ts-ignore
  disabled: true,
};

export const Text = Template.bind({});
Text.args = {
  ...Default.args,
  theme: "text",
};

export const TextDisabled = Template.bind({});
TextDisabled.args = {
  ...Text.args,
  // @ts-ignore
  disabled: true,
};
