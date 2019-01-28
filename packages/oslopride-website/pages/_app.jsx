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

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Oslo Pride</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default NextApp;
