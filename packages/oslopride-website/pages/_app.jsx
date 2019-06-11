import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { configActions, getConfig } from "@/store/config";
import { webResponseStatus } from "@/store/helpers";
import createStore from "@/store/store";
import { initializeGoogleAnalytics, logPageView } from "@/utils/google-analytics";
import dayjs from "dayjs";
import "dayjs/locale/nb";
import utc from "dayjs/plugin/utc";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import NextSeo, { LogoJsonLd, SocialProfileJsonLd } from "next-seo";
import App, { Container } from "next/app";
import Router from "next/router";
import { normalize } from "polished";
import React from "react";
import { Provider } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

dayjs.locale("nb"); // Use norwegian (bokmål) globally
dayjs.extend(utc); // Add UTC support

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: proxima-nova, sans-serif;
    background-color: white;
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
  margin: 20px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const { store, isServer } = ctx;

    if (store.getState().config.status === webResponseStatus.INITIAL) {
      store.dispatch(configActions.request());
      if (isServer) {
        try {
          const response = await getConfig();
          store.dispatch(configActions.success(response));
        } catch (e) {
          store.dispatch(configActions.failure(`${e}`));
        }
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Setup google analytics
    initializeGoogleAnalytics();

    // Log initial page view
    logPageView(Router.pathname);

    // Log future page views on route change
    Router.events.on("routeChangeComplete", logPageView);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <GlobalStyle />
          <Header />
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer />
        </Provider>

        <NextSeo
          config={{
            titleTemplate: "Oslo Pride | %s",
            canonical: "https://www.oslopride.no",

            twitter: {
              handle: "@OsloPride",
              site: "@OsloPride",
              cardType: "summary_large_image"
            }
          }}
        />
        <SocialProfileJsonLd
          type="Organization"
          name="Oslo Pride"
          url="https://www.oslopride.no"
          sameAs={[
            "https://www.facebook.com/oslopride",
            "https://twitter.com/oslopride",
            "https://www.instagram.com/oslopride/"
          ]}
        />
        <LogoJsonLd
          logo="https://www.oslopride.no/static/logo.jpg"
          url="https://www.oslopride.no"
        />
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(NextApp));
