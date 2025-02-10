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
import { ReactElement } from 'react';
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

  return (
    <>
      <Meta {...props} />

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
