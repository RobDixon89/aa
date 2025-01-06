import { defineField, defineType } from "sanity";
import { iconField } from "./iconField";

export default defineType({
  name: "uspList",
  type: "array",
  title: "uspList",
  of: [
    defineField({
      name: "usp",
      type: "object",
      title: "USP",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          description:
            "Required. Used to describe images for disabled users and search engines",
          validation: (Rule) => Rule.required(),
        }),
        iconField,
      ],
    }),
  ],
});
