import { motion, MotionConfig } from "motion/react";
import React from "react";
import { useFirstMountState } from "react-use";
import g from "../../../lib/global.module.scss";
import { clamp } from "../../../utils";
import Icon, { IconType } from "../../../utils/icon";
import { useMediaQuery } from "../../../utils/useMediaQuery";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import s from "./FAQs.module.scss";

import { UnknownIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";

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
  ],
});

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  ctas: CtaModel[];
};

export type FaqsProps = {
  id: string;
  items: FaqItem[];
  title?: string;
  variant: "default" | "dark";
};

const Faqs: React.FC<FaqsProps> = (props) => {
  const isFirstMount = useFirstMountState();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [active, setActive] = React.useState<number>(0);
  const questions = React.useRef<HTMLButtonElement[]>([]);

  React.useEffect(() => {
    if (isFirstMount || !isMobile) {
      return;
    }

    setTimeout(() => {
      questions.current[active]?.scrollIntoView({ behavior: "auto" });
    }, 301);
  }, [active]);

  if (!props.items || !props.items.length) {
    return null;
  }

  return (
    <Section className={s.wrapper} grid={true} data-variant={props.variant}>
      <div className={s.container}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}

        <MotionConfig transition={{ duration: 0.3 }}>
          {props.items.map((item, i) => (
            <div key={`faq-${item.id}`} data-theme={Themes.default}>
              <button
                id={`${item.id}-button`}
                ref={(el) => (questions.current[i] = el as HTMLButtonElement)}
                className={s.question}
                onClick={() => {
                  if (active === i) {
                    setActive(-1);
                  } else {
                    setActive(i);
                  }
                }}
                aria-expanded={active === i}
                aria-controls={`${item.id}-content`}
                onKeyDown={(e) => {
                  const max = props.items.length - 1;
                  const nextIndex = i === max ? 0 : clamp(i + 1, max);
                  const prevIndex = i === 0 ? max : clamp(i - 1, max);

                  switch (e.key) {
                    case "ArrowDown":
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[nextIndex]?.focus();
                      break;

                    case "ArrowUp":
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[prevIndex]?.focus();
                      break;

                    case "End":
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[max]?.focus();
                      break;

                    case "Home":
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[0]?.focus();
                      break;
                  }
                }}
              >
                {item.question} <Icon icon={IconType.chevron} />
              </button>
              <motion.div
                id={`${item.id}-content`}
                role="region"
                aria-labelledby={`${item.id}-button`}
                style={{ overflow: "hidden" }}
                variants={{ open: { height: "auto" }, closed: { height: 0 } }}
                initial={active === i ? "open" : "closed"}
                animate={active === i ? "open" : "closed"}
                tabIndex={active === i ? undefined : -1}
              >
                <div className={s.answer}>
                  <div
                    className={g.richText}
                    dangerouslySetInnerHTML={{
                      __html: item.answer
                        .replaceAll(
                          "<a",
                          `<a tabindex="${active === i ? undefined : -1}"`
                        )
                        .replaceAll(
                          "<button",
                          `<button tabindex="${active === i ? undefined : -1}"`
                        ),
                    }}
                  />

                  {item.ctas && item.ctas.length > 0 ? (
                    <CtaBlock
                      id={item.id}
                      items={item.ctas}
                      tabIndex={active === i ? undefined : -1}
                    />
                  ) : null}
                </div>
              </motion.div>
            </div>
          ))}
        </MotionConfig>
      </div>
    </Section>
  );
};

export default Faqs;
