import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { getContact, contactActions } from "@/store/contact";
import { webResponseInitial } from "@/store/helpers";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const Contact = props => {
  const { contact } = props;

  if (contact.status !== "SUCCESS"){
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  // eslint-disable-next-line react/no-danger
  return (
    <Sheet>
      <h1>Kontakt oss</h1>
      <SanityBlockContent blocks={contact.data.body} />
    </Sheet>
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
