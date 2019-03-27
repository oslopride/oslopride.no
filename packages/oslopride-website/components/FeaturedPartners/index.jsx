import { partnersActions } from "@/store/partners";
import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const FeaturedPartners = props => {
  const { partners } = props;

  if (partners.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const PartnerList = ({ partnerType }) => {
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
    return <List>{partnerItems}</List>;
  };

  return (
    <Wrapper>
      <PageTitle>Partnere</PageTitle>
      <PageSubtitle>Eier og arrangør</PageSubtitle>
      <PartnerList partnerType="owner" />
      <PageSubtitle>Hovedpartnere</PageSubtitle>
      <PartnerList partnerType="mainpartner" />
      <PageSubtitle>Partnere</PageSubtitle>
      <PartnerList partnerType="partner" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  color: ${theme.purple};
  text-transform: uppercase;
  font-size: 40px;
`;

const PageSubtitle = styled.h2`
  color: ${theme.darkgray};
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
`;

const List = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PartnerItem = styled.li`
  list-style: none;

  width: 100%;
  border: 1px solid ${theme.gray};
  margin: 0 10px;

  @media (min-width: 800px) {
    width: 20%;
  }
`;

const PartnerImage = styled.a`
  img {
    height: auto;
    max-width: 100%;
    display: block;
    margin: auto;
  }
`;
