import theme from "@/utils/theme";
import NextLink from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import styled from "styled-components";

const Link = ({ className, href, children, onClick, arrow = true, color }) => (
  <NextLink href={href} passHref>
    <A className={className} onClick={onClick} arrow={arrow} color={color}>
      {children}
      {arrow && <Arrow />}
    </A>
  </NextLink>
);

const A = styled.a`
  position: relative;
  text-transform: uppercase;
  color: ${props => (props.color ? props.color : theme.blue)};
  text-decoration: none;
  font-weight: bold;
  padding-right: ${({ arrow }) => (arrow ? "1.5em" : 0)};
  cursor: pointer;

  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => (props.color ? props.color : theme.blue)};
    transform-origin: bottom right;
    transform: scaleX(1);
  }

  @media (min-width: 800px) {
    ::before {
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }
    :hover::before {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
`;

const Arrow = styled(FaLongArrowAltRight)`
  position: absolute;
  right: 0;
  bottom: 0.25em;
`;

export default Link;
