import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { contactActions, getContact } from "@/store/contact";
import { webResponseInitial } from "@/store/helpers";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const Contact = props => {
  const { contact } = props;

  if (contact.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  // eslint-disable-next-line react/no-danger
  return (
    <Wrapper>
      <h1>Kontakt oss</h1>
      <SanityBlockContent blocks={contact.data.body} />

      <NextSeo
        config={{
          title: "Kontakt",
          description: "Kontakt Oslo Pride",
          openGraph: {
            type: "website",
            url: "https://oslopride.no/contact",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Kontakt Oslo Pride",
            description: "Kontakt Oslo Pride",
            images: [
              { url: "https://oslopride.no/static/logo.jpg" },
              { url: "https://oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </Wrapper>
  );
};

Contact.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().contact.status === webResponseInitial().status) {
    store.dispatch(contactActions.request());
    if (isServer) {
      try {
        const response = await getContact();
        store.dispatch(contactActions.success(response));
      } catch (e) {
        store.dispatch(contactActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  contact: state.contact
});

const mapDispatchToProps = dispatch => ({
  fetchContactContent: () => dispatch(contactActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
