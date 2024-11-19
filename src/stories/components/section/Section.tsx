import React from "react";
import s from "./Section.module.scss";

export enum Themes {
  default = "default",
  navy = "navy",
  blue = "blue",
  lightBlue = "light-blue",
  yellow = "yellow",
}

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: Themes;
  innerClass?: string;
  grid?: boolean;
};

const Section: React.FC<SectionProps> = (props) => {
  const { theme, grid, ...attr } = props;
  const { className: classes, innerClass, children, ...attributes } = attr;

  return (
    <section
      {...attributes}
      className={`${s.container}${classes ? " " + classes : ""}`}
      data-theme={theme}
      data-grid={grid}
    >
      <div className={`${s.inner}${innerClass ? " " + innerClass : ""}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
