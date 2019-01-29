import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

import Header from "@/components/Header";

import "normalize.css";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
    background-color: #f1f4f9;
  }
`;

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
        <GlobalStyle />
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
