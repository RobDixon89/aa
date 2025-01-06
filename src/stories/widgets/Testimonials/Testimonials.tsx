import React from "react";
import g from "../../../lib/global.module.scss";
import Section from "../../components/Section/Section";
import s from "./Testimonials.module.scss";

import { StarFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";

export const testimonialsSchema = defineType({
  icon: StarFilledIcon,
  name: "testimonials",
  type: "object",
  title: "Testimonial Cards",
  preview: {
    select: {
      title: "title",
      blockContent: "blockContent",
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title ? title : blockContent?.[0]?.children[0].text,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Will be a h2 tag",
    }),
    blockContent("contentOnly", undefined, "Introduction"),
    defineField({
      name: "items",
      title: "Testimonials",
      description: `Select specific tesimonials to display, if none are selected then 8 will be displayed at random`,
      type: "array",
      of: [
        defineField({
          title: "Testimonial",
          name: "testimonialLink",
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
    }),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
  ],
});

export type TestimonialsProps = {
  id: string;
  content: string;
  title?: string;
};

const Testimonials: React.FC<TestimonialsProps> = (props) => {
  if (!props.content) {
    return null;
  }

  return (
    <Section grid={true}>
      <div className={s.container}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        <div
          className={`${g.richText}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </Section>
  );
};

export default Testimonials;
