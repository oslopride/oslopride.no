import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import sanity, { urlFor } from "../sanity";
import { SanityFrontPage, SanityConfiguration } from "../sanity/models";
import Block from "../blocks";
import Hero from "../components/hero";
import { LinkButton } from "../components/link";
import { css } from "@emotion/core";
import { useWindowSize } from "../utils/hooks";
import theme from "../utils/theme";

const date = css`
	font-size: 1rem;
	text-transform: uppercase;
	color: ${theme.color.background.pink};
`;

const hero = css`
	color: #ffffff;

	span {
		display: inline-flex;
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 2px;
		font-weight: 600;

		::before {
			content: "";
			width: 3em;
			height: 2px;
			background-color: #e350a0;
			place-self: center;
			margin-right: 1em;
		}
	}

	h2 {
		font-size: calc(2rem + 1.7vw);
		margin: 2rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin: 1rem 0;
		padding: 0;

		@media (min-width: 600px) {
			flex-direction: row;

			li:not(:first-of-type) {
				margin-left: 1rem;
			}
		}

		li {
			display: inherit;
			margin-top: 1rem;
		}
	}
`;

type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const { width } = useWindowSize(500);
	const { data: frontPage, error: frontPageError } = useSWR<SanityFrontPage>(
		`*[_id == "global_frontPage"][0]`,
		query => sanity.fetch(query)
	);
	const { data: config, error: configError } = useSWR<SanityConfiguration>(
		`*[_id == "global_configuration"][0]`,
		query => sanity.fetch(query)
	);

	if (frontPageError) return <div>{frontPageError}</div>;
	if (configError) console.error(configError);

	if (frontPage === undefined) return <div>Loading...</div>;
	if (config === undefined) return <div>Loading...</div>;

	if (frontPage === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection=">"
				anglePosition="after"
				height="100vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor(frontPage.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				{width > 700 ? (
					<span>Oslo Pride</span>
				) : (
					<h1 css={date}>{config?.date}</h1>
				)}
				<h2>{frontPage.header.no.title}</h2>
				<p>{frontPage.header.no.subtitle}</p>
				<ul>
					{frontPage.header.no.links?.map((link, idx) => (
						<li key={link._key}>
							<LinkButton
								link={link}
								color={idx === 0 ? "pink" : "blue"}
								css={css`
									width: 100%;
								`}
							/>
						</li>
					))}
				</ul>
			</Hero>
			{frontPage.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</>
	);
};

export default FrontPage;
