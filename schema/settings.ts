import { defineField, defineType } from "sanity";
import { footerFields } from "../src/stories/widgets/Footer/schema";
import { headerFields } from "../src/stories/widgets/Header/schema";

export default defineType({
  name: "siteSettings",
  type: "object",
  title: "Site Settings",
  groups: [
    {
      title: "Settings",
      name: "settings",
      default: true,
    },
    {
      title: "Navigation",
      name: "navigation",
    },
    {
      title: "Footer",
      name: "footer",
    },
    {
      title: "USP List",
      name: "usps",
    },
  ],
  fields: [
    defineField({
      title: "Google Analytics ID",
      name: "gaID",
      type: "string",
      group: "settings",
    }),
    ...headerFields,
    ...footerFields,
    defineField({
      name: "uspItems",
      title: "USP Items",
      type: "uspList",
      description: `These will be used within any Banner or Rich Text block where "Display USP List" is enabled`,
      group: "usps",
    }),
  ],
});
