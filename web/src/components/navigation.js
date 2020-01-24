import React from "react";
import styled from "styled-components";
import Link from "./link";
import { usePageContext } from "../hooks/page-context";

export default function() {
	const [navigationVisible, showNavigation] = React.useState(false);
	const toggleNavigation = () => showNavigation(current => !current);
	const closeNavigation = () => showNavigation(false);
	const {
		configuration: { navigation_bar: navigationBar },
		baseUrl,
		locale
	} = usePageContext();

	const links = navigationBar.map(page => (
		<NavigationItem key={page.slug.current} onClick={closeNavigation}>
			<Link
				to={`${baseUrl}${page.slug.current}`}
				aria-label={page.title[locale]}
			>
				{page.title[locale]}
			</Link>
		</NavigationItem>
	));

	return (
		<>
			<NavigationToggleButton onClick={toggleNavigation}>
				{navigationVisible ? "close" : "menu"}
			</NavigationToggleButton>
			<Navigation visible={navigationVisible}>
				<NavigationList>{links}</NavigationList>
			</Navigation>
		</>
	);
}

const Navigation = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 930px;
	max-width: 100vw;
	height: 100vh;
	background: #352176;
	display: ${props => (props.visible ? "flex" : "none")};
	flex-direction: column;
	align-items: left;
	padding: 14rem 3rem;
	z-index: 99;

	a {
		color: white;
		text-decoration: none;
	}
`;

const NavigationList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	font-size: 2em;
`;

const NavigationItem = styled.li`
	font-size: 1.25em;
	line-height: 2em;
	font-weight: 600;
	letter-spacing: 2px;
	position: relative;
	padding-left: 4rem;

	/* TODO: Should not be on hover, just on active state probably? */
	&:hover {
		:before {
			content: "";
			display: block;
			width: 50px;
			height: 4px;
			background-color: #e350a0;
			position: absolute;
			left: -0.5em;
			top: 0.9em;
		}

		a {
			color: #e350a0;
		}
	}
`;

const NavigationToggleButton = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 100;
`;
