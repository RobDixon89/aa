import React from "react";
import g from "../../../lib/global.module.scss";
import { insertLocationName } from "../../../utils";
import Section from "../../components/Section/Section";
import s from "./EmbeddedForm.module.scss";

export type EmbeddedFormProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string | null;
  location?: string;
};

const EmbeddedForm: React.FC<EmbeddedFormProps> = (props) => {
  if (!props.children) {
    return null;
  }

  const children = React.useMemo(
    () => insertLocationName(props.children, props.location),
    []
  );

  return (
    <Section id={props.id} grid={true}>
      <div className={s.container}>
        {props.title !== null && <h2 className={s.title}>{props.title}</h2>}
        <div
          className={`${g.richText}`}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </div>
    </Section>
  );
};

export default EmbeddedForm;
