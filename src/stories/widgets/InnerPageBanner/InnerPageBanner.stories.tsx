import type { Meta, StoryFn } from "@storybook/react";
import { Themes } from "../../components/Section/Section";
import { Default as UspStories } from "../../components/UspList/UspList.stories";
import InnerPageBanner, { type InnerPageBannerProps } from "./InnerPageBanner";

const meta: Meta<InnerPageBannerProps> = {
  component: InnerPageBanner,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<InnerPageBannerProps> = (
  args: InnerPageBannerProps
) => <InnerPageBanner {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  breadcrumbs: [
    {
      text: "Home",
      url: "#",
    },
    {
      text: "Parent Page",
      url: "#",
    },
    {
      text: "Lorem Ipsum Dolor Sit",
      url: "#",
    },
  ],
  subtitle: "Parent Title",
  title: "Lorem Ipsum Dolor Sit",
  children: (
    <>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </p>
    </>
  ),
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
    src: "/img/inner-page-banner.jpg",
    altText: "Lorem ipsum dolor",
  },
  theme: Themes.blue,
};

export const BlueNoImage = Template.bind({});
BlueNoImage.args = {
  ...Blue.args,
  image: undefined,
};

export const LightBlue = Template.bind({});
LightBlue.args = {
  ...Blue.args,
  theme: Themes.lightBlue,
};

export const LightBlueNoImage = Template.bind({});
LightBlueNoImage.args = {
  ...LightBlue.args,
  image: undefined,
};

export const Yellow = Template.bind({});
Yellow.args = {
  ...Blue.args,
  theme: Themes.yellow,
};

export const YellowNoImage = Template.bind({});
YellowNoImage.args = {
  ...Yellow.args,
  image: undefined,
};
