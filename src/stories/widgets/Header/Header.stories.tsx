import type { Meta, StoryFn } from "@storybook/react";
import Header, {
  type HeaderProps,
  type NavigationDropdownGroup,
} from "./Header";

const meta: Meta<HeaderProps> = {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<HeaderProps> = (args: HeaderProps) => (
  <Header {...args} />
);

const dropdownlinks = [
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
  {
    text: "Dropdown Link",
    url: "#",
  },
];

function locationGroup(count: number, i: number): NavigationDropdownGroup {
  const n = Math.floor((Math.random() * 10) / 2);

  return {
    title: `Area Name ${i + 1}`,
    items: Array.from({ length: count }).map((_, i) => ({
      text: i % n === 1 ? "Longer Location Name" : "Location Name",
      url: "#",
    })),
  };
}

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      id: "services-link",
      text: "Services",
      url: "#",
      dropdown: {
        type: "simple",
        items: dropdownlinks,
      },
    },
    {
      id: "tv-link",
      text: "Digital TV",
      url: "#",
      dropdown: {
        type: "simple",
        items: dropdownlinks,
      },
    },
    {
      id: "locations-link",
      text: "Locations",
      url: "#",
      dropdown: {
        type: "complex",
        items: [...[6, 5, 4, 7].map((n, i) => locationGroup(n, i))],
      },
    },
    {
      id: "about-link",
      text: "About Us",
      url: "#",
      dropdown: {
        type: "simple",
        items: dropdownlinks,
      },
    },
  ],
  contactLink: {
    text: "Enquire Now",
    url: "#scroll",
  },
};
