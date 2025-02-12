import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <noscript>
          Free cookie consent management tool by{' '}
          <a href="https://www.termsfeed.com/" rel="nofollow">
            TermsFeed
          </a>
        </noscript>

        <button id="open_preferences_center">Update cookies preferences</button>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
