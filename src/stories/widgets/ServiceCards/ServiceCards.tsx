import React from "react";
import g from "../../../lib/global.module.scss";
import Section from "../../components/Section/Section";
import s from "./ServiceCards.module.scss";

import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";

export const serviceCardsSchema = defineType({
  icon: WrenchIcon,
  name: "serviceCards",
  type: "object",
  title: "Service Cards",
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
      title: "Services",
      description: `Select service pages to link to, if list isn't populated then all services will be displayed`,
      type: "array",
      of: [
        defineField({
          title: "Service",
          name: "serviceLink",
          type: "reference",
          to: [{ type: "service" }],
        }),
      ],
    }),
    defineField({
      name: "serviceTypes",
      title: "Service Types",
      type: "string",
      initialValue: "parent",
      description:
        "If no services are populated, Which services should be displayed? Parent Services Only will display only the services which don't have a parent.",
      options: {
        list: [
          { value: "parent", title: "Parent Services Only" },
          { value: "all", title: "All Services" },
        ],
      },
      hidden: ({ parent }) => parent?.items?.length > 0,
    }),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
  ],
});

export type ServiceCardsProps = {
  id: string;
  content: string;
  title?: string;
};

const ServiceCards: React.FC<ServiceCardsProps> = (props) => {
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

export default ServiceCards;
