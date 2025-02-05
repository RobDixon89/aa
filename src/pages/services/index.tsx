import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import {
  serviceLandingPageQuery,
  ServiceLandingPageQueryResponse,
  ServiceLandingTemplateResponse,
} from '@/sanity/queries/services';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import { mapLinkAttributes } from '@/utils/mapping';
import { GetStaticProps } from 'next';
import { PortableText } from 'next-sanity';
import { ReactElement } from 'react';

type Props = {
  settings: SiteSettingsResponse;
  template: ServiceLandingTemplateResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = (await client.fetch(
    serviceLandingPageQuery
  )) as ServiceLandingPageQueryResponse;

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
      {props.template.banner ? (
        <InnerPageBanner
          breadcrumbs={[
            {
              text: 'Home',
              url: '/',
            },
            {
              text: props.template.title,
              url: `/services`,
            },
          ]}
          subtitle={
            props.template.banner.subtitle
              ? props.template.banner.subtitle
              : undefined
          }
          title={props.template.banner.title}
          ctas={
            props.template.banner.ctas !== null
              ? props.template.banner.ctas.map((cta) => mapLinkAttributes(cta))
              : []
          }
          uspList={props.template.banner.usps ? props.settings.usps : []}
          theme={props.template.banner.theme}
        >
          {props.template.banner.blockContent !== null ? (
            <PortableText
              value={props.template.banner.blockContent}
              components={portableTextComponents('', [], [], [], '')}
            />
          ) : null}
        </InnerPageBanner>
      ) : null}

      {props.template.blockContent !== null ? (
        <PortableText
          value={props.template.blockContent}
          components={portableTextComponents(
            '',
            props.locations,
            props.services,
            props.settings.usps,
            firstFormId(props.template.blockContent),
            props.settings.form
          )}
        />
      ) : null}
    </Page>
  );
}
