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
  preview: {
    select: {
      title: "title",
      blockContent: "blockContent",
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title
          ? title
          : blockContent?.[0]?.children[0]?.text
            ? blockContent?.[0]?.children[0]?.text
            : "Contact Form Only",
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
