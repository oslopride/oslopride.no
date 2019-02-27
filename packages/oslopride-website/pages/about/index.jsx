import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { aboutActions, getAbout } from "@/store/about";
import { webResponseInitial } from "@/store/helpers";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const About = props => {
  const { about } = props;

  if (about.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Wrapper>
      <h1>Om Oss</h1>
      <article>
        <SanityBlockContent blocks={about.data.body} />
      </article>
    </Wrapper>
  );
};

About.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().about.status === webResponseInitial().status) {
    store.dispatch(aboutActions.request());
    if (isServer) {
      try {
        const response = await getAbout();
        store.dispatch(aboutActions.success(response));
      } catch (e) {
        store.dispatch(aboutActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  about: state.about
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(aboutActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
