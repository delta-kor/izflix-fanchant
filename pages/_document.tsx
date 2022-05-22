import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '..//lib/gtag';

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={'ko'}>
        <Head>
          <>
            <link rel="shortcut icon" href="/favicon.png" />
            <link rel="icon" href="/favicon.png" />

            <meta name="theme-color" content="#070d2d" />
            <meta property="og:type" content="website" />
            <meta
              name="description"
              content={'아이즈원 콘서트 응원법 연습하기'}
            />
            <meta
              property="og:description"
              content={'아이즈원 콘서트 응원법 연습하기'}
            />
            <meta property="og:image" content={'/og.png'} />
            <meta name="twitter:image" content={'/og.png'} />
            <meta name="twitter:card" content={'summary'} />

            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            if (window.location.host === 'fanchant.izflix.net') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            }
          `,
              }}
            />
          </>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
