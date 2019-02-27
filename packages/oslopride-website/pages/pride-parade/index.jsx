import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideParade, prideParadeActions } from "@/store/pride-parade";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const PrideParade = props => {
  const { prideParade } = props;

  if (prideParade.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Wrapper>
      <h1>Pride Parade</h1>
      <article>
        <SanityBlockContent blocks={prideParade.data.body} />
      </article>
    </Wrapper>
  );
};

PrideParade.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideParade.status === webResponseInitial().status) {
    store.dispatch(prideParadeActions.request());
    if (isServer) {
      try {
        const response = await getPrideParade();
        store.dispatch(prideParadeActions.success(response));
      } catch (e) {
        store.dispatch(prideParadeActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  prideParade: state.prideParade
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(prideParadeActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrideParade);
