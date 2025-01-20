import { LinkIcon, MarkerIcon, WrenchIcon } from "@sanity/icons";
import { defineField } from "sanity";
import {
  internalLink,
  internalLinkSnippet,
  locationLinkSnippet,
  serviceLinkSnippet,
  type InternalLink,
  type LocationLink,
  type ServiceLink,
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
      "locations": *[_type == "location" && addToNav == true] { ${locationLinkSnippet} }
    },
    _type=='servicesDropdown'=>{
      text,
      "services": *[_type == "service"] { ${serviceLinkSnippet} }
    },
    _type=='dropdown'=>{
      text,
      "url": internalLink-> slug.current,
      "pageTitle": internalLink-> title,

      dropdownLinks[]-> { ${internalLinkSnippet} },
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
  services: Omit<ServiceLink, "_type">;
};

type AllLocationsDropdown = {
  _type: "locationDropdown";
  text: string;
  services: Omit<LocationLink, "_type">;
};

export type HeaderFieldResponse = {
  links: (
    | NavigationDropdownLink
    | AllServicesDropdown
    | AllLocationsDropdown
  )[];
  headerButtonText: string | null;
};
