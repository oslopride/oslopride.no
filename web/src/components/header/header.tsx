import React from "react";
import { Link as RouterLink } from "@reach/router";
import { SanityConfiguration } from "../../sanity/models";
import { css } from "@emotion/core";

import LogoColor from "./logo-color.svg";

type Props = {
	navigation: SanityConfiguration["navigationBar"];
	date: SanityConfiguration["date"];
};

const headerStyle = css`
	position: relative;
	h1 {
		position: absolute;
		top: 0;
		left: 2rem;
		margin: 0;
	}
	p {
		position: absolute;
		top: 1rem;
		right: 3rem;
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

const logoStyle = css`
	.logo-color_svg__st0 {
	}
`;

const Header: React.FC<Props> = props => {
	const { navigation, date } = props;

	return (
		<header css={headerStyle}>
			<h1>
				<LogoColor css={logoStyle} width="160px" height="auto" />
			</h1>
			<p>{date}</p>
			<nav css={navigationStyle}>
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
			</nav>
		</header>
	);
};

export default Header;
