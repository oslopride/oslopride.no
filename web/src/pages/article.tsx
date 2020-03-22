import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityPage } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import Block from "../blocks";

type Props = { slug?: string } & RouteComponentProps;

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

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityPage>(
		`*[_type == "article" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
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
					urlFor(page.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>{page.title.no}</h2>
				<p>{page.title.no}</p>
			</Hero>
			{page.body.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</>
	);
};

export default Page;
