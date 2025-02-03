import { motion, MotionConfig } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Icon, { IconType } from '../../../utils/icon';
import { useMediaQuery } from '../../../utils/useMediaQuery';
import { LinkButton } from '../../Global/Button/Button';
import Section, { Themes } from '../../Global/Section/Section';
import s from './Footer.module.scss';

export type LinkList = {
  title: string;
  items: CtaModel[];
};

export type FooterProps = {
  copyrightLinks: CtaModel[];
  copyrightText: string;
  enquiryCta?: CtaModel;
  links: LinkList[];
  phoneNumbers: CtaModel[];
};

const Footer: React.FC<FooterProps> = (props) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [active, setActive] = React.useState<number>(-1);
  const [copyright, setCopyright] = React.useState<string>(props.copyrightText);

  React.useEffect(() => {
    if (props.copyrightText) {
      const year = new Date().getFullYear();

      setCopyright(props.copyrightText.replaceAll('##year##', year.toString()));
    }
  }, [props.copyrightText]);

  return (
    <Section className={s.container} grid={true} theme={Themes.navy}>
      <div className={s.contact}>
        <Link href="/" className={s.logo} aria-label="Go to homepage">
          <Image
            src="/logo.svg"
            alt="Ashley Aerials Ltd Logo"
            loading="lazy"
            width={333}
            height={20}
          />
        </Link>

        {props.phoneNumbers && props.phoneNumbers.length > 0 ? (
          <div className={s.phoneNumbers}>
            {props.phoneNumbers.map((pn, i) => (
              <LinkButton
                key={`footer-contact-${i}`}
                href={pn.url}
                icon={IconType.phone}
                label={pn.text}
                theme="text"
              />
            ))}
          </div>
        ) : null}

        {props.enquiryCta ? (
          <LinkButton
            href={props.enquiryCta.url}
            label={props.enquiryCta.text}
            theme="default"
          />
        ) : null}
      </div>

      {props.links && props.links.length > 0 ? (
        <div className={s.linkLists}>
          <MotionConfig transition={{ duration: 0.35 }}>
            {props.links.map((ll, i) => (
              <motion.ul
                id={`footer-ll-${i}-links`}
                key={`footer-ll-${i}`}
                className={s.linkList}
                variants={{ closed: { height: 35 }, open: { height: 'auto' } }}
                initial="closed"
                animate={active === i ? 'open' : 'closed'}
              >
                <li>
                  <button
                    onClick={() => {
                      if (active === i) {
                        setActive(-1);
                      } else {
                        setActive(i);
                      }
                    }}
                    className={s.listTitle}
                    aria-expanded={active === i || !isMobile}
                    aria-controls={`footer-ll-${i}-links`}
                  >
                    {ll.title}

                    <Icon icon={IconType.chevron} />
                  </button>
                </li>

                {ll.items.map((l, j) => (
                  <li key={`footer-ll-${i}-${j}`}>
                    <LinkButton
                      href={l.url}
                      label={l.text}
                      target={l.target}
                      theme="text"
                      icon={IconType.none}
                    />
                  </li>
                ))}
              </motion.ul>
            ))}
          </MotionConfig>
        </div>
      ) : null}

      <div className={s.copyright}>
        {props.copyrightLinks && props.copyrightLinks.length > 0 && (
          <ul className={s.copyrightLinks}>
            {props.copyrightLinks.map((cl, i) => (
              <React.Fragment key={`footer-copyright-links-${i}`}>
                <li>
                  <LinkButton
                    href={cl.url}
                    label={cl.text}
                    target={cl.target}
                    theme="text"
                    icon={IconType.none}
                  />
                </li>
                {i < props.copyrightLinks.length - 1 ? <li>&bull;</li> : null}
              </React.Fragment>
            ))}
          </ul>
        )}
        {copyright ? (
          <p dangerouslySetInnerHTML={{ __html: copyright }} />
        ) : null}
      </div>
    </Section>
  );
};

export default Footer;
