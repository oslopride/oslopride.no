import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import styled from "styled-components";

const A = styled.a`
  cursor: pointer;
  box-shadow: inset 0 -5px 0 0 #ffc000;
  transition: box-shadow 0.2s;

  :hover,
  :focus {
    box-shadow: inset 0 -25px 0 0 #ffc000;
  }
`;

const NextLink = ({ className, href, children }) => (
  <Link href={href}>
    <A className={className}>{children}</A>
  </Link>
);

NextLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node
};

NextLink.defaultProps = {
  className: undefined,
  children: undefined
};

export default NextLink;
