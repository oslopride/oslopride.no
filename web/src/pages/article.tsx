import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityArticle } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import BlockContentToReact from "@sanity/block-content-to-react";
import Seo from "../components/seo";

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

const Article: React.FC<Props> = props => {
	const { slug } = props;

	const { data: article, error } = useSWR<SanityArticle>(
		`*[_type == "article" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (article === undefined) return <div>Loading...</div>;
	if (article === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(article.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<p css={date}>{article._createdAt.split("T")[0]}</p>
				<h2>{article.title.no}</h2>
				<BlockContentToReact blocks={article.credits?.no} />
			</Hero>
			<div css={body}>
				<BlockContentToReact blocks={article.body.no} />
			</div>

			<Seo
				openGraph={{
					type: "article",
					title: article.title.no,
					description: article.summary.no,
					url: `https://www.oslopride.no/article/${slug}`,
					locale: "nb_NO",
					publishedAt: article._createdAt,
					modifiedAt: article._updatedAt,
					image: {
						url:
							urlFor(article.image)
								.width(1200)
								.url() || "",
						alt: article.title.no
					}
				}}
			/>
		</>
	);
};

export default Article;
