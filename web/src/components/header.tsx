import React from "react";
import Link from "./link";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useWindowSize from "../utils/use-window-size";
import useConfig from "../utils/use-config";

const header = css`
	display: flex;
	flex-direction: row-reverse;

	h1 {
		font-size: 1rem;
		margin-right: 1rem;
		color: ${theme.color.background.pink};
		text-transform: uppercase;
	}

	nav {
		flex: 1;
		ul {
			list-style: none;
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			li {
				color: #ffffff;
				text-transform: uppercase;
				letter-spacing: 1px;
				margin-left: 1rem;
			}
		}
	}
`;

type Props = {};

const Header: React.FC<Props> = () => {
	const { width } = useWindowSize(500);
	const { date, navigationBar } = useConfig();

	return (
		<header css={header}>
			{width > 700 && <h1>{date}</h1>}
			<nav>
				<ul>
					{navigationBar?.map(item => (
						<li key={item._key}>
							<Link link={item} />
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
