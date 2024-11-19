import React from "react";
import type { CtaIconModel } from "../../../utils/icon";
import { LinkButton } from "../Button/Button";
import s from "./CtaBlock.module.scss";

export type CtaBlockProps = {
  id: string;
  items: CtaIconModel[];
};

const CtaBlock: React.FC<CtaBlockProps> = (props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  return (
    <div className={s.ctaBlock}>
      {props.items.map((cta, i) => (
        <LinkButton
          key={`${props.id}-cta-${i}`}
          theme={i === 0 ? "default" : "outline"}
          href={cta.url}
          label={cta.text}
          icon={cta.icon}
          target={cta.target}
        />
      ))}
    </div>
  );
};

export default CtaBlock;
