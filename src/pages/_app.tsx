import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import '../lib/page.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} className={poppins.className} />
    </>
  );
}
