import type { Meta, StoryFn } from "@storybook/react";
import { Default as UspStories } from "../../components/UspList/UspList.stories";
import HomeHero, { type HomeHeroProps } from "./HomeHero";

const meta: Meta<HomeHeroProps> = {
  component: HomeHero,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<HomeHeroProps> = (args: HomeHeroProps) => (
  <HomeHero {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Your local TV Aerial and Satellite *specialists*",
  content: `<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
  <ul>
    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
    <li>Vestibulum auctor dapibus neque.</li>
    <li>Aliquam tincidunt mauris eu risus.</li>
  </ul>`,
  ctas: [
    {
      text: "Book an appointment",
      url: "#",
    },
    {
      text: "View all our services",
      url: "#",
    },
  ],
  uspList: UspStories.args?.items ? UspStories.args?.items : undefined,
  image: {
    src: "/img/home-hero.jpg",
    altText: "Homepage hero banner",
  },
};
