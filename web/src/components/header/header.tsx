import React from "react";
import { Link as RouterLink } from "@reach/router";
import { SanityConfiguration } from "../../sanity/models";
import { css } from "@emotion/core";

import LogoColor from "./logo-color.svg";
import Close from "./close.svg";
import Menu from "./menu.svg";

type Props = {
	navigation: SanityConfiguration["navigationBar"];
	date: SanityConfiguration["date"];
};

/* TODO BEFORE MERGING:
	- Code cleanup
	- Accessibility of button, logo, etc
*/

const headerStyle = css`
	display: block;
	height: 6rem;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: white;

	h1 {
		position: absolute;
		top: 0;
		left: 2rem;
		margin: 0;
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
		padding-left: 4rem;

		a {
			color: white;
			text-decoration: none;
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
`;

const logoStyle = css`
	.logo-color_svg__st0 {
	}
`;

const Header: React.FC<Props> = props => {
	const { navigation, date } = props;
	const [navigationVisible, showNavigation] = React.useState(false);
	const toggleNavigation = () => showNavigation(current => !current);

	return (
		<>
			<header css={headerStyle}>
				<h1>
					<LogoColor css={logoStyle} width="160px" height="auto" />
				</h1>
				<p>{date}</p>
				<button css={buttonStyle}>
					<Menu width="30px" height="auto" onClick={toggleNavigation} />
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
					{navigation?.map(item => (
						<li key={item.url._id}>
							<RouterLink
								to={
									item.url._type === "frontPage" ? "/" : item.url.slug.current
								}
							>
								{item.text}
							</RouterLink>
						</li>
					))}
				</ul>
				<button css={buttonStyle}>
					<Close width="30px" height="auto" onClick={toggleNavigation} />
				</button>
			</nav>
		</>
	);
};

export default Header;
