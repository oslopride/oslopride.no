import React from "react";
import { SanityConfiguration } from "../sanity/models";
import Link from "./link";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import { useWindowSize } from "../utils/hooks";

type Props = {
	navigation: SanityConfiguration["navigationBar"];
	date: SanityConfiguration["date"];
};

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

const Header: React.FC<Props> = props => {
	const { navigation, date } = props;
	const { width } = useWindowSize(500);

	return (
		<header css={header}>
			{width > 700 && <h1>{date}</h1>}
			<nav>
				<ul>
					{navigation?.map(item => (
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
