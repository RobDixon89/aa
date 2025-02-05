import React from 'react';
import s from './Section.module.scss';

export const Themes = {
  default: 'default',
  navy: 'navy',
  blue: 'blue',
  lightBlue: 'light-blue',
  yellow: 'yellow',
} as const;

// Convert object key in a type
export type ThemeKeys = (typeof Themes)[keyof typeof Themes];

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: ThemeKeys;
  innerClass?: string;
  grid?: boolean;
};

const Section: React.FC<SectionProps> = (props) => {
  const { theme, grid, ...attr } = props;
  const { className: classes, innerClass, children, ...attributes } = attr;

  return (
    <section
      {...attributes}
      className={`${s.sectionContainer}${classes ? ' ' + classes : ''}`}
      data-theme={theme}
      data-grid={grid}
    >
      <div className={`${s.inner}${innerClass ? ' ' + innerClass : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
