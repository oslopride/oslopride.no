import Link from "@/components/Link";
import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  transition: height 0.2s ease-in-out;
  overflow: hidden;
  height: ${({ visible }) => (visible ? "500px" : "0")};

  @media (min-width: 450px) {
    height: ${({ visible }) => (visible ? "450px" : "0")};
  }

  @media (min-width: 520px) {
    height: ${({ visible }) => (visible ? "350px" : "0")};
  }
`;

const NavigationGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NavigationTitle = styled.p`
width: 100%;
text-align: center;
  font-size 18px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 5px 8px;
`;

const NavigationLink = styled(Link)`
  font-size: 18px;
  margin: 15px 8px;
`;

const Navigation = ({ className, visible, callback }) => (
  <Container className={className} visible={visible}>
    <NavigationGroup>
      <NavigationLink
        href="/events"
        onClick={callback}
        arrow={false}
        color={theme.orange}
      >
        Program 2019
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationTitle>Våre arenaer</NavigationTitle>
      <NavigationLink href="/pride-parade" onClick={callback} arrow={false}>
        Pride Parade
      </NavigationLink>
      <NavigationLink href="/pride-park" onClick={callback} arrow={false}>
        Pride Park
      </NavigationLink>
      <NavigationLink href="/pride-house" onClick={callback} arrow={false}>
        Pride House
      </NavigationLink>
      <NavigationLink href="/pride-art" onClick={callback} arrow={false}>
        Pride Art
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationTitle>Engasjer deg</NavigationTitle>
      <NavigationLink
        href="/a/engasjer-deg-i-oslo-pride"
        onClick={callback}
        arrow={false}
      >
        Vær Frivillig
      </NavigationLink>
      <NavigationLink href="/become-partner" onClick={callback} arrow={false}>
        Bli Partner
      </NavigationLink>
      <NavigationLink
        href="/a/registrering-av-arrangement"
        onClick={callback}
        arrow={false}
      >
        Registrer arrangement
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/about" onClick={callback} arrow={false}>
        Om Oss
      </NavigationLink>
      <NavigationLink href="/contact" onClick={callback} arrow={false}>
        Kontakt
      </NavigationLink>
      <NavigationLink href="/partners" onClick={callback} arrow={false}>
        Partnere
      </NavigationLink>
      <NavigationLink
        href="https://butikk.oslopride.no/"
        onClick={callback}
        arrow={false}
      >
        Pridebutikken
      </NavigationLink>
    </NavigationGroup>
  </Container>
);

export default Navigation;
