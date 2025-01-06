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

export default defineType({
  icon: LinkIcon,
  name: "linkList",
  type: "array",
  title: "Link List",
  of: [labelledLinkField],
});
