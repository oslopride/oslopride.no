import React from "react";
import Link from "./link";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import logo from "../assets/logo.svg";
import menu from "../assets/menu-button-purple.svg";
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
				{/* TODO: Translate date? */}
				<p className="date">18. - 29. Juni 2020</p>
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
	margin: 40px auto;
	position: relative;

	img {
		width: 170px;
		height: auto;
	}

	button {
		height: 30px;
		width: 35px;
		top: 35px;
		background-color: white;
		background-image: url(${menu});
		background-repeat: no-repeat;

		border: none;
		outline: none;

		text-indent: -9999px;
		white-space: nowrap;
		overflow: hidden;

		cursor: pointer;
	}

	.date {
		text-transform: uppercase;
		color: #ecafb4;
		font-weight: 600;
		position: absolute;
		top: 25px;
		right: 100px;
	}
`;
