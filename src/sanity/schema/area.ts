import { MarkerIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "area",
  title: "Area",
  icon: MarkerIcon,
  groups: [
    {
      title: "Settings",
      name: "settings",
      default: true,
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
