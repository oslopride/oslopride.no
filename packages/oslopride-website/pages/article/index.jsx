import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import Error from "@/pages/_error";
import { articleActions, getArticle } from "@/store/articles";
import { webResponseFailure, webResponseRequest } from "@/store/helpers";
import { imageUrlFor } from "@/store/sanity";
import NextSeo, { ArticleJsonLd } from "next-seo";
import React from "react";
import { connect } from "react-redux";

const Article = ({ article }) => {
  switch (article.status) {
    case webResponseRequest().status:
      return <Sheet>Laster...</Sheet>;
    case webResponseFailure().status:
      return <Error statusCode={404} />;
  }

  const {
    title,
    body,
    preamble,
    slug: { current: slug },
    _updatedAt,
    _createdAt,
    image
  } = article.data;

  const imagrUrl = imageUrlFor(image).url();

  return (
    <Sheet>
      <h1>{title}</h1>
      <SanityBlockContent blocks={body} />

      <NextSeo
        config={{
          title,
          description: preamble,
          openGraph: {
            type: "article",
            url: `https://www.oslopride.no/a/${slug}`,
            title,
            locale: "nb_NO",
            description: preamble,
            article: {
              publishedTime: _createdAt,
              modifiedTime: _updatedAt
            },
            images: [{ url: imagrUrl }]
          }
        }}
      />
      <ArticleJsonLd
        url={`https://www.oslopride.no/a/${slug}`}
        title={title}
        datePublished={_createdAt}
        dateModified={_updatedAt}
        authorName="Oslo Pride"
        publisherName="Oslo Pride"
        publisherLogo="https://www.oslopride.no/static/logo.jpg"
        description={preamble}
        images={[imageUrlFor(image).url()]}
      />
    </Sheet>
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
