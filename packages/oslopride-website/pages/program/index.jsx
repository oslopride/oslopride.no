import Sheet from "@/components/Sheet";
import NextSeo from "next-seo";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  @media (min-width: 1000px) {
    width: 1000px;
  }
`;

const Program = () => (
  <Sheet>
    <Wrapper>
      <h1>Program 2019</h1>
      <p>Programmet for 2019 kommer snart.</p>
    </Wrapper>

    <NextSeo
      config={{
        title: "Festivalprogram",
        description:
          "Festivalprogram til Norges største feiring av skeiv kjærlighet og mangfold.",
        openGraph: {
          type: "website",
          url: "https://oslopride.no/program",
          locale: "nb_NO",
          site_name: "Oslo Pride",
          title: "Oslo Pride Festivalprogram",
          description:
            "Festivalprogram til Norges største feiring av skeiv kjærlighet og mangfold.",
          images: [
            { url: "https://oslopride.no/static/logo.jpg" },
            { url: "https://oslopride.no/static/prideheart.jpg" }
          ]
        }
      }}
    />
  </Sheet>
);

export default Program;
