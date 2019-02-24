import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPridePark, prideParkActions } from "@/store/pride-park";
import BockContent from "@sanity/block-content-to-react";
import React from "react";
import { connect } from "react-redux";

const PridePark = props => {
  const { pridePark } = props;

  if (pridePark.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Sheet>
      <h1>Pride Park</h1>
      <article>
        <BockContent blocks={pridePark.data.preamble} />
        <BockContent blocks={pridePark.data.body} />
      </article>
    </Sheet>
  );
};

PridePark.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().pridePark.status === webResponseInitial().status) {
    store.dispatch(prideParkActions.request());
    if (isServer) {
      try {
        const response = await getPridePark();
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
