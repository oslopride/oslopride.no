import FeaturedCallToActionList from "@/components/FeaturedCallToActionList";
import FeaturedDatesTable from "@/components/FeaturedDatesTable";
import Hero from "@/components/Hero";
import { frontPageActions, getFrontPage } from "@/store/front-page";
import { webResponseInitial } from "@/store/helpers";
import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;

    @media (min-width: 1030px) {
      width: 1000px;
    }
  }
`;

const HeroWrapper = styled.div`
  padding: 0 15px;
  margin-bottom: 30px;
  width: 100%;
`;

const FrontPageHero = styled(Hero)`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 1030px) {
    width: 1000px;
  }
`;

const SubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 800px) {
    flex-direction: row;

    & > * + * {
      margin-left: 40px;
      flex-grow: 1;
    }
  }
`;

const FeaturedDatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CallToActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FrontPageFeaturedDatesTable = styled(FeaturedDatesTable)`
  flex-grow: 1;
`;

const FrontPageCallToActionList = styled(FeaturedCallToActionList)`
  flex-grow: 1;

  & > li + li {
    margin-top: 15px;
  }
`;

const FeaturedDatesTitle = styled.h2`
  color: ${theme.purple};
`;

const FeaturedCallToActionTitle = styled.h2`
  color: ${theme.orange};
`;

const FrontPage = props => {
  const { frontPage } = props;

  if (frontPage.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <>
      <HeroWrapper>
        <FrontPageHero
          imageURL={imageUrlFor(frontPage.data.callToActionImage).url()}
          title={frontPage.data.callToActionTitle}
          subtitle={frontPage.data.callToActionBody}
        />
      </HeroWrapper>
      <ContentWrapper>
        <SubContentWrapper>
          <FeaturedDatesWrapper>
            <FeaturedDatesTitle>HOVEDDATOER 2019</FeaturedDatesTitle>
            <FrontPageFeaturedDatesTable dates={frontPage.data.featuredDates} />
          </FeaturedDatesWrapper>
          <CallToActionWrapper>
            <FeaturedCallToActionTitle>ENGASJER DEG</FeaturedCallToActionTitle>
            <FrontPageCallToActionList
              featuredCallToActions={frontPage.data.featuredCallToActions}
            />
          </CallToActionWrapper>
        </SubContentWrapper>
      </ContentWrapper>
    </>
  );
};

FrontPage.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().frontPage.status === webResponseInitial().status) {
    store.dispatch(frontPageActions.request());
    if (isServer) {
      try {
        const response = await getFrontPage();
        store.dispatch(frontPageActions.success(response));
      } catch (e) {
        store.dispatch(frontPageActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  frontPage: state.frontPage
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(frontPageActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
