import { pageTitle } from '@/pages/404';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import Footer from '@/stories/widgets/Footer/Footer';
import Header, { NavigationLink } from '@/stories/widgets/Header/Header';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import {
  CONTACTFORM_ID,
  getInternalLinkLabel,
  getInternalLinkUrl,
  mapNavigationDropdown,
} from '@/utils/mapping';
import { GoogleAnalytics } from '@next/third-parties/google';
import React, { ReactElement } from 'react';
import Meta, { Metadata } from './Meta';

type Props = Metadata & {
  settings?: SiteSettingsResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
  children: React.ReactNode;
};

export default function Page(props: Props): ReactElement {
  const headerLinks: NavigationLink[] =
    props.settings?.links.map((link, i) =>
      mapNavigationDropdown(link, i + 1, props.locations, props.services)
    ) ?? [];

  const [trackingAllowed, setTrackingAllowed] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!props.settings?.gaID || props.settings.gaID === null) {
      return;
    }

    function checkPermissions() {
      setTrackingAllowed(window.TRACKING);
    }

    document.addEventListener('permission_check', checkPermissions);

    return () => {
      document.removeEventListener('permission_check', checkPermissions);
    };
  }, []);

  return (
    <>
      <Meta {...props} />

      {trackingAllowed ? (
        <GoogleAnalytics gaId={props.settings?.gaID ?? ''} />
      ) : null}

      <noscript>
        Free cookie consent management tool by{' '}
        <a href="https://www.termsfeed.com/" rel="nofollow">
          TermsFeed
        </a>
      </noscript>

      <button
        onClick={() => {
          window.cookieconsent.openPreferencesCenter();
        }}
      >
        Update cookies preferences
      </button>

      {props.settings ? (
        <Header
          links={headerLinks}
          contactLink={
            props.settings.headerButtonText
              ? {
                  text: props.settings.headerButtonText,
                  url: `${props.title === pageTitle ? '/' : ''}#${CONTACTFORM_ID}`,
                }
              : undefined
          }
        />
      ) : null}

      <main>{props.children}</main>

      {props.settings ? (
        <Footer
          copyrightText={
            props.settings.copyrightText ? props.settings.copyrightText : ''
          }
          copyrightLinks={
            props.settings.copyrightLinks
              ? props.settings.copyrightLinks.map((l) => ({
                  text: getInternalLinkLabel(l),
                  url: getInternalLinkUrl(l),
                }))
              : []
          }
          enquiryCta={
            props.settings.footerButtonText
              ? {
                  text: props.settings.footerButtonText,
                  url: `${props.title === pageTitle ? '/' : ''}#${CONTACTFORM_ID}`,
                }
              : undefined
          }
          links={
            props.settings.linkGroups
              ? props.settings.linkGroups.map((group) => ({
                  title: group.title,
                  items: group.links.map((l) => ({
                    text: getInternalLinkLabel(l),
                    url: getInternalLinkUrl(l),
                  })),
                }))
              : []
          }
          phoneNumbers={
            props.settings.phoneLinks
              ? props.settings.phoneLinks.map((l) => ({
                  text: l.text ? l.text : l.phoneNumber,
                  url: `tel:${l.phoneNumber}`,
                }))
              : []
          }
        />
      ) : null}
    </>
  );
}
