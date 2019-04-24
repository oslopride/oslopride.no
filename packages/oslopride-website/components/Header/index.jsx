import Button from "@/components/Button";
import theme from "@/utils/theme";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { darken } from "polished";
import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./navigation";

const Container = styled.header`
  background-color: white;
  border-bottom: 3px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    max-width: 1200px;
  }
`;

const TopHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 120px;
`;

const PrideDate = styled.div`
  color: ${darken(0.2, theme.gray)};
  text-align: center;

  font-size: 12px;

  @media (min-width: 450px) {
    font-size: initial;
  }
`;

const RotatingChevron = styled(FontAwesomeIcon)`
  transform: ${props => (props.rotate ? "rotate(180deg)" : "0")};
  transition: transform 0.2s ease;
`;

const MenuButton = styled(Button)`
  margin: 0 10px;
`;

const MenuText = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Container isOpen={isOpen}>
      <TopHeader>
        <Link href="/">
          <a>
            <Logo
              src="/static/oslopride.svg"
              alt="Oslo Pride Logo"
              onClick={close}
            />
          </a>
        </Link>
        <PrideDate>14. juni – 23. juni 2019</PrideDate>
        <MenuButton onClick={() => setOpen(!isOpen)}>
          <MenuText>Meny</MenuText>
          <RotatingChevron
            rotate={isOpen ? "true" : undefined}
            icon={faChevronDown}
          />
        </MenuButton>
      </TopHeader>
      <Navigation visible={isOpen} callback={close} />
    </Container>
  );
};

export default Header;
