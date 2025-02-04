import type { Meta, StoryFn } from '@storybook/react';
import ServiceCards, { type ServiceCardsProps } from './ServiceCards';

const meta: Meta<ServiceCardsProps> = {
  component: ServiceCards,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Template: StoryFn<ServiceCardsProps> = (args: ServiceCardsProps) => (
  <ServiceCards {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 'sc-sjdgldskjabsaldj',
  title: 'Our Services',
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
  items: [
    {
      id: 'sjhsjhs',
      parent: 'TV Installation',
      name: 'Digital TV Aerial Installation',
      description:
        'Cras rhoncus nunc tempus purus pretium, sit amet mattis ante mattis. Mauris vel fringilla felis, et eleifend ex.',
      image: {
        src: '/img/image-text-5050.jpg',
        altText: 'Lorem ipsum dolor sit',
      },
      url: '#',
    },
    {
      id: 'reeafbryw',
      name: 'FreeSat Dish installation',
      description:
        'Cras rhoncus nunc tempus purus pretium, sit amet mattis ante mattis. Mauris vel fringilla felis, et eleifend ex.',
      image: null,
      url: '#',
    },
    {
      id: 'gdjgjsgd',
      name: 'Sky Satellite Dish Installers',
      description:
        'Cras rhoncus nunc tempus purus pretium, sit amet mattis ante mattis. Mauris vel fringilla felis, et eleifend ex.',
      image: {
        src: '/img/image-text-5050.jpg',
        altText: 'Lorem ipsum dolor sit',
      },
      url: '#',
    },
  ],
  ctas: [
    {
      text: 'Button Text',
      url: '#',
    },
    {
      text: 'Button Text',
      url: '#',
    },
  ],
};
