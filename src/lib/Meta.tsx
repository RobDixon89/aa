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
        <meta
          name="google-site-verification"
          content="RO3iLyxuZanAfiGfZSJXoy6fafb_M_qvgEmuxZr6t48"
        />

        <link
          rel="icon"
          type="image/png"
          href="favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Ashley TV Aerials LTD"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />

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
