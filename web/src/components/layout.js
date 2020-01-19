import React from "react";
import Link from "./link";
import { createGlobalStyle } from "styled-components";
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
			<header>
				<Link to={baseUrl}>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</Link>
				<Navigation />
			</header>
			{children}
			<footer>OSLO PRIDE</footer>
		</>
	);
}
