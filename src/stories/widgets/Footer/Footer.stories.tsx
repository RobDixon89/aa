import type { Meta, StoryFn } from "@storybook/react";
import Footer, { type FooterProps, type LinkList } from "./Footer";

const meta: Meta<FooterProps> = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<FooterProps> = (args: FooterProps) => (
  <Footer {...args} />
);

const linkList: LinkList = {
  title: "Link List Title",
  items: [
    {
      text: "Footer Link",
      url: "#",
    },
    {
      text: "Footer Link",
      url: "#",
    },
    {
      text: "Footer Link",
      url: "#",
    },
    {
      text: "Footer Link",
      url: "#",
    },
    {
      text: "Footer Link",
      url: "#",
    },
    {
      text: "Footer Link",
      url: "#",
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  phoneNumbers: [
    {
      url: "tel:08003579414",
      text: "0800 3579 414",
    },
    {
      url: "tel:07838124301",
      text: "07838 124301",
    },
  ],
  enquiryCta: {
    text: "Submit an Enquiry Now",
    url: "#",
  },
  copyrightText: "&copy; 2024 Ashley TV Aerials Ltd",
  copyrightLinks: [
    {
      text: "Cookies Policy",
      url: "#",
    },
    {
      text: "Terms and Conditions",
      url: "#",
    },
    {
      text: "Privacy Policy",
      url: "#",
    },
  ],
  links: [linkList, linkList, linkList, linkList],
};
