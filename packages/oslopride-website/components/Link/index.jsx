import theme from "@/utils/theme";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";

export const A = styled.a`
  cursor: pointer;
  box-shadow: inset 0 -0.3em 0 0 ${({ color }) => color || theme.gray};
  transition: box-shadow 0.2s;

  :hover,
  :focus {
    box-shadow: inset 0 -1.1em 0 0 ${({ color }) => color || theme.gray};
  }
`;

const Link = ({ className, href, children, onClick, color }) => (
  <NextLink href={href}>
    <A className={className} color={color} onClick={onClick}>
      {children}
    </A>
  </NextLink>
);

export default Link;
