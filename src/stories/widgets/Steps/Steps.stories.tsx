import type { Meta, StoryFn } from "@storybook/react";
import { Themes } from "../../components/Section/Section";
import Steps, { type StepsProps } from "./Steps";

const meta: Meta<StepsProps> = {
  component: Steps,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<StepsProps> = (args: StepsProps) => <Steps {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "sc-sjdgldskjabsaldj",
  title: "Our Services",
  children: (
    <>
      <p>
        Vestibulum in enim condimentum, tristique ligula vel, scelerisque felis.
        Fusce suscipit hendrerit metus et sodales. Phasellus ut euismod lacus.
        Mauris hendrerit dolor ligula, sit amet congue mauris luctus a. Ut
        volutpat sagittis fermentum.{" "}
      </p>
    </>
  ),
  items: [
    {
      _type: "step",
      id: "khkfhggf",
      content: `<p>Make an enquiry online or call us on <a href="#">NUMBER</a></p>`,
      theme: Themes.lightBlue,
    },
    {
      _type: "step",
      id: "akhndak",
      content: `<p>Our engineers will call you back with a quote</p>`,
      theme: Themes.navy,
    },
    {
      _type: "step",
      id: "mpaGDOSJB",
      content: `<p>If you’re happy to go ahead, we’ll arrange a <strong>FREE</strong> site survey</p>`,
      theme: Themes.yellow,
    },
  ],
  ctas: [
    { text: "Call Now", url: "#" },
    { text: "Make an Enquiry", url: "#" },
  ],
  theme: Themes.blue,
};

export const ImageSteps = Template.bind({});
ImageSteps.args = {
  ...Default.args,
  items: [
    {
      _type: "stepImage",
      id: "khkfhggf",
      image: {
        src: "/img/image-text-5050.jpg",
        altText: "Lorem ipsum dolor sit",
      },
      imageType: "cover",
    },
    {
      _type: "stepImage",
      id: "dsd",
      image: {
        src: "/img/home-hero.jpg",
        altText: "Lorem ipsum dolor sit",
      },
      imageType: "cover",
    },
    {
      _type: "stepImage",
      id: "bgjkqas",
      image: {
        src: "/img/image-text-5050.jpg",
        altText: "Lorem ipsum dolor sit",
      },
      imageType: "cover",
    },
  ],
};
