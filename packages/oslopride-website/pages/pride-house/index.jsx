import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPrideHouse, prideHouseActions } from "@/store/pride-house";
import BockContent from "@sanity/block-content-to-react";
import React from "react";
import { connect } from "react-redux";

const PrideHouse = props => {
  const { prideHouse } = props;

  if (prideHouse.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Sheet>
      <h1>Pride House</h1>
      <article>
        <BockContent blocks={prideHouse.data.preamble} />
        <BockContent blocks={prideHouse.data.body} />
      </article>
    </Sheet>
  );
};

PrideHouse.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().prideHouse.status === webResponseInitial().status) {
    store.dispatch(prideHouseActions.request());
    if (isServer) {
      try {
        const response = await getPrideHouse();
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
