import { motion, MotionConfig } from "motion/react";
import React from "react";
import Logo from "../../../img/logo.svg?url";
import Icon, { IconType } from "../../../utils/icon";
import { useMediaQuery } from "../../../utils/useMediaQuery";
import { LinkButton } from "../../components/Button/Button";
import Section, { Themes } from "../../components/Section/Section";
import s from "./Footer.module.scss";

import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";
import { internalLink } from "../../../../schema/linkList";

export const footerFields = [
  defineField({
    name: "linkGroups",
    type: "array",
    title: "Link Groups",
    group: "footer",
    validation: (Rule) => Rule.max(6),
    of: [
      defineField({
        icon: LinkIcon,
        name: "linkGroup",
        title: "Link Group",
        type: "object",
        fields: [
          defineField({
            name: "groupTitle",
            type: "string",
            title: "Title",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "groupLinks",
            type: "array",
            title: "Links",
            of: [internalLink],
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "phoneLinks",
    type: "array",
    title: "Contact Number Links",
    group: "footer",
    validation: (Rule) => Rule.max(3),
    of: [
      defineField({
        name: "phoneLink",
        type: "object",
        title: "Link",
        validation: (rule) => rule.required(),
        fields: [
          defineField({
            name: "phoneNumber",
            title: "Phone Number",
            description:
              "The telephone number which will open in the user's phone app",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "text",
            type: "string",
            title: "Link Text",
            description: "If not populated, will default to the phone number",
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "footerButtonText",
    type: "string",
    title: "Contact Button Text",
    group: "footer",
    description:
      "If left blank, no Contact Button will be displayed in the footer",
  }),
  defineField({
    name: "copyrightText",
    type: "string",
    title: "Copyright Text",
    group: "footer",
    description: "For the placement of the year, use the placeholder ##year##",
  }),
  defineField({
    name: "copyrightLinks",
    type: "array",
    title: "Copyright Links",
    group: "footer",
    of: [internalLink],
  }),
];

export type LinkList = {
  title: string;
  items: CtaModel[];
};

export type FooterProps = {
  copyrightLinks: CtaModel[];
  copyrightText: string;
  enquiryCta: CtaModel;
  links: LinkList[];
  phoneNumbers: CtaModel[];
};

const Footer: React.FC<FooterProps> = (props) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [active, setActive] = React.useState<number>(-1);

  return (
    <Section className={s.container} grid={true} theme={Themes.navy}>
      <div className={s.contact}>
        <a href="/" className={s.logo} aria-label="Go to homepage">
          <img src={Logo} alt="Ashley Aerials Ltd Logo" />
        </a>

        {props.phoneNumbers && props.phoneNumbers.length > 0 ? (
          <div className={s.phoneNumbers}>
            {props.phoneNumbers.map((pn, i) => (
              <LinkButton
                key={`footer-contact-${i}`}
                href={pn.url}
                icon={IconType.phone}
                label={pn.text}
                theme="text"
              />
            ))}
          </div>
        ) : null}

        {props.enquiryCta ? (
          <LinkButton
            href={props.enquiryCta.url}
            label={props.enquiryCta.text}
            theme="default"
          />
        ) : null}
      </div>

      {props.links && props.links.length > 0 ? (
        <div className={s.linkLists}>
          <MotionConfig transition={{ duration: 0.35 }}>
            {props.links.map((ll, i) => (
              <motion.ul
                id={`footer-ll-${i}-links`}
                key={`footer-ll-${i}`}
                className={s.linkList}
                variants={{ closed: { height: 35 }, open: { height: "auto" } }}
                initial="closed"
                animate={active === i ? "open" : "closed"}
              >
                <li>
                  <button
                    onClick={() => {
                      if (active === i) {
                        setActive(-1);
                      } else {
                        setActive(i);
                      }
                    }}
                    className={s.listTitle}
                    aria-expanded={active === i || !isMobile}
                    aria-controls={`footer-ll-${i}-links`}
                  >
                    {ll.title}

                    <Icon icon={IconType.chevron} />
                  </button>
                </li>

                {ll.items.map((l, j) => (
                  <li key={`footer-ll-${i}-${j}`}>
                    <LinkButton
                      href={l.url}
                      label={l.text}
                      target={l.target}
                      theme="text"
                      icon={IconType.none}
                    />
                  </li>
                ))}
              </motion.ul>
            ))}
          </MotionConfig>
        </div>
      ) : null}

      <div className={s.copyright}>
        {props.copyrightLinks && props.copyrightLinks.length > 0 && (
          <ul className={s.copyrightLinks}>
            {props.copyrightLinks.map((cl, i) => (
              <React.Fragment key={`footer-copyright-links-${i}`}>
                <li>
                  <LinkButton
                    href={cl.url}
                    label={cl.text}
                    target={cl.target}
                    theme="text"
                    icon={IconType.none}
                  />
                </li>
                {i < props.copyrightLinks.length - 1 ? <li>&bull;</li> : null}
              </React.Fragment>
            ))}
          </ul>
        )}
        {props.copyrightText && (
          <p dangerouslySetInnerHTML={{ __html: props.copyrightText }} />
        )}
      </div>
    </Section>
  );
};

export default Footer;
