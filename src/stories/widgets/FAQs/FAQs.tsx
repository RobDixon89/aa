import { motion, MotionConfig } from 'motion/react';
import React from 'react';
import { useFirstMountState } from 'react-use';
import g from '../../../lib/global.module.scss';
import { clamp } from '../../../utils';
import Icon, { IconType } from '../../../utils/icon';
import { useMediaQuery } from '../../../utils/useMediaQuery';
import CtaBlock from '../../Global/CtaBlock/CtaBlock';
import Section, { Themes } from '../../Global/Section/Section';
import s from './FAQs.module.scss';

type FaqItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
  ctas: CtaModel[];
};

export type FaqsProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  items: FaqItem[];
  title?: string | null;
  variant: 'default' | 'dark';
};

const Faqs: React.FC<FaqsProps> = (props) => {
  const isFirstMount = useFirstMountState();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [active, setActive] = React.useState<number>(0);
  const questions = React.useRef<HTMLButtonElement[]>([]);

  React.useEffect(() => {
    if (isFirstMount || !isMobile) {
      return;
    }

    setTimeout(() => {
      questions.current[active]?.scrollIntoView({ behavior: 'auto' });
    }, 301);
  }, [active]);

  if (!props.items || !props.items.length) {
    return null;
  }

  return (
    <Section className={s.wrapper} grid={true} data-variant={props.variant}>
      <div className={s.container}>
        {props.title !== null && <h2 className={s.title}>{props.title}</h2>}

        <MotionConfig transition={{ duration: 0.3 }}>
          {props.items.map((item, i) => (
            <div key={`faq-${item.id}`} data-theme={Themes.default}>
              <button
                id={`${item.id}-button`}
                ref={(el) => {
                  if (!questions.current) {
                    return;
                  }

                  questions.current[i] = el as HTMLButtonElement;
                }}
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
                    case 'ArrowDown':
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[nextIndex]?.focus();
                      break;

                    case 'ArrowUp':
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[prevIndex]?.focus();
                      break;

                    case 'End':
                      e.preventDefault();
                      e.stopPropagation();
                      questions.current[max]?.focus();
                      break;

                    case 'Home':
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
                style={{ overflow: 'hidden' }}
                variants={{ open: { height: 'auto' }, closed: { height: 0 } }}
                initial={active === i ? 'open' : 'closed'}
                animate={active === i ? 'open' : 'closed'}
                tabIndex={active === i ? undefined : -1}
              >
                <div className={s.answer}>
                  <div className={g.richText}>{item.answer}</div>

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
