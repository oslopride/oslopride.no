import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { SanityPage } from "../sanity/models";
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
	margin: -200px auto 0 auto;
	width: 90vw;
	max-width: 885px;
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

const ArticleOverview: React.FC<Props> = props => {
	const { slug } = props;

	const { data: articles, error } = useSWR<SanityPage>(
		`*[_type == "article"] | order(_updatedAt desc)`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (articles === undefined) return <div>Loading...</div>;
	if (articles === null) return <div>404 - Not found</div>;

	console.log(articles);

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="50vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor({})
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>Articles</h2>
			</Hero>
			<div css={body}>
				{articles.map(art => (
					<div css={article} key={art._id}>
						<div
							css={image(
								urlFor(art.image)
									.width(window.innerWidth)
									.url() || ""
							)}
						/>
						<div css={preview}>
							<h3>{art.title.no}</h3>
							{art.intro.no.map(block => (
								<Block key={block._key} block={block} />
							))}
							<a href={"/article/" + art.slug.current}>Read more</a>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ArticleOverview;
