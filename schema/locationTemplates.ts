import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "./blockContent";
import { pageFields } from "./page";

export default defineType({
  name: "locationTemplates",
  type: "document",
  title: "Location Landing Page",
  icon: MasterDetailIcon,
  groups: [
    {
      title: "Settings",
      name: "settings",
      default: true,
    },
    {
      title: "Landing Template",
      name: "landingTemplate",
    },
    {
      title: "Landing Metadata",
      name: "landingMeta",
    },
    {
      title: "Location Inner Template",
      name: "locationTemplate",
    },
    {
      title: "Location Inner Metadata",
      name: "locationMeta",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "settings",
      description: "This will be used within breadcrumbs of child pages",
    }),
    defineField({
      name: "landingBanner",
      title: "Landing Page Banner",
      type: "innerPageBanner",
      group: "landingTemplate",
    }),
    blockContent(
      "all",
      "landingTemplate",
      "Landing Page Content",
      "landingContent"
    ),
    defineField({
      name: "locationBanner",
      title: "Location Page Banner",
      type: "innerPageBanner",
      group: "locationTemplate",
      description:
        "Use the placeholder ##location## wherever you want the name of a location to be displayed in content",
    }),
    blockContent(
      "all",
      "locationTemplate",
      "Location Page Content",
      "locationContent",
      "Use the placeholder ##location## wherever you want the name of a location to be displayed in content"
    ),
    ...pageFields("landingMeta"),
    ...pageFields("locationMeta"),
  ],
});
