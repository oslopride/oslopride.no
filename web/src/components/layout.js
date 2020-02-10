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
				<Image>
					<img width="100px" src={logo} alt="Oslo Pride logo" />
					<h3>19. - 28. Juni 2020</h3>
				</Image>

				<Info>
					<h3>Oslo Pride as</h3>
					<p>c/o Foreningen FRI,</p>
					<p>Mariboes gate 13, 0183 OSLO</p>
					<a href="https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=986625860">
						Org.nr: 986 625 860
					</a>
					<a href="tel:91544090">Tlf: 915 44 090</a>
				</Info>

				<Shortcuts>
					<h3>Snarveier</h3>
					{footer.links.map((link, i) => {
						return (
							<a href={link.url} key={i}>
								{link.text}
							</a>
						);
					})}
				</Shortcuts>
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
	font-size: 16px;

	h3 {
		color: #3a1b7b;
	}

	a {
		color: #e350a0;
	}

	a,
	p {
		margin: 5px 0;
	}
`;

const Image = styled.div`
	width: 40%;

	img {
		max-width: 50%;
		width: 150px;
	}

	h3 {
		text-transform: uppercase;
		margin-left: 20px;
		margin-top: 8px;
		font-weight: 500;
	}
`;

const Info = styled.div`
	display: flex;
	flex-flow: column nowrap;
	width: 30%;
`;

const Shortcuts = styled.div`
	display: flex;
	flex-flow: column nowrap;
	width: 30%;
`;
