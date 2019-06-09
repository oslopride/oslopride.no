import Link from "@/components/Link";
import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

const FeaturedButton = ({ title, link, color }) => {
  return (
    <ButtonStyle href={link} color={color} arrow={false}>
      {title}
    </ButtonStyle>
  );
};

const FeaturedButtons = () => {
  return (
    <Wrapper>
      <FeaturedButton
        title="vær frivillig"
        link="/a/engasjer-deg-i-oslo-pride"
        color={theme.green}
      />
      <FeaturedButton
        title="bli partner"
        link="/become-partner"
        color={theme.green}
      />
      <FeaturedButton
        title="registrer arrangement"
        link="/a/registrering-av-arrangement"
        color={theme.green}
      />
    </Wrapper>
  );
};

export default FeaturedButtons;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`;

const ButtonStyle = styled(Link)`
  margin: 10px;
  width: 100%;
  transition: transform 0.2s ease-in-out;
  color: white;
  background-color: ${props => props.color};
  padding: 30px 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 2px;

  :hover,
  :focus {
    transform: scale(1.05);
  }

  @media (min-width: 1002px) {
    font-size: 20px;
    width: 30%;
  }
`;
