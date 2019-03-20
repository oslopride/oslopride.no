import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideArt, prideArtActions } from "@/store/pride-art";
import { imageUrlFor } from "@/store/sanity";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
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
    <Wrapper>
      <h1>Pride Art</h1>
      <article>
        <SanityBlockContent blocks={preamble} />
        <PrideArtImage
          src={imageUrlFor(image).url()}
          alt="pride art illustrasjon"
        />
        <SanityBlockContent blocks={body} />
      </article>

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
    </Wrapper>
  );
};

PrideArt.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideArt.status === webResponseInitial().status) {
    store.dispatch(prideArtActions.request());
    if (isServer) {
      try {
        const response = await getPrideArt();
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
