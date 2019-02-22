import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideArt, prideArtActions } from "@/store/pride-art";
import { imageUrlFor } from "@/store/sanity";
import BockContent from "@sanity/block-content-to-react";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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
    <Sheet>
      <h1>Pride Art</h1>
      <article>
        <BockContent blocks={prideArt.data.preamble} />
        <PrideArtImage
          src={imageUrlFor(prideArt.data.image).url()}
          alt="pride art illustrasjon"
        />
        <BockContent blocks={prideArt.data.body} />
      </article>
    </Sheet>
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
