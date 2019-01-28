import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NextLink from "@/components/NextLink";

const Container = styled.nav`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
`;

const NavigationGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    margin-right: 10px;
  }
`;

const NavigationLink = styled(NextLink)`
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin: 5px 8px;
`;

const Navigation = ({ className, visible }) => (
  <Container className={className} visible={visible}>
    <NavigationGroup>
      <NavigationLink href="/program">Program 2019</NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/pride-parade">Pride Parade</NavigationLink>
      <NavigationLink href="/pride-park">Pride Park</NavigationLink>
      <NavigationLink href="/pride-house">Pride House</NavigationLink>
      <NavigationLink href="/pride-art">Pride Art</NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/pride-store">Pridebutikken</NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/contact">Kontakt</NavigationLink>
      <NavigationLink href="/about">Om Oss</NavigationLink>
      <NavigationLink href="/partners">Partnere</NavigationLink>
      <NavigationLink href="/become-partner">Bli Partner</NavigationLink>
    </NavigationGroup>
  </Container>
);

Navigation.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired
};

Navigation.defaultProps = {
  className: undefined
};

export default Navigation;
