import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { becomePartnerActions, getBecomePartner } from "@/store/become-partner";
import { webResponseInitial } from "@/store/helpers";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";

const BecomePartner = props => {
  const { becomePartner } = props;

  if (becomePartner.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Sheet>
      <h1>Bli Partner</h1>
      <article>
        <SanityBlockContent blocks={becomePartner.data.body} />
      </article>

      <NextSeo
        config={{
          title: "Bli Partner",
          description:
            "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold og gir deg en unik mulighet til å støtte kampen for like rettigheter og solidaritet.",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/become-partner",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Bli Parner",
            description:
              "Oslo Pride er Norges største og viktigste feiring av skeiv kjærlighet og mangfold og gir deg en unik mulighet til å støtte kampen for like rettigheter og solidaritet.",
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

BecomePartner.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().becomePartner.status === webResponseInitial().status) {
    store.dispatch(becomePartnerActions.request());
    if (isServer) {
      try {
        const response = await getBecomePartner();
        store.dispatch(becomePartnerActions.success(response));
      } catch (e) {
        store.dispatch(becomePartnerActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  becomePartner: state.becomePartner
});

const mapDispatchToProps = dispatch => ({
  fetchBecomePartnerContent: () => dispatch(becomePartnerActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomePartner);
