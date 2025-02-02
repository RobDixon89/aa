import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const internalLink = defineField({
  title: "Internal Link",
  name: "internalLink",
  description: "Select pages for navigation",
  type: "reference",
  readOnly: ({ parent }) => {
    return !!parent?.externalUrl || !!parent?.contactLink;
  },
  to: [
    { type: "page" },
    { type: "location" },
    { type: "locationTemplates" },
    { type: "service" },
    { type: "serviceLandingTemplate" },
  ],
});

type PageLink = {
  _type: "page" | "serviceLandingTemplate" | "locationTemplates";
  title: string;
  url: string;
};

export type LocationLink = {
  _type: "location";
  name: string;
  area: string;
  addToNav: boolean | null;
};

export type ServiceLink = {
  _type: "service";
  title: string;
  parent: string | null;
};

export type InternalLink = PageLink | LocationLink | ServiceLink;

export const locationLinkSnippet = `
  name,
  "area": areaRef-> name,
  addToNav
`;

export const serviceLinkSnippet = `
  title,
  "parent": parentService-> title
`;

export const internalLinkSnippet = `
  ...,  
  _type=='location'=>{ ${locationLinkSnippet} },
  _type=='locationTemplates'=>{
    title,
    "url": "locations"
  },
  _type=='page'=>{
    title,
    "url": slug.current,
  },
  _type=='service'=>{ ${serviceLinkSnippet} },
  _type=='serviceLandingTemplate'=>{
    title,
    "url": "services"
  },
`;

const externalLink = defineField({
  name: "externalUrl",
  title: "External URL",
  description:
    "Use fully qualified URLS for external link (E.g. https://your-website.co.uk)",
  type: "url",
  readOnly: ({ parent }) => {
    return !!parent?.internalLink || !!parent?.contactLink;
  },
  validation: (Rule) =>
    Rule.uri({ scheme: ["https", "http", "mailto", "tel"] }),
});

const contactLink = defineField({
  name: "contactLink",
  title: "Contact Form Link?",
  type: "boolean",
  description: `If this is set to true, the user will be scrolled to the contact form on that page when the button is clicked`,
  readOnly: ({ parent }) => {
    return !!parent?.internalLink || !!parent?.externalUrl;
  },
});

export const linkField = defineField({
  icon: LinkIcon,
  name: "contentLink",
  type: "object",
  title: "Link",
  fields: [internalLink, externalLink, contactLink],
});

export const labelledLinkField = defineField({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Link Text",
      description: `If this isn't populated will default to the Page Title for internal links, the URL for external links, or "Make an enquiry" for contact links`,
    }),
    internalLink,
    externalLink,
    contactLink,
  ],
});

export const linkSnippet = `
  externalUrl,
  internalLink-> {
    ${internalLinkSnippet}
  },
  contactLink
`;

export const labelledLinkSnippet = `
  "title": text,
  ${linkSnippet}
`;

export type LabelledLink = {
  title: string | null;
  externalUrl: string | null;
  internalLink: InternalLink | null;
  contactLink: boolean | null;
};

export default defineType({
  icon: LinkIcon,
  name: "linkList",
  type: "array",
  title: "Link List",
  of: [labelledLinkField],
});
