import React from "react";
import { Link } from "gatsby";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import logo from "../assets/logo.svg";
import Navigation from "./navigation";

const GlobalStyle = createGlobalStyle`
  ${normalize()}
	body {
    font-family: proxima-nova, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default function Layout({ children, locale }) {
	const baseUrl = locale === "no" ? "/" : `/${locale}/`;

	return (
		<>
			<GlobalStyle />
			<header>
				<Link to={baseUrl}>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</Link>
				<Navigation locale={locale} />
			</header>
			{children}
			<footer>OSLO PRIDE</footer>
		</>
	);
}
