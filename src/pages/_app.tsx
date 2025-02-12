import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import React from 'react';
import '../lib/page.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  // Load Cookie Consent script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js';
    script.async = true;
    script.type = 'text/javascript';

    script.onload = () => {
      window.cookieconsent.run({
        notice_banner_type: 'interstitial',
        consent_type: 'express',
        palette: 'dark',
        language: 'en',
        page_load_consent_levels: ['strictly-necessary'],
        notice_banner_reject_button_hide: false,
        preferences_center_close_button_hide: false,
        page_refresh_confirmation_buttons: false,
        website_name: 'Ashley TV Aerials LTD',
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Component {...pageProps} className={poppins.className} />
    </>
  );
}
