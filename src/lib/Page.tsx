import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { ImageWithAlt } from '@/sanity/schema/image';
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

type Props = {
  title: string;
  description: string | null;
  image: ImageWithAlt | null;
  settings: SiteSettingsResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
  children: React.ReactNode;
};

export default function Page(props: Props): ReactElement {
  const headerLinks: NavigationLink[] = props.settings.links.map((link, i) =>
    mapNavigationDropdown(link, i + 1, props.locations, props.services)
  );

  return (
    <>
      <Header
        links={headerLinks}
        contactLink={
          props.settings.headerButtonText
            ? {
                text: props.settings.headerButtonText,
                url: `#${CONTACTFORM_ID}`,
              }
            : undefined
        }
      />
      <main>{props.children}</main>
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
                url: `#${CONTACTFORM_ID}`,
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
    </>
  );
}
