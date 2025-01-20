import React from "react";
import g from "../../../lib/global.module.scss";
import { insertLocationName } from "../../../utils";
import Section, { Themes } from "../../components/Section/Section";
import s from "./Steps.module.scss";

export type StepCardModel = {
  _type: "step";
  id: string;
  content: string;
  theme: Themes;
};

export type ImageCardModel = {
  _type: "stepImage";
  id: string;
  image: ImageModel;
  imageType: "contain" | "cover";
};

export type StepsProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string;
  items: (StepCardModel | ImageCardModel)[];
  theme: Exclude<Themes, Themes.lightBlue | Themes.yellow | Themes.navy>;
  hasIntroduction: boolean;
  location?: string;
};

const Steps: React.FC<StepsProps> = (props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  // Split children, which contains introduction as well as step card contents
  const children = props.children
    ? insertLocationName(props.children, props.location)
        .split("</div>")
        .filter((c) => c !== "")
    : [];

  // Create array of step card IDs to use as index for the content location
  const stepIds = props.items
    .filter((item) => item._type === "step")
    .map((item) => item.id);

  return (
    <Section grid={true}>
      <div className={s.container}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        {props.hasIntroduction ? (
          <div
            className={`${g.richText}`}
            dangerouslySetInnerHTML={{ __html: children[0] }}
          />
        ) : null}

        <ol>
          {props.items.map((item) => (
            <React.Fragment key={`${props.id}-${item.id}`}>
              {item._type === "step" ? (
                <li
                  data-theme={item.theme}
                  dangerouslySetInnerHTML={{
                    __html:
                      children[
                        stepIds.findIndex((s) => s === item.id) +
                          (props.hasIntroduction ? 1 : 0)
                      ],
                  }}
                />
              ) : (
                <li>
                  <img
                    // className={s.image}
                    src={item.image.src}
                    alt={item.image.altText}
                    loading="lazy"
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Steps;
