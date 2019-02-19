import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()]
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="no">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
