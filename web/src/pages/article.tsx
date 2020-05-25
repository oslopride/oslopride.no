import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityArticle } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import Block from "../blocks";
import BlockContentToReact from "@sanity/block-content-to-react";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	color: #ffffff;
	text-align: left;
	margin-bottom: 3rem;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 1rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}
`;

const body = css`
	display: block;
	width: 90vw;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	p,
	blockquote,
	ul {
		font-size: 1.1rem;
		line-height: 1.75rem;
		margin-bottom: 2rem;
	}
`;

const intro = css`
	font-weight: 500;
`;

const date = css`
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 0.5rem !important;
	font-weight: 600;
`;

const credits = css`
	font-size: 1.1rem;
	line-height: 1.75rem;
`;

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityArticle>(
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
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(page.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<p css={date}>{page._createdAt.split("T")[0]}</p>
				<h2>{page.title.no}</h2>
				<BlockContentToReact blocks={page.credits?.no} css={credits} />
			</Hero>
			<div css={[body, intro]}>
				<BlockContentToReact blocks={page.intro?.no} />
			</div>
			<div css={body}>
				<BlockContentToReact blocks={page.body.no} />
			</div>
		</>
	);
};

export default Page;
