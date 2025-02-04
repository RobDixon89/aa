import type { Meta, StoryFn } from '@storybook/react';
import EmbeddedForm, { type EmbeddedFormProps } from './EmbeddedForm';

const meta: Meta<EmbeddedFormProps> = {
  component: EmbeddedForm,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Template: StoryFn<EmbeddedFormProps> = (args: EmbeddedFormProps) => (
  <EmbeddedForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 'cf-weiyfklhkfsksf',
  title: 'Book a Local Engineer Today',
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
  serviceOptions: [
    'Satellite Installation',
    'TV Aerial Installation',
    'TV Installation',
  ],
};
