import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Head from 'next/head';

export default function NextApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <AnimateSharedLayout>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
}
