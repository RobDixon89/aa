import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import {
  homepageQuery,
  HomepageQueryResponse,
  HomepageResponse,
} from '@/sanity/queries/homepage';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import HomeHero from '@/stories/widgets/HomeHero/HomeHero';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import { mapImageAttributes, mapLinkAttributes } from '@/utils/mapping';
import { GetStaticProps } from 'next';
import { PortableText } from 'next-sanity';
import { ReactElement } from 'react';

type Props = {
  settings: SiteSettingsResponse;
  template: HomepageResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = (await client.fetch(homepageQuery)) as HomepageQueryResponse;

  return {
    props: {
      ...res,
    },
  };
};

export default function IndexRoute(props: Props): ReactElement {
  return (
    <Page
      title={
        props.template.metaTitle
          ? props.template.metaTitle
          : props.template.title
      }
      description={props.template.metaDescription}
      image={props.template.metaImage}
      settings={props.settings}
      locations={props.locations}
      services={props.services}
    >
      <HomeHero
        image={mapImageAttributes(props.template.banner.image)}
        title={props.template.banner.title}
        ctas={
          props.template.banner.ctas !== null
            ? props.template.banner.ctas.map((cta) => mapLinkAttributes(cta))
            : []
        }
        uspList={props.template.banner.usps ? props.settings.usps : []}
      >
        <PortableText
          value={props.template.banner.blockContent}
          components={portableTextComponents('', [], [], [], '')}
        />
      </HomeHero>

      {props.template.blockContent !== null ? (
        <PortableText
          value={props.template.blockContent}
          components={portableTextComponents(
            '',
            props.locations,
            props.services,
            props.settings.usps,
            firstFormId(props.template.blockContent)
          )}
        />
      ) : null}
    </Page>
  );
}
