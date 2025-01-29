import { UnknownIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  blockContent,
  contentOnlySnippet,
} from "../../../../schema/blockContent";
import {
  labelledLinkSnippet,
  type LabelledLink,
} from "../../../../schema/linkList";

export const faqsSchema = defineType({
  icon: UnknownIcon,
  name: "faqs",
  type: "object",
  title: "FAQs",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "FAQ List",
      of: [
        defineField({
          type: "object",
          name: "faq",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Question",
              validation: (Rule) => Rule.required(),
            }),
            blockContent("contentOnly", undefined, "Answer", "answer"),
            defineField({
              name: "ctas",
              title: "Link List",
              type: "linkList",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "default",
      options: {
        list: [
          { value: "default", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    }),
  ],
});

export const faqsSnippet = `
  ...,
  items[] {
    ...,
    answer[] {
      ${contentOnlySnippet}
    },
    ctas[] {
      ${labelledLinkSnippet}
    },
  }
`;

type FaqItem = {
  _type: "faq";
  _key: string;
  question: string;
  answer: any;
  ctas: LabelledLink[] | null;
};

export type FaqsResponse = {
  _type: "faqs";
  _key: string;
  title: string;
  items: FaqItem[];
  variant: "default" | "dark" | null;
};
