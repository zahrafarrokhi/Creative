import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class LocalizedDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // locale is in ctx.locale

    return { ...initialProps, locale: ctx?.locale || 'es' };
  }

    render = () => (
      <Html dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'} lang={this.props.locale}>
        <Head>
          {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
}

export default LocalizedDocument;