import theme from "@/utils/theme";
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
  flex-grow: 1;
`;

const TextWrapper = styled.div`
  @media (min-width: 800px) {
    margin-left: 40px;
  }
`;

const Image = styled.img`
  height: 150px;

  @media (min-width: 800px) {
    height: 200px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${theme.purple};
  margin: 0;
  font-size: 50px;
  line-height: 1;
  @media (min-width: 800px) {
    text-align: left;
  }
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
    <TextWrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </TextWrapper>
  </Wrapper>
);

export default Hero;
