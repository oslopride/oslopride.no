import React from "react";
import LazyLoad from "react-lazyload";
import styled from "styled-components";

const Image = ({ tag, alt, src, ...rest }) => (
  <Wrapper>
    <LazyLoad
      height={120}
      scroll
      once
      offset={100}
      placeholder={<Img src="/static/event-placeholder.png" alt={alt} />}
    >
      <Img src={src} alt={alt} {...rest} />
    </LazyLoad>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  height: 0;
  padding-top: 56.25%; /* 16:9 */
  overflow: hidden;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
`;

export default Image;
