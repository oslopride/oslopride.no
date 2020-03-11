import React from "react";
import { RouteComponentProps } from "@reach/router";
import { urlFor } from "../sanity";
import { SanityPage } from "../sanity/models";
import Block from "../blocks";
import Hero from "../components/hero";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";

const hero = css`
	color: #ffffff;
	text-align: center;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 2rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}
`;

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityPage>(
		`*[_type == "page" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{error}</div>;
	if (page === undefined) return <div>Loading...</div>;
	if (page === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="50vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor(page.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>{page.header.no.title}</h2>
				<p>{page.header.no.subtitle}</p>
			</Hero>
			{page.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</>
	);
};

export default Page;
