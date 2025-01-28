import { ImageIcon } from "@sanity/icons";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { defineField, defineType } from "sanity";

export default defineType({
  icon: ImageIcon,
  name: "imageWithAlt",
  type: "image",
  title: "Image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "altText",
      type: "string",
      title: "Alt text",
      description:
        "Required. Used to describe images for disabled users and search engines",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export type ImageWithAlt = SanityImageObject & {
  _type: "imageWithAlt";
  altText: string;
  imageUrl: string;
  asset?: SanityReference;
};

export const imageWithAltSnippet = `
  ...,
  "imageUrl": asset->url,
  "aspectRatio": asset->width / asset->height
`;
