import { MarkerIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "location",
  title: "Location",
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
    defineField({
      name: "addToNav",
      title: "Show in Navigation?",
      type: "boolean",
      initialValue: true,
      group: "settings",
    }),
    defineField({
      title: "Area",
      name: "areaRef",
      type: "reference",
      to: [{ type: "area" }],
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
