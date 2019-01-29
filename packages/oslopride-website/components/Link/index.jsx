import React from "react";
import PropTypes from "prop-types";

import NextLink from "next/link";
import styled from "styled-components";

const gray = "rgba(190, 190, 190, 1)";

export const A = styled.a`
  cursor: pointer;
  box-shadow: inset 0 -0.3em 0 0 ${({ color }) => color || gray};
  transition: box-shadow 0.2s;

  :hover,
  :focus {
    box-shadow: inset 0 -1.1em 0 0 ${({ color }) => color || gray};
  }
`;

const Link = ({ className, href, children, onClick, color }) => (
  <NextLink href={href}>
    <A className={className} color={color} onClick={onClick}>
      {children}
    </A>
  </NextLink>
);

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string
};

Link.defaultProps = {
  className: undefined,
  children: undefined,
  onClick: undefined,
  color: undefined
};

export default Link;
