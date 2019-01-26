import React from "react";
import App, { Container } from "next/app";

import Header from "@/components/Header";

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default NextApp;
