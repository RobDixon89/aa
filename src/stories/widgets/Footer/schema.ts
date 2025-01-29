import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";
import {
  internalLink,
  internalLinkSnippet,
  type InternalLink,
} from "../../../../schema/linkList";

export const footerFields = [
  defineField({
    name: "linkGroups",
    type: "array",
    title: "Link Groups",
    group: "footer",
    validation: (Rule) => Rule.max(6),
    of: [
      defineField({
        icon: LinkIcon,
        name: "linkGroup",
        title: "Link Group",
        type: "object",
        fields: [
          defineField({
            name: "groupTitle",
            type: "string",
            title: "Title",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "groupLinks",
            type: "array",
            title: "Links",
            of: [internalLink],
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "phoneLinks",
    type: "array",
    title: "Contact Number Links",
    group: "footer",
    validation: (Rule) => Rule.max(3),
    of: [
      defineField({
        name: "phoneLink",
        type: "object",
        title: "Link",
        validation: (rule) => rule.required(),
        fields: [
          defineField({
            name: "phoneNumber",
            title: "Phone Number",
            description:
              "The telephone number which will open in the user's phone app",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "text",
            type: "string",
            title: "Link Text",
            description: "If not populated, will default to the phone number",
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "footerButtonText",
    type: "string",
    title: "Contact Button Text",
    group: "footer",
    description:
      "If left blank, no Contact Button will be displayed in the footer",
  }),
  defineField({
    name: "copyrightText",
    type: "string",
    title: "Copyright Text",
    group: "footer",
    description: "For the placement of the year, use the placeholder ##year##",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "copyrightLinks",
    type: "array",
    title: "Copyright Links",
    group: "footer",
    of: [internalLink],
  }),
];

export const footerQuery = `
  linkGroups[] {
    "title": groupTitle,
    "links": groupLinks[]-> { ${internalLinkSnippet} }
  },
  phoneLinks[] {
    phoneNumber,
    text
  },
  copyrightLinks,
  copyrightText,
  footerButtonText
`;

type PhoneLink = {
  phoneNumber: string;
  text: string | null;
};

export type FooterFieldResponse = {
  linkGroups: {
    title: string;
    links: InternalLink[];
  }[];
  copyrightLinks: InternalLink[];
  copyrightText: string;
  footerButtonText: string | null;
  phoneLinks: PhoneLink[];
};
