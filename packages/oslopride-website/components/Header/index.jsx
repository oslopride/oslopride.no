import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import Navigation from "./navigation";

const TopHeader = styled.header`
  width: 100%;
  padding: 5px 10px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  * {
    height: 100%;
  }
`;

const Logo = styled.img`
  display: none;
  width: auto;

  @media (min-width: 500px) {
    display: inline-block;
  }
`;

const LogoMobile = styled.img`
  width: 70px;

  @media (min-width: 500px) {
    display: none;
  }
`;

const PrideDate = styled.div`
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  height: initial;
`;

const ButtonWrapper = styled.div`
  width: 70px;
  text-align: right;
  margin-right: 5px;

  @media (min-width: 500px) {
    width: 103px;
    margin-right: 10px;
  }
`;

const MenuButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const MenuIcon = styled(FaBars)`
  color: black;
  width: 30px;
`;

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Wrapper>
      <TopHeader>
        <Link href="/">
          <a>
            <Logo
              src="/static/oslopride.svg"
              alt="Oslo Pride Logo"
              onClick={close}
            />
            <LogoMobile
              src="/static/oslopride.svg"
              alt="Oslo Pride Logo"
              onClick={close}
            />
          </a>
        </Link>

        <PrideDate>14. juni – 23. juni 2019</PrideDate>
        <ButtonWrapper>
          <MenuButton onClick={() => setOpen(!isOpen)} aria-label="Meny d">
            <MenuIcon />
          </MenuButton>
        </ButtonWrapper>
      </TopHeader>
      <Navigation visible={isOpen} callback={close} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 9001;
`;

export default Header;
