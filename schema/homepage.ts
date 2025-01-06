import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "./blockContent";
import { pageFields } from "./page";

export default defineType({
  name: "homepage",
  type: "document",
  title: "Homepage",
  icon: HomeIcon,
  groups: [
    {
      title: "Content",
      name: "pageContent",
      default: true,
    },
    {
      title: "Metadata",
      name: "metadata",
    },
  ],
  fields: [
    defineField({
      name: "banner",
      title: "Page Banner",
      type: "homeHero",
      group: "pageContent",
    }),
    blockContent("all", "pageContent"),
    ...pageFields(),
  ],
});
