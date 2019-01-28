import React from "react";
import PropTypes from "prop-types";

import NextLink from "next/link";
import styled from "styled-components";

export const A = styled.a`
  cursor: pointer;
  box-shadow: inset 0 -5px 0 0 #ffc000;
  transition: box-shadow 0.2s;

  :hover,
  :focus {
    box-shadow: inset 0 -25px 0 0 #ffc000;
  }
`;

const Link = ({ className, href, children, onClick }) => (
  <NextLink href={href}>
    <A className={className} onClick={onClick}>
      {children}
    </A>
  </NextLink>
);

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func
};

Link.defaultProps = {
  className: undefined,
  children: undefined,
  onClick: undefined
};

export default Link;
