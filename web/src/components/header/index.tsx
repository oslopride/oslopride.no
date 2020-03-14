import React from "react";
import { css } from "@emotion/core";
import Link from "../link";
import Logo from "../../assets/logo-color.svg";
import LogoWhite from "../../assets/logo-white.svg";
import Menu from "../../assets/menu.svg";
import MenuWhite from "../../assets/menu-white.svg";
import Close from "../../assets/close.svg";

import useConfig from "../../utils/use-config";

type Props = {};

const headerStyle = (
	logoWhite: string,
	logoColor: string,
	menuWhite: string,
	menuColor: string
) => css`
	display: block;
	height: 6rem;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;

	h1 {
		position: absolute;
		top: 0.5rem;
		left: 2rem;
		margin: 0;
		background-image: url(${logoWhite});
		background-size: 160px auto;
		background-repeat: no-repeat;

		width: 160px;
		height: 80px;

		span {
			visibility: hidden;
		}
	}

	p {
		position: absolute;
		top: 1rem;
		right: 6rem;
		text-transform: uppercase;
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		color: #f7acb3;
	}

	button {
		background-image: url(${menuWhite});
	}

	&.fixed {
		background-color: white;

		h1 {
			background-image: url(${logoColor});
		}

		button {
			background-image: url(${menuColor});
		}
	}
`;

const navigationStyle = css`
	padding-top: 100px;
	position: fixed;
	top: 0;
	right: 0;
	width: 930px;
	max-width: 100vw;
	height: 100vh;
	background: #352176;
	display: flex;
	flex-direction: column;
	align-items: left;
	padding: 14rem 3rem;
	z-index: 100;
	transition: right 0.65s;

	li {
		list-style: none;
		font-size: 2.5rem;
		line-height: 2em;
		font-weight: 600;
		letter-spacing: 0.5px;
		position: relative;

		a {
			color: white;
			text-decoration: none;
			width: 100%;
			padding-left: 4rem;
			display: block;
		}

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
	}
`;

const navigationStyleCollapsed = css`
	right: -100vw;
	transition: right 1s;
`;

const buttonStyle = css`
	position: absolute;
	top: 2rem;
	right: 3rem;
	z-index: 99;
	height: 30px;
	width: 35px;
	border: none;
	outline: none;
	white-space: nowrap;
	overflow: hidden;
	cursor: pointer;
	background-color: transparent;

	background-repeat: no-repeat;
	background-size: auto 30px;
	text-indent: -9999px;
	overflow: hidden;
`;

const closeButton = (close: any) => css`
	background-image: url(${close});
`;

window.addEventListener("scroll", () => {
	const header = document.getElementById("pageHeader");
	if (window.pageYOffset > 100 && !header?.classList.contains("fixed")) {
		header?.classList.add("fixed");
	} else if (window.pageYOffset <= 100) {
		header?.classList.remove("fixed");
	}
});

const Header: React.FC<Props> = () => {
	const { date, navigationBar } = useConfig();
	const [navigationVisible, showNavigation] = React.useState(false);
	const toggleNavigation = () => showNavigation(current => !current);

	return (
		<>
			<header
				css={headerStyle(LogoWhite, Logo, MenuWhite, Menu)}
				id="pageHeader"
			>
				<h1>
					<span>Oslo Pride</span>
				</h1>
				<p>{date}</p>
				<button css={buttonStyle} onClick={toggleNavigation}>
					Menu
				</button>
			</header>
			<nav
				css={
					navigationVisible
						? navigationStyle
						: [navigationStyle, navigationStyleCollapsed]
				}
			>
				<ul>
					{navigationBar?.map(item => (
						<li key={item._key} onClick={toggleNavigation}>
							<Link link={item} />
						</li>
					))}
				</ul>
				<button
					css={[buttonStyle, closeButton(Close)]}
					onClick={toggleNavigation}
				>
					Close
				</button>
			</nav>
		</>
	);
};

export default Header;
