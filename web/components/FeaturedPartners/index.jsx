import { partnersActions } from "@/store/partners";
import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const FeaturedPartners = props => {
  const { partners } = props;

  const PartnerList = ({ partnerType, partnerSubtitle }) => {
    const partnerItems = partners.data
      .filter(partnerItem => partnerItem.type === partnerType)
      .map(({ _id, partnerUrl, image, name }) => (
        <PartnerItem key={_id}>
          <PartnerImage href={partnerUrl}>
            <img
              src={imageUrlFor(image)
                .maxWidth(200)
                .url()}
              alt={name}
            />
          </PartnerImage>
        </PartnerItem>
      ));
    if (partnerItems.length > 0) {
      return (
        <>
          <PartnerType>{partnerSubtitle}</PartnerType>
          <List>{partnerItems}</List>
        </>
      );
    }
    return null;
  };

  if (partners.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }
  if (!partners.data.length) {
    return null;
  }
  return (
    <Wrapper>
      <ListWrapper>
        <PartnerList partnerSubtitle="Eier og arrangør" partnerType="owner" />
        <PartnerList
          partnerSubtitle="Hovedpartnere"
          partnerType="mainpartner"
        />
        <PartnerList partnerSubtitle="Partnere" partnerType="partner" />
      </ListWrapper>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  partners: state.partners
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(partnersActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedPartners);

const Wrapper = styled.div`
  width: 100%;
`;

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
`;

const PartnerType = styled.p`
  color: black;
  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const PartnerItem = styled.div`
  list-style: none;
  width: 200px;
  height: auto;
  margin: 10px;
`;

const PartnerImage = styled.a`
  img {
    border: 1px solid ${theme.lightGray};
    background-color: white;
    object-fit: contain;
    width: 100%;
    height: 200px;
    display: block;

    :hover,
    :focus {
      border: 1px solid ${theme.blue};
    }
  }
`;
