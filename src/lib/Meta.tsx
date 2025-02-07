/* eslint-disable @next/next/no-sync-scripts */ import { ImageWithAlt } from '@/sanity/schema/image';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { siteDomain } from '../../env';

export type Metadata = {
  title: string;
  description: string | null;
  image: ImageWithAlt | null;
  slug: string;
};

function Meta(props: Metadata): ReactElement {
  const canonical = `${siteDomain}${props.slug}`;

  return (
    <>
      <Head>
        {/* <link
    rel="icon"
    href={urlForImage(metadata.siteIcon)!.url()}
    type="image/png"
    sizes="32x32"
  /> 
  <meta
  name="google-site-verification"
  content="47dbfiXng2ARaZdnZcZQo0czN1yE4rMhRGW_YzICs5w"
/> */}

        <title>{props.title}</title>

        {props.description ? (
          <meta name="description" content={props.description} />
        ) : null}

        <link rel="canonical" href={removeTrailingSlash(canonical)} />

        <meta property="og:url" content={removeTrailingSlash(canonical)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />

        {props.description ? (
          <meta name="og:description" content={props.description} />
        ) : null}

        {props.image ? (
          <meta name="og:image" content={props.image.imageUrl} />
        ) : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />

        {props.description ? (
          <meta name="twitter:description" content={props.description} />
        ) : null}

        {canonical && (
          <meta
            property="twitter:url"
            content={removeTrailingSlash(canonical)}
          />
        )}

        {props.image ? (
          <meta name="twitter:image" content={props.image.imageUrl} />
        ) : null}
      </Head>
    </>
  );
}

export function removeTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

export default Meta;
