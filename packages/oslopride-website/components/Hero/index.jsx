import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 15px;
  }

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;

    & > * {
      max-width: 50%;
      margin-top: 0;
    }
  }
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
  height: 150px;

  @media (min-width: 800px) {
    height: 300px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #401080;
  margin: 0;
  font-size: 50px;
  line-height: 1;
`;

const Subtitle = styled.p`
  text-align: justify;
  margin-bottom: 0;
`;

const Hero = ({ className, imageURL, title, subtitle }) => (
  <Wrapper className={className}>
    <ImageWrapper>
      <Image src={imageURL} alt="hero" />
    </ImageWrapper>
    <div>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </div>
  </Wrapper>
);

export default Hero;
