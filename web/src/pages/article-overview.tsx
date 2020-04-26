import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { SanityArchive, SanityArticleList } from "../sanity/models";
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

const body = css`
	display: block;
	margin: -250px auto 0 auto;
	width: 90vw;
	max-width: 885px;

	p {
		margin-bottom: 0;
		color: ${theme.color.text.grey};

		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 0;
		font-size: 2rem;
	}
`;

const article = css`
	display: grid;
	background-color: #f7f8fa;

	min-height: 330px;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 2rem;
`;

const image = (image: string) => css`
	height: 100%;
	background-image: url(${image});
	background-size: cover;
	background-position: center center;
`;

const preview = css`
	padding: 1.5rem 3rem;
`;

const date = css`
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 0.5rem !important;
	font-weight: 600;
`;

const ArticleOverview: React.FC<Props> = () => {
	const { data: articles } = useSWR<SanityArticleList>(
		`*[_type == "article"] | order(_updatedAt desc)`
	);

	const { data: archive, error } = useSWR<SanityArchive>(
		`*[_type == "articleArchive"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (archive === undefined) return <div>Loading...</div>;
	if (archive === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="50vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor(archive.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>{archive.title.no}</h2>
				<p>{archive.subtitle.no}</p>
			</Hero>

			<div css={body}>
				{articles && articles.length > 0 ? (
					articles?.map(art => (
						<div css={article} key={art._id}>
							<div
								css={image(
									urlFor(art.image)
										.width(window.innerWidth)
										.url() || ""
								)}
							/>
							<div css={preview}>
								<p css={date}>{art._createdAt.split("T")[0]}</p>
								<h3>{art.title.no}</h3>
								{art.intro.no.map(block => (
									<Block key={block._key} block={block} />
								))}
								<p>
									<a href={"/article/" + art.slug.current}>Read more</a>
								</p>
							</div>
						</div>
					))
				) : (
					<p>No articles yet</p>
				)}
			</div>
		</>
	);
};

export default ArticleOverview;
