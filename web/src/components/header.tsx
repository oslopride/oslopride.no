import React from "react";
import { css } from "@emotion/core";
import Link from "./link";
import logoWhite from "../assets/logo-white.svg";
import menuWhite from "../assets/menu-white.svg";
import close from "../assets/close.svg";
import useConfig from "../utils/use-config";
import theme from "../utils/theme";

type Props = {};

const headerStyle = css`
	display: block;
	height: 6rem;
	width: 100%;
	margin: 0 auto;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: transparent;

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
		background-image: url(${menuWhite});
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
	background: ${theme.color.main.purple};
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: center;
	padding: 0 2rem;
	z-index: 100;
	transition: right 0.4s, visibility 2s, display 2s;
	overflow-y: scroll;

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
			color: ${theme.color.main.pink};
			:before {
				content: "";
				display: block;
				width: 3rem;
				height: 4px;
				background-color: ${theme.color.main.pink};
				position: absolute;
				left: -0.5em;
				top: 0.9em;
			}
		}

		a[aria-current] {
			color: ${theme.color.main.pink};
			text-decoration: underline;
		}
	}

	@media screen and (max-width: 930px) {
		padding: 8rem 0rem;

		li {
			font-size: 2rem;

			a {
				padding-left: 0;

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
	const openMenu = React.createRef<HTMLButtonElement>();
	const closeMenu = React.createRef<HTMLButtonElement>();

	const toggleNavigation = () => {
		if (!hasNavigated) {
			setNavigation(true);
		}
		showNavigation(current => !current);
	};

	React.useEffect(() => {
		if (navigationVisible && closeMenu.current) {
			closeMenu.current.focus();
		} else if (hasNavigated && openMenu.current) {
			openMenu.current.focus();
		}
	}, [navigationVisible]);

	return (
		<>
			<header css={headerStyle} id="pageHeader">
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
						<li key={item._key}>
							<Link link={item} onClick={toggleNavigation} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Header;
