import type { Meta, StoryFn } from '@storybook/react';
import { Themes } from '../../Global/Section/Section';
import ImageBlock, { type ImageBlockProps } from './ImageBlock';

const meta: Meta<ImageBlockProps> = {
  component: ImageBlock,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Template: StoryFn<ImageBlockProps> = (args: ImageBlockProps) => (
  <ImageBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: {
    src: '/img/image-block.jpg',
    altText: 'Lorem ipsum dolor sit',
  },
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  ...Default.args,
  caption: 'Praesent dapibus, neque id cursus faucibus',
};

export const LightBlue = Template.bind({});
LightBlue.args = {
  ...WithCaption.args,
  theme: Themes.lightBlue,
};

export const Navy = Template.bind({});
Navy.args = {
  ...WithCaption.args,
  theme: Themes.navy,
};
