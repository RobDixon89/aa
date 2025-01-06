import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "./blockContent";
import { pageFields, settingFields } from "./page";

export default defineType({
  name: "serviceLandingTemplate",
  type: "document",
  title: "Service Landing Page",
  icon: MasterDetailIcon,
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
      title: "Banner",
      type: "innerPageBanner",
      group: "pageContent",
    }),
    blockContent("all", "pageContent"),
    ...pageFields(),
  ],
});
