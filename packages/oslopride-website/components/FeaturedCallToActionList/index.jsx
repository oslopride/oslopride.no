import { imageUrlFor } from "@/store/sanity";
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
  padding: 10px 15px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const CallToActionImage = styled.img`
  height: 45px;
  width: auto;
  margin-right: 20px;
`;

const CallToActionText = styled.span`
  font-size: 1.2em;
  flex-grow: 1;
  text-decoration: none;
`;

const FeaturedCallToActionList = ({ className, featuredCallToActions }) => (
  <Wrapper className={className}>
    {featuredCallToActions.map(({ _key: key, link, title, icon }) => (
      <li key={key}>
        <CallToActionButton as="a" href={link}>
          <CallToActionImage
            src={imageUrlFor(icon)
              .width(50)
              .url()}
            alt={title}
          />
          <CallToActionText>{title}</CallToActionText>
        </CallToActionButton>
      </li>
    ))}
  </Wrapper>
);

export default FeaturedCallToActionList;
