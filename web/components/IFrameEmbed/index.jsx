import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; //  16:9-format
  height: 0;
  overflow: hidden;
`;

const Embed = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default ({ node }) => {
  if (!node || !node.url) {
    return null;
  }

  if (!node.url) {
    return null;
  }

  return (
    <Wrapper>
      <Embed
        title="Embed"
        src={node.url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </Wrapper>
  );
};