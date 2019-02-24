import { DATASET, PROJECT_ID } from "@/store/sanity";
import BlockContent from "@sanity/block-content-to-react";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & div > figure > img {
    max-width: 100%;
  }

  & div > figure {
    margin: 0;
  }
`;

const SanityBlockContent = ({ blocks }) => (
  <Wrapper>
    <BlockContent blocks={blocks} projectId={PROJECT_ID} dataset={DATASET} />
  </Wrapper>
);

export default SanityBlockContent;
