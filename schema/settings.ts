import { defineField, defineType } from "sanity";
import {
  bookingFormFields,
  enquiryFormFields,
} from "../src/stories/widgets/EmbeddedForm/EmbeddedForm";
import { footerFields } from "../src/stories/widgets/Footer/Footer";
import { headerFields } from "../src/stories/widgets/Header/Header";

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
      title: "Contact Form",
      name: "contactForm",
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
    bookingFormFields,
    enquiryFormFields,
    defineField({
      name: "uspItems",
      title: "USP Items",
      type: "uspList",
      description: `These will be used within any Banner or Rich Text block where "Display USP List" is enabled`,
      group: "usps",
    }),
  ],
});
