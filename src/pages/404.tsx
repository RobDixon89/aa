import Page from '@/lib/Page';
import { client } from '@/sanity/lib/client';
import {
  homepageQuery,
  HomepageQueryResponse,
  HomepageResponse,
} from '@/sanity/queries/homepage';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import { Themes } from '@/stories/Global/Section/Section';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = (await client.fetch(homepageQuery)) as HomepageQueryResponse;

  return {
    props: {
      ...res,
    },
  };
};

type Props = {
  settings: SiteSettingsResponse;
  template: HomepageResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};

export const pageTitle = '404 | This Page Could Not Be Found';

export default function ErrorPage(props: Props): ReactElement {
  return (
    <Page
      title={pageTitle}
      description={''}
      image={null}
      settings={props.settings}
      locations={props.locations}
      services={props.services}
      slug="/"
    >
      <InnerPageBanner
        breadcrumbs={[]}
        subtitle={'404'}
        title={'Page Not Found'}
        ctas={[
          {
            text: 'Go to Homepage',
            url: '/',
          },
          {
            text: 'View Our Services',
            url: '/services',
          },
        ]}
        theme={Themes.lightBlue}
        errorBanner={true}
      >
        <p>
          Sorry, we can't find that page. The link you followed might be broken
          or the page may have moved.
        </p>
      </InnerPageBanner>
    </Page>
  );
}
