import Link from "@/components/Link";
import theme from "@/utils/theme";
import { lighten } from "polished";
import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  transition: max-height 0.3s ease-in-out;
  height: auto;
  overflow: hidden;
  max-height: ${({ visible }) => (visible ? "250px" : "0")};
`;

const NavigationGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavigationLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin: 5px 8px;
`;

const Navigation = ({ className, visible, callback }) => (
  <Container className={className} visible={visible}>
    <NavigationGroup>
      <NavigationLink
        href="/pride-parade"
        onClick={callback}
        color={lighten(0.3, theme.red)}
      >
        Pride Parade
      </NavigationLink>
      <NavigationLink
        href="/pride-park"
        onClick={callback}
        color={lighten(0.2, theme.green)}
      >
        Pride Park
      </NavigationLink>
      <NavigationLink
        href="/pride-house"
        onClick={callback}
        color={theme.lightBlue}
      >
        Pride House
      </NavigationLink>
      <NavigationLink
        href="/pride-art"
        onClick={callback}
        color={lighten(0.45, theme.purple)}
      >
        Pride Art
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/contact" onClick={callback}>
        Kontakt
      </NavigationLink>
      <NavigationLink href="/about" onClick={callback}>
        Om Oss
      </NavigationLink>
      <NavigationLink href="/partners" onClick={callback}>
        Partnere
      </NavigationLink>
      <NavigationLink href="/become-partner" onClick={callback}>
        Bli Partner
      </NavigationLink>
    </NavigationGroup>
  </Container>
);

export default Navigation;
