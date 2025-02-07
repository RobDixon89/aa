import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';
import type { CtaIconModel } from '../../../utils/icon';
import { LinkButton } from '../Button/Button';
import s from './CtaBlock.module.scss';

export type CtaBlockProps = HTMLMotionProps<'div'> & {
  id: string;
  items: CtaIconModel[];
  tabIndex?: number;
};

const CtaBlock: React.FC<CtaBlockProps> = ({
  id,
  items,
  tabIndex,
  ...rest
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.div className={s.ctaBlock} {...rest}>
      {items.map((cta, i) => (
        <LinkButton
          key={`${id}-cta-${i}`}
          theme={i === 0 ? 'default' : 'outline'}
          href={cta.url}
          label={cta.text}
          icon={cta.icon}
          target={cta.target}
          tabIndex={tabIndex}
        />
      ))}
    </motion.div>
  );
};

CtaBlock.displayName = 'CtaBlock';

export default CtaBlock;
