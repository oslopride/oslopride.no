import ArticlePreview from "@/components/ArticlePreview";
import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { articleActions } from "@/store/articles";
import { webResponseInitial } from "@/store/helpers";
import { getPrideArt, prideArtActions } from "@/store/pride-art";
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

const PrideArtImage = styled.img`
  max-width: 100%;
`;

const PrideArt = props => {
  const { prideArt } = props;

  if (prideArt.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const { body, preamble, image } = prideArt.data;

  return (
    <>
      <Sheet>
        <h1>Pride Art</h1>
        <article>
          <SanityBlockContent blocks={preamble} />
          <PrideArtImage
            src={imageUrlFor(image).url()}
            alt="pride art illustrasjon"
          />
          <SanityBlockContent blocks={body} />
        </article>
      </Sheet>

      <ArticlesWrapper>
        {prideArt.data.articles.map(article => (
          <Article slug={article.slug.current} key={article.slug.current} />
        ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title: "Pride Art",
          description: "Pride Art er Norges største skeive utstilling!",
          openGraph: {
            type: "website",
            url: "https://oslopride.no/pride-art",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Pride Art",
            description: "Pride Art er Norges største skeive utstilling!",
            images: [{ url: imageUrlFor(image).url() }]
          }
        }}
      />
    </>
  );
};

PrideArt.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideArt.status === webResponseInitial().status) {
    store.dispatch(prideArtActions.request());
    if (isServer) {
      try {
        const response = await getPrideArt();
        response.articles.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(prideArtActions.success(response));
      } catch (e) {
        store.dispatch(prideArtActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  prideArt: state.prideArt
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(prideArtActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrideArt);
