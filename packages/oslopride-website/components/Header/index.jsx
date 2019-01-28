import React, { useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/Button";
import Navigation from "./navigation";

const Container = styled.header`
  background-color: #fff;
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
  color: #666;
  text-align: center;

  font-size: 12px;

  @media (min-width: 450px) {
    font-size: initial;
  }
`;

const MenuButton = styled(Button)`
  margin: 0 10px;
`;

const MenuText = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const Header = ({ currentPath }) => {
  const [isOpen, setOpen] = useState(false);
  const [path, setPath] = useState(currentPath);

  if (currentPath !== path) {
    // Close menue on page change
    setOpen(false);
    setPath(currentPath);
  }

  return (
    <Container>
      <TopHeader>
        <Link href="/">
          <a>
            <Logo src="/static/oslopride.svg" alt="Oslo Pride Logo" />
          </a>
        </Link>
        <PrideDate>14. juni – 23. juni 2019</PrideDate>
        <MenuButton onClick={() => setOpen(!isOpen)}>
          <MenuText>Meny</MenuText>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </MenuButton>
      </TopHeader>
      <Navigation visible={isOpen} />
    </Container>
  );
};

Header.propTypes = {
  currentPath: PropTypes.string.isRequired
};

export default Header;
