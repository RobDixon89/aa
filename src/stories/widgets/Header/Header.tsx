import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import Link from 'next/link';
import React from 'react';
import Icon, { IconType } from '../../../utils/icon';
import { useMediaQuery } from '../../../utils/useMediaQuery';
import Button, { LinkButton } from '../../Global/Button/Button';
import { Themes } from '../../Global/Section/Section';
import ss from '../../Global/Section/Section.module.scss';
import s from './Header.module.scss';

type NavigationDropdownSimple = {
  type: 'simple';
  items: CtaModel[];
};

export type NavigationDropdownGroup = {
  title: string;
  items: CtaModel[];
};

type NavigationDropdownComplex = {
  type: 'complex';
  items: NavigationDropdownGroup[];
};

export type NavigationLink = CtaModel & {
  id: string;
  dropdown: NavigationDropdownSimple | NavigationDropdownComplex;
};

export type HeaderProps = {
  links: NavigationLink[];
  contactLink?: CtaModel;
};

const Header: React.FC<HeaderProps> = (props) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [active, setActive] = React.useState<string>('');

  return (
    <>
      <header className={s.container} data-theme={Themes.blue}>
        <div className={`${ss.inner} ${s.inner}`}>
          <Link href="/" className={s.logo} aria-label="Go to homepage">
            <img src="/logo.svg" alt="Ashley Aerials Ltd Logo" />
          </Link>

          <nav className={s.navigation}>
            <ul
              onMouseLeave={() => handleUnhover()}
              onBlur={(e) => {
                if (e.target.classList.contains('navigationLink'))
                  handleUnhover();
              }}
              role="menu"
              aria-label="Menu"
              data-open={active !== ''}
            >
              {props.links?.map((link) => (
                <li key={`navlink-${link.id}`} data-type={link.dropdown?.type}>
                  <Link
                    key={link.id}
                    href={link.url}
                    onMouseEnter={() => handleLinkHover(link.id)}
                    onFocus={() => handleLinkHover(link.id)}
                    onClick={
                      link.dropdown.items.length > 0
                        ? (e) => handleLinkClick(e, link.id)
                        : undefined
                    }
                    className={s.navigationLink}
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={active === link.id}
                    aria-controls={`${link.id}-dropdown`}
                  >
                    <span>
                      {link.text}

                      <AnimatePresence>
                        {active === link.id ? (
                          <motion.span
                            layoutId="nav-active"
                            className={s.activeIndicator}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        ) : null}
                      </AnimatePresence>
                    </span>

                    <Icon icon={IconType.chevron} />
                  </Link>

                  {link.dropdown.type === 'simple' ? (
                    <Dropdown
                      id={`${link.id}-dropdown`}
                      active={active === link.id}
                      backId={'menu'}
                      backLabel={link.text}
                      items={link.dropdown.items}
                      name={link.id}
                      setActive={setActive}
                      mobileLink={link}
                    />
                  ) : link.dropdown.type === 'complex' ? (
                    <ul
                      id={`${link.id}-dropdown`}
                      className={s.dropdownComplex}
                      data-open={active.includes(link.id)}
                      role="menu"
                    >
                      <li className={s.backButton}>
                        <Button
                          theme="text"
                          label={link.text}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setActive('menu');
                          }}
                        />
                      </li>
                      <li className={s.mobileLink}>
                        <LinkButton
                          theme="text"
                          label={link.text}
                          href={link.url}
                        />
                      </li>

                      {link.dropdown.items.map((dropdownItem) => {
                        const id = `${link.id}-${dropdownItem.title.toLowerCase().replaceAll(' ', '-')}`;

                        return (
                          <React.Fragment key={id}>
                            <li
                              className={s.locationButton}
                              style={
                                {
                                  '--rows': dropdownItem.items.length,
                                } as React.CSSProperties
                              }
                            >
                              <Button
                                theme="text"
                                label={dropdownItem.title}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  setActive(id);
                                }}
                                icon={IconType.chevron}
                              />

                              <Dropdown
                                active={
                                  id === active ||
                                  (!isMobile && active === link.id)
                                }
                                backId={link.id}
                                backLabel={dropdownItem.title}
                                items={dropdownItem.items}
                                name={id}
                                setActive={setActive}
                              />
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              ))}

              {props.contactLink ? (
                <li>
                  <LinkButton
                    theme="default"
                    label={props.contactLink.text}
                    href={props.contactLink.url}
                    onMouseEnter={() => handleUnhover()}
                    onFocus={() => handleUnhover()}
                    onClick={() => setActive('')}
                  />
                </li>
              ) : null}
            </ul>
          </nav>

          <MotionConfig transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <motion.button
              className={s.menuButton}
              onClick={() => {
                if (active) {
                  setActive('');
                } else {
                  setActive('menu');
                }
              }}
              aria-haspopup="menu"
              aria-expanded={active !== ''}
              aria-label={active !== '' ? 'Close menu' : 'Open menu'}
              initial={false}
              animate={active !== '' ? 'open' : 'closed'}
            >
              <motion.span
                style={{
                  top: '15%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                variants={{
                  open: {
                    rotate: ['0deg', '0deg', '45deg'],
                    top: ['15%', '50%', '50%'],
                  },
                  closed: {
                    rotate: ['45deg', '0deg', '0deg'],
                    top: ['50%', '50%', '15%'],
                  },
                }}
              />
              <motion.span
                style={{
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                variants={{
                  open: {
                    rotate: ['0deg', '0deg', '45deg'],
                  },
                  closed: {
                    rotate: ['45deg', '0deg', '0deg'],
                  },
                }}
              />
              <motion.span
                style={{
                  bottom: '15%',
                  left: '50%',
                  x: '-50%',
                  y: '50%',
                }}
                variants={{
                  open: {
                    rotate: ['0deg', '0deg', '-45deg'],
                    bottom: ['15%', '50%', '50%'],
                  },
                  closed: {
                    rotate: ['-45deg', '0deg', '0deg'],
                    bottom: ['50%', '50%', '15%'],
                  },
                }}
              />
            </motion.button>
          </MotionConfig>
        </div>
      </header>

      <AnimatePresence>
        {!!active && (
          <motion.div
            className={s.background}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}
      </AnimatePresence>
    </>
  );

  function handleLinkHover(id: string): void {
    if (!isMobile) {
      setActive(id);
    }
  }

  function handleUnhover(): void {
    if (!isMobile) {
      setActive('');
    }
  }

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (isMobile) {
      e.preventDefault();
      setActive(id);
    }
  }
};

type DropdownProps = {
  id?: string;
  active: boolean;
  backId: string;
  backLabel: string;
  items: CtaModel[];
  name: string;
  setActive: (id: string) => void;
  mobileLink?: CtaModel;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <ul
      id={props.id}
      role="menu"
      className={s.dropdown}
      data-open={props.active}
    >
      <li className={s.backButton}>
        <Button
          theme="text"
          label={props.backLabel}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            props.setActive(props.backId);
          }}
          tabIndex={props.active ? undefined : -1}
        />
      </li>

      {props.mobileLink ? (
        <li className={s.mobileLink}>
          <LinkButton
            theme="text"
            label={props.mobileLink.text}
            href={props.mobileLink.url}
            tabIndex={props.active ? undefined : -1}
          />
        </li>
      ) : null}

      {props.items.map((item, i) => (
        <li key={`${props.name}-dropdown-${i}`}>
          <LinkButton
            theme="text"
            label={item.text}
            href={item.url}
            tabIndex={props.active ? undefined : -1}
          />
        </li>
      ))}
    </ul>
  );
};

export default Header;
