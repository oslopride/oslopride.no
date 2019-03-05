import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import Error from "@/pages/_error";
import { articleActions, getArticle } from "@/store/articles";
import { webResponseFailure, webResponseRequest } from "@/store/helpers";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const Article = ({ article }) => {
  switch (article.status) {
    case webResponseRequest().status:
      return <Wrapper>Laster...</Wrapper>;
    case webResponseFailure().status:
      return <Error statusCode={404} />;
  }

  const { title, body } = article.data;

  return (
    <Wrapper>
      <h1>{title}</h1>
      <SanityBlockContent blocks={body} />
    </Wrapper>
  );
};

Article.getInitialProps = async ({ query, store, isServer }) => {
  const { slug } = query;
  const { articles } = store.getState();
  if (
    articles[slug] === undefined ||
    articles[slug].status === webResponseFailure().status
  ) {
    store.dispatch(articleActions.request(slug));
    if (isServer) {
      try {
        const response = await getArticle(slug);
        if (response.length > 0) {
          store.dispatch(articleActions.success(response[0]));
        } else {
          store.dispatch(
            articleActions.failure({ slug, message: "Article not found" })
          );
        }
      } catch (e) {
        store.dispatch(articleActions.failure({ slug, message: `${e}` }));
      }
    }
  }
  return { slug };
};

const mapStateToProps = (state, { slug }) => ({
  article: state.articles[slug]
});

export default connect(mapStateToProps)(Article);
