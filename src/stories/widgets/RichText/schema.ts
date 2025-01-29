import { MarkerIcon, TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  blockContent,
  contentOnlySnippet,
} from "../../../../schema/blockContent";
import {
  labelledLinkSnippet,
  type LabelledLink,
} from "../../../../schema/linkList";
import { themeList } from "../../../../schema/themes";
import type { Themes } from "../../components/Section/Section";

export const richTextSchema = defineType({
  icon: TextIcon,
  name: "richText",
  type: "object",
  title: "Rich Text Block",
  preview: {
    select: {
      title: "title",
      blockContent: "blockContent",
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title ? title : blockContent?.[0]?.children[0].text,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Will be a h2 tag",
    }),
    blockContent("contentOnly", undefined, "Text Content"),
    defineField({
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "center", title: "Centre" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
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
    themeList([]),
  ],
});

export const richTextSnippet = `
  ...,
  blockContent[] {
    ${contentOnlySnippet}
  },
  ctas[] {
    ${labelledLinkSnippet}
  },
  theme,
`;

export type RichTextResponse = {
  _type: "richText";
  _key: string;
  title: string | null;
  blockContent: any;
  ctas: LabelledLink[] | null;
  alignment: "left" | "center" | null;
  usps: boolean | null;
  theme: Themes;
};

export const locationListSchema = defineType({
  icon: MarkerIcon,
  name: "locationList",
  type: "object",
  title: "Location List",
  description:
    "Will display a list of all locations in a column, when placed on a category page this will link to the location page for that category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const locationListSnippet = `
  ...,
`;

export type LocationListResponse = {
  _type: "locationList";
  _key: string;
  title: string;
};
