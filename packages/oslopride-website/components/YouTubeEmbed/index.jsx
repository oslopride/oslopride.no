import React from "react";
import styled from "styled-components";
import getYouTubeID from "get-youtube-id";

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

  const id = getYouTubeID(node.url);
  if (!id) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${id}`;
  return (
    <Wrapper>
      <Embed
        title="YouTube"
        width="560"
        height="315"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </Wrapper>
  );
};