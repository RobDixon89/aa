import React from "react";
import g from "../../../lib/global.module.scss";
import Section from "../../components/Section/Section";
import s from "./EmbeddedForm.module.scss";

import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";

export const embeddedFormSchema = defineType({
  icon: EnvelopeIcon,
  name: "embeddedForm",
  type: "object",
  title: "Embedded Form",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Will be a h2 tag",
      validation: (Rule) => Rule.required(),
    }),
    blockContent("contentOnly", undefined, "Introduction"),
  ],
});

export const bookingFormFields = defineField({
  name: "bookingForm",
  type: "object",
  title: "Booking Form Fields",
  group: "contactForm",
  fields: [
    blockContent(
      "contentOnly",
      undefined,
      "Introduction",
      "bookingIntroduction",
      "Wrap the text for the switch button in double asterisks, eg. **Click Here**"
    ),
    defineField({
      name: "bookingSubmitLabel",
      type: "string",
      title: "Submit Label",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const enquiryFormFields = defineField({
  name: "enquiryForm",
  type: "object",
  title: "Enquiry Form Fields",
  group: "contactForm",
  fields: [
    blockContent(
      "contentOnly",
      undefined,
      "Introduction",
      "enquiryIntroduction",
      "Wrap the text for the switch button in double asterisks, eg. **Click Here**"
    ),
    defineField({
      name: "enquirySubmitLabel",
      type: "string",
      title: "Submit Label",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export type EmbeddedFormProps = {
  id: string;
  content: string;
  title?: string;
};

const EmbeddedForm: React.FC<EmbeddedFormProps> = (props) => {
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

export default EmbeddedForm;
