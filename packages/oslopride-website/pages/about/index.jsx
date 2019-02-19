import Sheet from "@/components/Sheet";
import { aboutActions, getAbout } from "@/store/about";
import { webResponseInitial } from "@/store/helpers";
import blocksToHtml from "@sanity/block-content-to-html";
import React from "react";
import { connect } from "react-redux";

const About = props => {
  const { about } = props;

  if (about.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  // TODO: Investigate if it's posible to use a react version of this using
  // react hyperscript: https://github.com/mlmorg/react-hyperscript instead of
  // the regular hyperscript used here
  const content = blocksToHtml({ blocks: about.data.body });
  // eslint-disable-next-line react/no-danger
  return (
    <Sheet>
      <h1>Om Oss</h1>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </Sheet>
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
