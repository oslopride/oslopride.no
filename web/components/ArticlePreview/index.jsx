import { articleActions } from "@/store/articles";
import {
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "@/store/helpers";
import { imageUrlFor } from "@/store/sanity";
import NextLink from "next/link";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useFetchArticleIfNotPresent } from "./hooks";

const ArticlePreview = ({ slug, article, fetchArticle, className }) => {
  const articlePresent =
    article !== undefined && article.status === webResponseSuccess().status;

  useFetchArticleIfNotPresent(articlePresent, fetchArticle);

  if (
    article === undefined ||
    article.status === webResponseInitial().status ||
    article.status === webResponseRequest().status
  ) {
    return <div>Laster...</div>;
  }

  if (article.status === webResponseFailure().status) {
    return <div>Noe gikk galt :(</div>;
  }

  const {
    data: { image, title, preamble }
  } = article;

  return (
    <NextLink href={`/article?slug=${slug}`} as={`/a/${slug}`} passHref>
      <Wrapper className={className}>
        <Image
          src={imageUrlFor(image)
            .height(250)
            .url()}
          alt="artikkelbilde"
        />
        <Title id="title">{title}</Title>
        <div>{preamble}</div>
      </Wrapper>
    </NextLink>
  );
};

const mapStateToProps = (state, { slug }) => ({
  article: state.articles[slug]
});

const mapDispatchToProps = (dispatch, { slug }) => ({
  fetchArticle: () => dispatch(articleActions.request(slug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePreview);

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 15px;
  color: initial;
  text-decoration: initial;
  border-radius: 2px;
  transition: transform 0.2s ease-in-out;

  :hover,
  :focus {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 2px;
`;

const Title = styled.div`
  font-size: 25px;
  margin: 5px 0;
`;
