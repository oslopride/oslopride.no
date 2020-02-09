import React from "react";
import Link from "./link";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import logo from "../assets/logo.svg";
import Navigation from "./navigation";
import { usePageContext } from "../hooks/page-context";

export default function Layout({ children }) {
	const {
		baseUrl,
		configuration: { footer }
	} = usePageContext();

	console.log(footer);
	return (
		<>
			<GlobalStyle />
			<header>
				<Link to={baseUrl}>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</Link>
				<Navigation />
			</header>
			<Content>{children}</Content>
			<Footer>
				<div>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
				</div>
				<div>
					<h4>Oslo Pride as</h4>
				</div>
				<div>
					<h4>Snarveier</h4>
				</div>
			</Footer>
		</>
	);
}

const GlobalStyle = createGlobalStyle`
	${normalize()}

	body {
    	font-family: proxima-nova, sans-serif;
	}

	html, body, #___gatsby, #gatsby-focus-wrapper {
		height: 100%;
	}

	#gatsby-focus-wrapper {
		display: flex;
		flex-direction: column;
	}
	
	* {
		box-sizing: border-box;
	}
`;

const Content = styled.div`
	flex: 1 0 auto;
`;

const Footer = styled.footer`
	flex-shrink: 0;
	width: 1000px;
	margin: 0 auto;
	display: flex;
	height: 300px;
	flex-flow: row nowrap;
	justify-content: space-around;

	div:nth-child(1) {
		width: 40%;
	}
	div:nth-child(2),
	div:nth-child(3) {
		width: 30%;
	}
`;
