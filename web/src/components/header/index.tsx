import React from "react";
import { css } from "@emotion/core";
import Link from "../link";

import logo from "../../assets/logo-color.svg";
import logoWhite from "../../assets/logo-white.svg";
import menu from "../../assets/menu.svg";
import menuWhite from "../../assets/menu-white.svg";
import close from "../../assets/close.svg";

import useConfig from "../../utils/use-config";

type Props = {};

const headerStyle = (
	logoWhite: string,
	logoColor: string,
	menuWhite: string,
	menuColor: string,
	fixedHeader: boolean
) => css`
	display: block;
	height: 6rem;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;

	background-color: ${fixedHeader ? "#fff" : "transparent"};

	h1 {
		position: absolute;
		top: 0.5rem;
		left: 2rem;
		margin: 0;
		background-image: url(${fixedHeader ? logoColor : logoWhite});
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
		background-image: url(${fixedHeader ? menuColor : menuWhite});
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

const closeButton = (close: string) => css`
	background-image: url(${close});
`;

const Header: React.FC<Props> = () => {
	const { date, navigationBar } = useConfig();
	const [navigationVisible, showNavigation] = React.useState(false);
	const toggleNavigation = () => showNavigation(current => !current);

	const [fixedHeader, setFixedHeader] = React.useState(false);

	React.useEffect(() => {
		const scrollHandler = () => {
			if (window.pageYOffset > 100) {
				setFixedHeader(true);
			} else if (window.pageYOffset <= 100) {
				setFixedHeader(false);
			}
		};

		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);

	return (
		<>
			<header
				css={headerStyle(logoWhite, logo, menuWhite, menu, fixedHeader)}
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
					css={[buttonStyle, closeButton(close)]}
					onClick={toggleNavigation}
				>
					Close
				</button>
			</nav>
		</>
	);
};

export default Header;
