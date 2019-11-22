import ArticlePreview from "@/components/ArticlePreview";
import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import Error from "@/pages/_error";
import { webResponseFailure, webResponseRequest } from "@/store/helpers";
import { getPage, pageActions } from "@/store/pages";
import { imageUrlFor } from "@/store/sanity";
import logError from "@/utils/sentry";
import NextSeo, { ArticleJsonLd } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  max-width: 1000px;
`;

const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  max-width: 1200px;
`;

const Article = styled(ArticlePreview)`
  margin: 10px;
  width: 100%;

  @media (min-width: 800px) {
    width: 350px;
  }
`;

const Page = ({ page }) => {
  switch (page.status) {
    case webResponseRequest().status:
      return <Wrapper>Laster...</Wrapper>;
    case webResponseFailure().status:
      return <Error statusCode={404} />;
  }

  const {
    title,
    body,
    articles,
    slug: { current: slug },
    _updatedAt,
    _createdAt,
    seo
  } = page.data;

  const { image, description } = seo || {};

  const imageUrl = image
    ? imageUrlFor(image)
        .maxWidth(1000)
        .url()
    : "https://www.oslopride.no/static/prideheart.jpg";
  const seoDescription =
    description ||
    "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold.";

  return (
    <>
      <Wrapper>
        <h1>{title}</h1>
        <SanityBlockContent blocks={body} />
      </Wrapper>

      <ArticlesWrapper>
        {articles &&
          articles.map(article => (
            <Article slug={article.slug.current} key={article.slug.current} />
          ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title,
          description,
          openGraph: {
            type: "page",
            url: `https://www.oslopride.no/p/${slug}`,
            title,
            locale: "nb_NO",
            description: seoDescription,
            page: {
              publishedTime: _createdAt,
              modifiedTime: _updatedAt
            },
            images: [{ url: imageUrl }]
          }
        }}
      />
      <ArticleJsonLd
        url={`https://www.oslopride.no/p/${slug}`}
        title={title}
        datePublished={_createdAt}
        dateModified={_updatedAt}
        authorName="Oslo Pride"
        publisherName="Oslo Pride"
        publisherLogo="https://www.oslopride.no/static/logo.jpg"
        description={seoDescription}
        images={[imageUrl]}
      />
    </>
  );
};

Page.getInitialProps = async ctx => {
  const { query, store, isServer } = ctx;
  const { slug } = query;
  const { pages } = store.getState();
  if (
    pages[slug] === undefined ||
    pages[slug].status === webResponseFailure().status
  ) {
    store.dispatch(pageActions.request(slug));
    if (isServer) {
      try {
        const response = await getPage(slug);
        if (response.length > 0) {
          store.dispatch(pageActions.success(response[0]));
        } else {
          store.dispatch(
            pageActions.failure({ slug, message: "Page not found" })
          );
        }
      } catch (e) {
        logError(e, ctx);
        store.dispatch(pageActions.failure({ slug, message: `${e}` }));
      }
    }
  }
  return { slug };
};

const mapStateToProps = (state, { slug }) => ({
  page: state.pages[slug]
});

export default connect(mapStateToProps)(Page);
