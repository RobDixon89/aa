import { StarFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  icon: StarFilledIcon,
  fields: [
    defineField({
      name: "reviewerName",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
  ],
});
