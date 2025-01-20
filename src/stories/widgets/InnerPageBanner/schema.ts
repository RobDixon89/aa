import { defineField, defineType } from "sanity";
import {
  blockContent,
  contentOnlySnippet,
} from "../../../../schema/blockContent";
import type { imageWithAlt } from "../../../../schema/image";
import {
  labelledLinkSnippet,
  type LabelledLink,
} from "../../../../schema/linkList";
import { themeList } from "../../../../schema/themes";
import { Themes } from "../../components/Section/Section";

export const innerPageBannerSchema = defineType({
  name: "innerPageBanner",
  type: "object",
  title: "Page Banner",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description:
        "Wrap words in asterisks to add a highlight, eg. Your local TV Aerial and Satellite *specialists*",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Sub Heading",
      description:
        "Displayed before the heading, will default to the name of the parent page if unpopulated",
    }),
    blockContent("contentOnly", undefined, "Text Content"),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
    defineField({
      name: "usps",
      title: "Display USP List",
      type: "boolean",
    }),
    themeList([Themes.default, Themes.navy]),
  ],
});

export const innerPageBannerQuery = `
  blockContent[] {
    ${contentOnlySnippet}
  },
  image,
  subtitle,
  theme,
  title,
  usps,
  ctas[] {
    ${labelledLinkSnippet}
  },
`;

export type InnerPageBannerResponse = {
  title: string;
  subtitle: string | null;
  image: imageWithAlt | null;
  blockContent: any;
  ctas: LabelledLink[];
  usps: boolean | null;
  theme: Exclude<Themes, Themes.default | Themes.navy>;
};
