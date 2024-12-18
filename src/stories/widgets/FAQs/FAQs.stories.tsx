import type { Meta, StoryFn } from "@storybook/react";
import Faqs, { type FaqsProps } from "./FAQs";

const meta: Meta<FaqsProps> = {
  component: Faqs,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<FaqsProps> = (args: FaqsProps) => <Faqs {...args} />;

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: `faq-item-${i}`,
  question: `Question Title`,
  answer:
    Math.random() < 0.5
      ? `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus tortor, pulvinar eu ullamcorper sed, consectetur non turpis. Maecenas in <a href="#">nunc pulvinar</a>, rutrum mi sit amet, dignissim nibh.</p>
        <ul>
          <li>Duis ut sollicitudin mi.</li>
          <li>Suspendisse ut accumsan elit, ut eleifend nibh.</li>
          <li>Ut nibh nisl, rutrum in dignissim vitae, pretium a magna.</li>
          <li>Vivamus eget orci felis.</li>
          <li>Morbi et finibus elit.</li>
          <li>Vivamus sagittis eu ligula a mollis.</li>
        </ul>`
      : `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lectus tortor, pulvinar eu ullamcorper sed, consectetur non turpis. Maecenas in nunc pulvinar, rutrum mi sit amet, dignissim nibh. Vestibulum lobortis eros et massa fermentum, non volutpat ipsum mollis. Pellentesque faucibus sed diam nec placerat. Nunc convallis, lectus at ultrices finibus, velit dui euismod ligula, sed condimentum lectus metus a nisl.</p>`,

  ctas:
    Math.random() < 0.5
      ? [
          {
            text: "Button Text",
            url: "#",
          },
          {
            text: "Button Text",
            url: "#",
          },
        ]
      : [],
}));

export const Default = Template.bind({});
Default.args = {
  id: "rt-675t872yg78322",
  title: "Proin ut urna sit amet mauris",
  items,
  variant: "default",
};

export const Dark = Template.bind({});
Dark.args = {
  ...Default.args,
  variant: "dark",
};
