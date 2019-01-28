import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Link from "@/components/Link";

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

const NavigationLink = styled(Link)`
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin: 5px 8px;
`;

const Navigation = ({ className, visible, callback }) => (
  <Container className={className} visible={visible}>
    <NavigationGroup>
      <NavigationLink href="/program" onClick={callback}>
        Program 2019
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/pride-parade" onClick={callback}>
        Pride Parade
      </NavigationLink>
      <NavigationLink href="/pride-park" onClick={callback}>
        Pride Park
      </NavigationLink>
      <NavigationLink href="/pride-house" onClick={callback}>
        Pride House
      </NavigationLink>
      <NavigationLink href="/pride-art" onClick={callback}>
        Pride Art
      </NavigationLink>
    </NavigationGroup>

    <NavigationGroup>
      <NavigationLink href="/pride-store" onClick={callback}>
        Pridebutikken
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

Navigation.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
};

Navigation.defaultProps = {
  className: undefined
};

export default Navigation;
