import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import { webResponseInitial } from "@/store/helpers";
import { getPartners, partnersActions } from "@/store/partners";
import { imageUrlFor } from "@/store/sanity";
import logError from "@/utils/sentry";
import theme from "@/utils/theme";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Partners = props => {
  const { partners } = props;

  const PartnerList = ({ partnerType, partnerSubtitle }) => {
    const partnerItems = partners.data
      .filter(partnerItem => partnerItem.type === partnerType)
      .map(({ _id, partnerUrl, image, name, description }) => (
        <PartnerItem key={_id}>
          <PartnerCard>
            <PartnerImage>
              <a href={partnerUrl}>
                <img
                  src={imageUrlFor(image)
                    .maxWidth(200)
                    .url()}
                  alt={name}
                />
              </a>
            </PartnerImage>
            <PartnerText>
              <h3>
                <a href={partnerUrl}>{name}</a>
              </h3>
              <SanityBlockContent blocks={description} />
            </PartnerText>
          </PartnerCard>
        </PartnerItem>
      ));
    if (partnerItems.length > 0) {
      return (
        <div>
          <PageSubtitle>{partnerSubtitle}</PageSubtitle>
          <List>{partnerItems}</List>
        </div>
      );
    }
    return null;
  };

  if (partners.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }
  return (
    <Wrapper>
      <PageTitle>Partnere</PageTitle>
      {!partners.data.length ? (
        <Sheet>
          <p>Oversikt over våre partnere for Oslo Pride 2020 kommer snart</p>
        </Sheet>
      ) : null}
      <PartnerList partnerSubtitle="Eier og arrangør" partnerType="owner" />
      <PartnerList partnerSubtitle="Hovedpartnere" partnerType="mainpartner" />
      <PartnerList partnerSubtitle="Partnere" partnerType="partner" />
      <PartnerList partnerSubtitle="Støttepartnere" partnerType="supportpartner" />

      <NextSeo
        config={{
          title: "Partnere",
          description: "Oslo Pride sine partnere",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/partners",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Oslo Pride sine Partnere",
            description: "Oslo Pride sine partnere",
            images: [
              { url: "https://www.oslopride.no/static/logo.jpg" },
              { url: "https://www.oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </Wrapper>
  );
};

Partners.getInitialProps = async ctx => {
  const { store, isServer } = ctx;
  if (store.getState().partners.status === webResponseInitial().status) {
    store.dispatch(partnersActions.request());
    if (isServer) {
      try {
        const response = await getPartners();
        store.dispatch(partnersActions.success(response));
      } catch (e) {
        logError(e, ctx);
        store.dispatch(partnersActions.failure());
      }
    }
  }
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
)(Partners);

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
  color: ${theme.gray};
  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
`;

const List = styled.ul`
  padding: 0;
`;

const PartnerItem = styled.li`
  list-style: none;
`;

const PartnerCard = styled(Sheet)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1088px;
  margin: 20px;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const PartnerImage = styled.div`
  width: 100%;
  max-width: 200px;
  text-align: center;

  img {
    height: auto;
    max-width: 100%;
  }

  @media (min-width: 800px) {
    width: 20%;
  }
`;

const PartnerText = styled.div`
  width: 100%;

  h3 {
    a {
      text-decoration: none;
      color: ${theme.purple};
    }
  }

  @media (min-width: 800px) {
    width: 70%;
  }
`;
