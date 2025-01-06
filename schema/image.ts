import { ImageIcon } from "@sanity/icons";
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
