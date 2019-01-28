import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

import Header from "@/components/Header";

import "normalize.css";

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const path = ctx.pathname;

    return { pageProps, path };
  }

  render() {
    const { Component, pageProps, path } = this.props;

    return (
      <Container>
        <Head>
          <title>Oslo Pride</title>
        </Head>
        <Header currentPath={path} />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default NextApp;
