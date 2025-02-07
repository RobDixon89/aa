import type { Meta, StoryFn } from '@storybook/react';
import { Themes } from '../../Global/Section/Section';
import ImageText5050, { type ImageText5050Props } from './ImageText5050';

const meta: Meta<ImageText5050Props> = {
  component: ImageText5050,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Template: StoryFn<ImageText5050Props> = (args: ImageText5050Props) => (
  <>
    <div style={{ height: 1800 }} />
    <ImageText5050 {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  id: '98749bs-9823buo',
  title: 'Lorem ipsum dolor sit',
  children: (
    <>
      <p>
        Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod
        in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
      </p>
      <p>
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue,
        eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
        tincidunt quis, accumsan porttitor, facilisis luctus, metus.
      </p>
    </>
  ),
  ctas: [
    {
      text: 'Book an appointment',
      url: '#',
    },
    {
      text: 'View all our services',
      url: '#',
    },
  ],
  image: {
    src: '/img/image-text-5050.jpg',
    altText: 'Lorem ipsum dolor sit',
  },
  imageAlign: 'left',
};

export const ImageRight = Template.bind({});
ImageRight.args = {
  ...Default.args,
  imageAlign: 'right',
};

export const Blue = Template.bind({});
Blue.args = {
  ...Default.args,
  theme: Themes.blue,
};

export const BlueImageRight = Template.bind({});
BlueImageRight.args = {
  ...Blue.args,
  imageAlign: 'right',
};

export const LightBlue = Template.bind({});
LightBlue.args = {
  ...Default.args,
  theme: Themes.lightBlue,
};

export const LightBlueImageRight = Template.bind({});
LightBlueImageRight.args = {
  ...LightBlue.args,
  imageAlign: 'right',
};

export const Yellow = Template.bind({});
Yellow.args = {
  ...Default.args,
  theme: Themes.yellow,
};

export const YellowImageRight = Template.bind({});
YellowImageRight.args = {
  ...Yellow.args,
  imageAlign: 'right',
};
