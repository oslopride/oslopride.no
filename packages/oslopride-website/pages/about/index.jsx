import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { aboutActions, getAbout } from "@/store/about";
import { webResponseInitial } from "@/store/helpers";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";

const About = props => {
  const { about } = props;

  if (about.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Sheet>
      <h1>Om Oss</h1>
      <article>
        <SanityBlockContent blocks={about.data.body} />
      </article>

      <NextSeo
        config={{
          title: "Om Oss",
          description:
            "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold.",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/about",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Om Oslo Pride",
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
