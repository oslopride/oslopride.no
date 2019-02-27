import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideArt, prideArtActions } from "@/store/pride-art";
import { imageUrlFor } from "@/store/sanity";
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

  return (
    <Wrapper>
      <h1>Pride Art</h1>
      <article>
        <SanityBlockContent blocks={prideArt.data.preamble} />
        <PrideArtImage
          src={imageUrlFor(prideArt.data.image).url()}
          alt="pride art illustrasjon"
        />
        <SanityBlockContent blocks={prideArt.data.body} />
      </article>
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
