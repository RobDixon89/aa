import Page from '@/lib/Page';
import { Themes } from '@/stories/Global/Section/Section';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ReactElement } from 'react';

export default function ErrorPage(): ReactElement {
  return (
    <Page
      title={'404 | This Page Could Not Be Found'}
      description={''}
      image={null}
      settings={undefined}
      locations={[]}
      services={[]}
      slug=""
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
