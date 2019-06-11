import ArticlePreview from "@/components/ArticlePreview";
import { articleActions } from "@/store/articles";
import { webResponseInitial } from "@/store/helpers";
import { getPressReleases, pressReleasesActions } from "@/store/press-releases";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  max-width: 1200px;
`;

const Article = styled(ArticlePreview)`
  margin: 10px;
  width: 100%;

  @media (min-width: 800px) {
    width: 350px;
  }
`;

const HorizontalLine = styled.hr`
  width: 200px;
  max-width: 100%;
  margin-bottom: 25px;
  border: 1px solid #ccc;
`;

const PressReleases = props => {
  const { pressReleases } = props;

  if (pressReleases.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const articles = pressReleases.data;

  return (
    <>
      <h1>Pressemeldinger</h1>

      <HorizontalLine />

      <ArticlesWrapper>
        {articles.map(article => (
          <Article slug={article.slug.current} key={article.slug.current} />
        ))}
      </ArticlesWrapper>

      <NextSeo
        config={{
          title: "Pressemeldinger",
          description: "Liste over pressemeldinger fra Oslo Pride",
          openGraph: {
            type: "website",
            url: "https://www.oslopride.no/press-releases",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Pressemeldinger",
            description: "Liste over pressemeldinger fra Oslo Pride"
          }
        }}
      />
    </>
  );
};

PressReleases.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().pressReleases.status === webResponseInitial().status) {
    store.dispatch(pressReleasesActions.request());
    if (isServer) {
      try {
        const response = await getPressReleases();
        response.forEach(article =>
          store.dispatch(articleActions.success(article))
        );
        store.dispatch(pressReleasesActions.success(response));
      } catch (e) {
        store.dispatch(pressReleasesActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  pressReleases: state.pressReleases
});

export default connect(mapStateToProps)(PressReleases);
