// @ts-nocheck

import styled from "styled-components";
import menuButton from "../../assets/menu-button.svg";
import closeButton from "../../assets/close-button.svg";

export const Navigation = styled.nav`
	position: fixed;
	top: 0;
	right: ${props => (props.visible ? "0" : "-100%")};
	width: 930px;
	max-width: 40vw;
	height: 100vh;
	background: ${props => props.theme.main.purple};
	display: flex;
	flex-direction: column;
	align-items: left;
	padding: 14rem 3rem;
	z-index: 100;
	transition: 1s;

	a {
		color: white;
		text-decoration: none;
	}

	button {
		position: absolute;
		top: 60px;
		right: 30px;
		background-color: transparent;
		background-image: url(${closeButton});
		background-size: 30px auto;
	}
`;

export const NavigationList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	font-size: 2em;
`;

export const NavigationItem = styled.li`
	font-size: 1.25em;
	line-height: 2em;
	font-weight: 600;
	letter-spacing: 2px;
	position: relative;
	padding-left: 4rem;
	/* TODO: Should not be on hover, just on active state probably? */
	a:hover {
		color: #e350a0;
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
	}
`;

export const NavigationToggleButton = styled.button`
	height: 30px;
	width: 35px;
	background-color: transparent;
	background-image: url(${menuButton});
	background-repeat: no-repeat;
	border: none;
	outline: none;
	text-indent: -9999px;
	white-space: nowrap;
	cursor: pointer;
`;
