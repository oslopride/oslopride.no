import ArticlePreview from "@/components/ArticlePreview";
import FeaturedCallToActionList from "@/components/FeaturedCallToActionList";
import FeaturedDatesTable from "@/components/FeaturedDatesTable";
import FeaturedPartners from "@/components/FeaturedPartners";
import Hero from "@/components/Hero";
import { articleActions } from "@/store/articles";
import { frontPageActions, getFrontPage } from "@/store/front-page";
import { webResponseInitial } from "@/store/helpers";
import { getPartners, partnersActions } from "@/store/partners";
import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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
      <FeaturedArticlesWrapper>
        {frontPage.data.featuredArticles.map(article => (
          <FeaturedArticle
            slug={article.slug.current}
            key={article.slug.current}
          />
        ))}
      </FeaturedArticlesWrapper>

      <ContentWrapper>
        <FeaturedPartners />
      </ContentWrapper>

      <NextSeo
        config={{
          title: "Forside",
          description:
            "Norges største feiring av skeiv kjærlighet og mangfold. En festival der alle har lov til å være akkurat den de er.",
          openGraph: {
            type: "website",
            url: "https://oslopride.no/",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Oslo Pride",
            description:
              "Norges største feiring av skeiv kjærlighet og mangfold. En festival der alle har lov til å være akkurat den de er.",
            images: [
              { url: "https://oslopride.no/static/logo.jpg" },
              { url: "https://oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </>
  );
};

FrontPage.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().frontPage.status === webResponseInitial().status) {
    store.dispatch(frontPageActions.request());
    if (isServer) {
      try {
        const response = await getFrontPage();
        response.featuredArticles.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(frontPageActions.success(response));
      } catch (e) {
        store.dispatch(frontPageActions.failure(`${e}`));
      }
    }
  }
  if (store.getState().partners.status === webResponseInitial().status) {
    store.dispatch(partnersActions.request());
    if (isServer) {
      try {
        const response = await getPartners();
        store.dispatch(partnersActions.success(response));
      } catch (e) {
        store.dispatch(partnersActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  frontPage: state.frontPage,
  partners: state.partners
});

const mapDispatchToProps = dispatch => ({
  fetchAboutContent: () => dispatch(frontPageActions.request()),
  fetchPartnerContent: () => dispatch(partnersActions.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);

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

const FeaturedDatesTitle = styled.h1`
  color: ${theme.purple};
`;

const FeaturedCallToActionTitle = styled.h1`
  color: ${theme.orange};
`;

const FeaturedArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  max-width: 1200px;
`;

const FeaturedArticle = styled(ArticlePreview)`
  margin: 10px;
  width: 100%;

  @media (min-width: 800px) {
    width: 350px;
  }
`;
