import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CallToActionButton = styled(Button)`
  font-weight: bold;
  width: 100%;
  padding: 20px 15px;
`;

const FeaturedCallToActionList = ({ className, featuredCallToActions }) => (
  <Wrapper className={className}>
    {featuredCallToActions.map(({ _key: key, link, title }) => (
      <li key={key}>
        <a href={link}>
          <CallToActionButton>{title}</CallToActionButton>
        </a>
      </li>
    ))}
  </Wrapper>
);

export default FeaturedCallToActionList;
