import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "./blockContent";
import { pageFields, settingFields } from "./page";

export default defineType({
  name: "service",
  type: "document",
  title: "Service",
  icon: WrenchIcon,
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
      title: "Location Template",
      name: "locationTemplate",
    },
    {
      title: "Location Metadata",
      name: "locationMeta",
    },
  ],
  preview: {
    select: {
      title: "title",
      parent: "parentService.title",
    },
    prepare(selection) {
      const { title, parent } = selection;

      return {
        title: `${title} ${parent ? `(${parent})` : ""}`,
      };
    },
  },
  fields: [
    ...settingFields,
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
      description:
        "Add a short description of this service, this will be used for Service Cards",
      group: "settings",
    }),
    defineField({
      title: "Parent service",
      name: "parentService",
      type: "reference",
      to: [{ type: "service" }],
      description: "Parent service is used to define the page structure.",
      options: {
        disableNew: true,
        filter: "!defined(parentService)",
      },
      validation: (rule) =>
        rule.custom((parentService, context) => {
          if (!parentService) return true;
          if (
            context.document &&
            context.document._id.includes(parentService._ref)
          )
            return "You can not select the current service. Please select another service.";
          return true;
        }),
      group: "settings",
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
