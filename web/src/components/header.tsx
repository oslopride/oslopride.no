import React from "react";
import { css } from "@emotion/core";
import Link from "./link";

import logo from "../assets/logo-color.svg";
import logoWhite from "../assets/logo-white.svg";
import menu from "../assets/menu.svg";
import menuWhite from "../assets/menu-white.svg";
import close from "../assets/close.svg";
import useConfig from "../utils/use-config";

type Props = {};

const headerStyle = (fixedHeader: boolean) => css`
	display: block;
	height: 6rem;
	width: 100%;
	margin: 0 auto;
	position: fixed;
	top: 0;
	left: 0;

	background-color: ${fixedHeader ? "#fff" : "transparent"};

	h1 {
		position: absolute;
		top: 0.5rem;
		left: 2rem;
		margin: 0;
		background-image: url(${fixedHeader ? logo : logoWhite});
		background-size: 160px auto;
		background-repeat: no-repeat;

		width: 160px;
		height: 80px;

		a {
			display: block;
			width: 100%;
			height: 100%;
		}

		@media screen and (max-width: 850px) {
			left: 1vw;
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

		@media (max-width: 700px) {
			display: none;
		}
	}

	button {
		background-image: url(${fixedHeader ? menu : menuWhite});
	}
`;

const navigationStyle = css`
	visibility: visible;
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
				width: 3rem;
				height: 4px;
				background-color: #e350a0;
				position: absolute;
				left: -0.5em;
				top: 0.9em;
			}
		}
	}

	@media screen and (max-width: 930px) {
		padding: 8rem 0rem;

		li {
			font-size: 2rem;

			a {
				padding-left: 2rem;

				&:hover {
					:before {
						width: 1.5rem;
					}
				}
			}
		}
	}
`;

const navigationStyleCollapsed = css`
	visibility: hidden;
	right: -100vw;
	transition: right 1s, visibility 2s, display 2s;
`;

const buttonStyle = css`
	position: absolute;
	top: 2rem;
	right: 3rem;
	z-index: 99;
	height: 30px;
	width: 35px;
	border: none;
	white-space: nowrap;
	overflow: hidden;
	cursor: pointer;
	background-color: transparent;

	background-repeat: no-repeat;
	background-size: auto 30px;

	@media screen and (max-width: 850px) {
		right: calc(1vw + 1rem);
	}
`;

const closeButton = (close: string) => css`
	background-image: url(${close});
`;

const hidden = css`
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
	clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
	clip: rect(1px, 1px, 1px, 1px);
	white-space: nowrap;
`;

const Header: React.FC<Props> = () => {
	const { date, navigationBar } = useConfig();
	const [navigationVisible, showNavigation] = React.useState(false);
	const [hasNavigated, setNavigation] = React.useState(false);
	const [fixedHeader, setFixedHeader] = React.useState(false);
	const openMenu = React.createRef<HTMLButtonElement>();
	const closeMenu = React.createRef<HTMLButtonElement>();

	const toggleNavigation = () => {
		if (!hasNavigated) {
			setNavigation(true);
		}
		showNavigation(current => !current);
	};

	React.useEffect(() => {
		const scrollHandler = () => {
			if (window.pageYOffset > 70) {
				setFixedHeader(true);
			} else if (window.pageYOffset <= 70) {
				setFixedHeader(false);
			}
		};

		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);

	React.useEffect(() => {
		if (navigationVisible && closeMenu.current) {
			closeMenu.current.focus();
		} else if (hasNavigated && openMenu.current) {
			openMenu.current.focus();
		}
	}, [navigationVisible]);

	return (
		<>
			<header css={headerStyle(fixedHeader)} id="pageHeader">
				<h1>
					<a href="/">
						<span css={hidden}>Oslo Pride</span>
					</a>
				</h1>
				<p>{date}</p>
				<button
					css={buttonStyle}
					onClick={toggleNavigation}
					aria-haspopup="menu"
					aria-controls="menu"
					aria-expanded={navigationVisible}
					ref={openMenu}
				>
					<span css={hidden}>Open Menu</span>
				</button>
			</header>
			<div
				id="menu"
				css={
					navigationVisible
						? navigationStyle
						: [navigationStyle, navigationStyleCollapsed]
				}
			>
				<button
					css={[buttonStyle, closeButton(close)]}
					onClick={toggleNavigation}
					ref={closeMenu}
				>
					<span css={hidden}>Close menu</span>
				</button>
				<ul>
					{navigationBar?.map(item => (
						<li key={item._key} onClick={toggleNavigation}>
							<Link link={item} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Header;
