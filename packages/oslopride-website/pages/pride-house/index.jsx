import ArticlePreview from "@/components/ArticlePreview";
import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { articleActions } from "@/store/articles";
import { webResponseInitial } from "@/store/helpers";
import { getPrideHouse, prideHouseActions } from "@/store/pride-house";
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

const PrideHouse = props => {
  const { prideHouse } = props;

  if (prideHouse.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const { body, preamble, image } = prideHouse.data;

  return (
    <>
      <Sheet>
        <h1>Pride House</h1>
        <article>
          <SanityBlockContent blocks={preamble} />
          <SanityBlockContent blocks={body} />
        </article>
      </Sheet>

      <ArticlesWrapper>
        {prideHouse.data.articles.map(article => (
          <Article slug={article.slug.current} key={article.slug.current} />
        ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title: "Pride House",
          description:
            "Pride House synliggjør bredden i den skeive kulturen gjennom debatter, foredrag, workshops og ulike kulturuttrykk.",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/pride-house",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Pride House",
            description:
              "Pride House synliggjør bredden i den skeive kulturen gjennom debatter, foredrag, workshops og ulike kulturuttrykk.",
            images: [{ url: imageUrlFor(image).url() }]
          }
        }}
      />
    </>
  );
};

PrideHouse.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideHouse.status === webResponseInitial().status) {
    store.dispatch(prideHouseActions.request());
    if (isServer) {
      try {
        const response = await getPrideHouse();
        response.articles.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(prideHouseActions.success(response));
      } catch (e) {
        store.dispatch(prideHouseActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  prideHouse: state.prideHouse
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(prideHouseActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrideHouse);
