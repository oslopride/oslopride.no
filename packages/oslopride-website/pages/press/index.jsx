import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPress, pressActions } from "@/store/press";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";

const Press = props => {
  const { press } = props;

  if (press.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Sheet>
      <h1>For Pressen</h1>
      <article>
        <SanityBlockContent blocks={press.data.body} />
      </article>

      <NextSeo
        config={{
          title: "Presse",
          description:
            "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold.",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/press",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Presse",
            description:
              "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold.",
            images: [
              { url: "https://www.oslopride.no/static/logo.jpg" },
              { url: "https://www.oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </Sheet>
  );
};

Press.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().press.status === webResponseInitial().status) {
    store.dispatch(pressActions.request());
    if (isServer) {
      try {
        const response = await getPress();
        store.dispatch(pressActions.success(response));
      } catch (e) {
        store.dispatch(pressActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  press: state.press
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(pressActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Press);
