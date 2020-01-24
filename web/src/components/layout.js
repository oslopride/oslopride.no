import React from "react";
import Link from "./link";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import logo from "../assets/logo.svg";
import Navigation from "./navigation";
import { usePageContext } from "../hooks/page-context";

const GlobalStyle = createGlobalStyle`
	${normalize()}
	body {
    font-family: proxima-nova, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default function Layout({ children }) {
	const { baseUrl } = usePageContext();
	return (
		<>
			<GlobalStyle />
			<GlobalHeader>
				<Link to={baseUrl}>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</Link>
				<Navigation />
			</GlobalHeader>
			{children}
			<footer>OSLO PRIDE</footer>
		</>
	);
}

const GlobalHeader = styled.header`
	display: block;
	width: 1280px;
	max-width: 95vw;
	margin-left: auto;
	margin-right: auto;
	position: relative;
`;
