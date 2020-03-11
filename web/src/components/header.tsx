import React from "react";
import { SanityConfiguration } from "../sanity/models";
import Link from "./link";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import { useWindowSize } from "../utils/hooks";
import useSWR from "swr";

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
	const { data: config, error: configError } = useSWR<SanityConfiguration>(
		`*[_id == "global_configuration"] | order(_updatedAt desc) [0]`
	);

	if (configError) return <div>{JSON.stringify(configError)}</div>;
	if (config === undefined) return <div>Loading...</div>;
	if (config === null) return <div>No configuration found</div>;

	return (
		<header css={header}>
			{width > 700 && <h1>{config.date}</h1>}
			<nav>
				<ul>
					{config.navigationBar?.map(item => (
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
