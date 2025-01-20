import { LinkIcon, MarkerIcon, WrenchIcon } from "@sanity/icons";
import { defineField } from "sanity";
import {
  internalLink,
  internalLinkSnippet,
  type InternalLink,
} from "../../../../schema/linkList";

export const headerFields = [
  defineField({
    name: "navigationLinks",
    type: "array",
    title: "Navigation Links",
    group: "navigation",
    of: [
      defineField({
        icon: LinkIcon,
        name: "dropdown",
        type: "object",
        title: "Navigation Dropdown Link",
        fields: [
          defineField({
            name: "text",
            type: "string",
            title: "Link Text",
            description: `If this isn't populated will default to the page title`,
          }),
          internalLink,
          defineField({
            name: "dropdownLinks",
            type: "array",
            title: "Link List",
            of: [internalLink],
          }),
        ],
      }),
      defineField({
        icon: MarkerIcon,
        name: "locationDropdown",
        type: "object",
        fields: [
          defineField({
            name: "text",
            type: "string",
            title: "Title",
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
      defineField({
        icon: WrenchIcon,
        name: "servicesDropdown",
        type: "object",
        fields: [
          defineField({
            name: "text",
            type: "string",
            title: "Title",
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "headerButtonText",
    type: "string",
    title: "Contact Button Text",
    group: "navigation",
    description:
      "If left blank, no Contact Button will be displayed in the header",
  }),
];

export const headerQuery = `
  "links": navigationLinks[] {
    _type,
    _type=='locationDropdown'=>{
      text,
    },
    _type=='servicesDropdown'=>{
      text,
    },
    _type=='dropdown'=>{
      text,
      "url": internalLink-> slug.current,
      "pageTitle": internalLink-> title,

      "links": dropdownLinks[]-> { ${internalLinkSnippet} },
    },    
  },
  headerButtonText
`;

type NavigationDropdownLink = {
  _type: "dropdown";
  text: string | null;
  url: string;
  pageTitle: string;
  links: InternalLink[];
};

type AllServicesDropdown = {
  _type: "servicesDropdown";
  text: string;
};

type AllLocationsDropdown = {
  _type: "locationDropdown";
  text: string;
};

export type DropdownLinkResponse =
  | NavigationDropdownLink
  | AllServicesDropdown
  | AllLocationsDropdown;

export type HeaderFieldResponse = {
  links: DropdownLinkResponse[];
  headerButtonText: string | null;
};
