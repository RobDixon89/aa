import React from "react";
import g from "../../../lib/global.module.scss";
import { type CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./RichText.module.scss";

export type RichTextProps = {
  id: string;
  alignment?: "left" | "center";
  ctas: CtaIconModel[];
  columns?: boolean;
  content: string;
  title?: string;
  uspList?: UspModel[];
};

const RichText: React.FC<RichTextProps> = (props) => {
  if (!props.content) {
    return null;
  }

  return (
    <Section grid={true}>
      <div
        className={s.container}
        data-align={props.alignment}
        data-columns={props.columns}
      >
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        <div
          className={`${g.richText} ${s.richText}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id={props.id} items={props.ctas} />
        ) : null}

        {props.uspList && props.uspList.length > 0 ? (
          <UspList id={props.id} items={props.uspList} theme="light" />
        ) : null}
      </div>
    </Section>
  );
};

export default RichText;
