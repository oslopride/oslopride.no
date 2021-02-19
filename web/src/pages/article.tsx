import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityArticle } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import Seo from "../components/seo";
import SanityProtableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	margin-bottom: 3rem;

	h2 {
		margin: 0 0 1rem 0;
	}

	p {
		margin: 0;
	}
`;

const body = css`
	display: block;
	width: 90vw;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 4rem;

	p,
	blockquote,
	ul {
		margin-bottom: 2rem;
	}
`;

const date = css`
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 0.5rem !important;
	font-weight: 600;
`;

const Article: React.FC<Props> = props => {
	const { slug } = props;

	const { data: article, error } = useSWR<SanityArticle>(
		`*[_type == "article" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (article === undefined) return <Loading />;
	if (article === null) return <NotFound />;

	return (
		<>
			<Hero
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(article.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				displayScrollButton
			>
				<p css={date}>{article._createdAt.split("T")[0]}</p>
				<h2>{article.title.no}</h2>
				{article.credits?.no && <p>{article.credits.no}</p>}
			</Hero>
			<div css={body}>
				{article.body?.no && <SanityProtableText blocks={article.body.no} />}
			</div>

			<Seo
				openGraph={{
					type: "article",
					title: article.title?.no || "Oslo Pride",
					description: article.summary?.no || "Oslo Pride",
					url: `https://www.oslopride.no/a/${slug}`,
					locale: "nb_NO",
					publishedAt: article._createdAt || "",
					modifiedAt: article._updatedAt || "",
					image: {
						url:
							urlFor(article.image)
								.width(1200)
								.url() || "",
						alt: article.title?.no || "Oslo Pride"
					}
				}}
			/>
		</>
	);
};

export default Article;
