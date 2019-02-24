import Header from "@/components/Header";
import createStore from "@/store/store";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Head from "next/head";
import { normalize } from "polished";
import React from "react";
import { Provider } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: "Open Sans", sans-serif;
    background-color: #f1f4f9;
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.main`
  line-height: 1.5;
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;

    @media (min-width: 1000px) {
      width: 1000px;
    }
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
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <GlobalStyle />
          <Head>
            <title>Oslo Pride</title>
          </Head>
          <Header />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));
