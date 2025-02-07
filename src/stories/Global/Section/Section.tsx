import { HTMLMotionProps, motion } from 'motion/react';
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

type SectionProps = HTMLMotionProps<'div'> & {
  theme?: ThemeKeys;
  innerClass?: string;
  grid?: boolean;
  children: React.ReactNode;
};

const Section = React.forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const { theme, grid, ...attr } = props;
  const { className: classes, innerClass, children, ...attributes } = attr;

  return (
    //@ts-ignore
    <motion.section
      ref={ref}
      {...attributes}
      className={`${s.sectionContainer}${classes ? ' ' + classes : ''}`}
      data-theme={theme}
      data-grid={grid}
    >
      <div className={`${s.inner}${innerClass ? ' ' + innerClass : ''}`}>
        {children}
      </div>
    </motion.section>
  );
});

Section.displayName = 'SectionWrapper';

export default Section;
