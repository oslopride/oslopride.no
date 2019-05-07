import ArticlePreview from "@/components/ArticlePreview";
import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { articleActions } from "@/store/articles";
import { webResponseInitial } from "@/store/helpers";
import { getInterPride, interPrideActions } from "@/store/interpride";
import { imageUrlFor } from "@/store/sanity";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 30px;

  max-width: 1200px;
`;

const Article = styled(ArticlePreview)`
  margin: 10px;
  width: 100%;

  @media (min-width: 800px) {
    width: 350px;
  }
`;

const InterPride = props => {
  const { interPride } = props;

  if (interPride.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const { body, preamble, image } = interPride.data;

  return (
    <>
      <Sheet>
        <h1>InterPride AGM 2020</h1>
        <article>
          <SanityBlockContent blocks={body} />
        </article>
      </Sheet>
      <ArticlesWrapper>
        {interPride.data.articles.map(article => (
          <Article slug={article.slug.current} key={article.slug.current} />
        ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title: "InterPride AGM 2020",
          description: preamble,
          openGraph: {
            type: "website",
            url: "https://oslopride.no/interpride2020",
            locale: "en_US",
            site_name: "Oslo Pride",
            title: "InterPride AGM 2020",
            description: preamble,
            images: [{ url: imageUrlFor(image).url() }]
          }
        }}
      />
    </>
  );
};

InterPride.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().interPride.status === webResponseInitial().status) {
    store.dispatch(interPrideActions.request());
    if (isServer) {
      try {
        const response = await getInterPride();
        response.articles.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(interPrideActions.success(response));
      } catch (e) {
        store.dispatch(interPrideActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  interPride: state.interPride
});

export default connect(mapStateToProps)(InterPride);
