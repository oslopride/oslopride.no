import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { becomePartnerActions, getBecomePartner } from "@/store/become-partner";
import { webResponseInitial } from "@/store/helpers";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Sheet)`
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const BecomePartner = props => {
  const { becomePartner } = props;

  if (becomePartner.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <Wrapper>
      <h1>Bli Partner</h1>
      <article>
        <SanityBlockContent blocks={becomePartner.data.body} />
      </article>
    </Wrapper>
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
