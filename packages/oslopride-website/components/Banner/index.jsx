import React from "react";
import styled from "styled-components";

const Banner = ({ children, color, title, textColor }) => {
  return (
    <Wrapper background={color}>
      {title && (
        <TitleWrapper>
          <Title textColor={textColor}>{title}</Title>
        </TitleWrapper>
      )}
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: ${props => (props.background ? props.background : "white")};
  padding: 20px;
  margin: 30px 0;
`;
const TitleWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  color: ${props => (props.textColor ? props.textColor : "black")};
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;
