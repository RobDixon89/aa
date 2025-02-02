import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "./blockContent";
import { pageFields, settingFields } from "./page";

export default defineType({
  name: "homepage",
  type: "document",
  title: "Homepage",
  icon: HomeIcon,
  groups: [
    {
      title: "Settings",
      name: "settings",
      default: true,
    },
    {
      title: "Content",
      name: "pageContent",
    },
    {
      title: "Metadata",
      name: "metadata",
    },
  ],
  fields: [
    ...settingFields,
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
