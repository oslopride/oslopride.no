import ArticlePreview from "@/components/ArticlePreview";
import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { articleActions } from "@/store/articles";
import { webResponseInitial } from "@/store/helpers";
import { getPridePark, prideParkActions } from "@/store/pride-park";
import { imageUrlFor } from "@/store/sanity";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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

const PridePark = props => {
  const { pridePark } = props;

  if (pridePark.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const { body, preamble, image } = pridePark.data;

  return (
    <>
      <Sheet>
        <h1>Pride Park</h1>
        <article>
          <SanityBlockContent blocks={preamble} />
          <SanityBlockContent blocks={body} />
        </article>
      </Sheet>

      <ArticlesWrapper>
        {pridePark.data.articles.map(article => (
          <Article slug={article.slug.current} key={article.slug.current} />
        ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title: "Pride Park",
          description: "Kom og feire mangfold, samhold og kjærlighet med oss!",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/pride-house",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Pride Park",
            description:
              "Kom og feire mangfold, samhold og kjærlighet med oss!",
            images: [{ url: imageUrlFor(image).url() }]
          }
        }}
      />
    </>
  );
};

PridePark.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().pridePark.status === webResponseInitial().status) {
    store.dispatch(prideParkActions.request());
    if (isServer) {
      try {
        const response = await getPridePark();
        response.articles.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(prideParkActions.success(response));
      } catch (e) {
        store.dispatch(prideParkActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  pridePark: state.pridePark
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(prideParkActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PridePark);
