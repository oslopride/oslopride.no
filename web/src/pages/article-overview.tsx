import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { SanityArchive, SanityArticleList } from "../sanity/models";
import Seo from "../components/seo";
import { darken } from "polished";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	color: #ffffff;
	text-align: center;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0;
	}
`;

const body = css`
	display: block;
	margin: auto;
	margin-top: calc(0vh - calc(5vh + 10.510423526567646vw));
	width: 90vw;
	max-width: 900px;

	p {
		margin-bottom: 0;
		color: ${theme.color.text.grey};

		a {
			color: ${darken(0.15)(theme.color.main.pink)};
		}
	}

	h3 {
		margin: 0;
		font-size: 1.75rem;
	}
`;

const article = css`
	display: grid;
	background-color: #f7f8fa;

	min-height: 330px;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 2rem;

	div {
		min-width: 50%;
	}

	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

const image = (image: string) => css`
	min-height: 330px;
	height: 100%;
	background-image: url(${image});
	background-size: cover;
	background-position: center center;
`;

const preview = css`
	@media screen and (max-width: 700px) {
		padding: 1.5rem;
	}
	padding: 1.5rem 3rem;
`;

const date = css`
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 0.75rem !important;
	margin-bottom: 0.5rem !important;
	font-weight: 600;
`;

const ArticleOverview: React.FC<Props> = () => {
	const { data: articles } = useSWR<SanityArticleList>(
		`*[_type == "article"] | order(_createdAt desc)`
	);

	const { data: archive, error } = useSWR<SanityArchive>(
		`*[_type == "articleArchive"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (archive === undefined) return <Loading />;
	if (archive === null) return <NotFound />;

	return (
		<>
			<Hero
				angleDirection="<"
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(archive.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				textPosition="center"
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
								<p>{art.summary?.no}</p>
								<p>
									<a href={"/a/" + art.slug.current}>Les mer</a>
								</p>
							</div>
						</div>
					))
				) : (
					<p>Ingen artikler enda</p>
				)}
			</div>

			<Seo
				openGraph={{
					type: "website",
					title: archive.title.no,
					description: archive.subtitle.no,
					url: `https://www.oslopride.no/articles`,
					locale: "nb_NO",
					image: {
						url:
							urlFor(archive.image)
								.width(1200)
								.url() || "",
						alt: archive.subtitle.no
					}
				}}
			/>
		</>
	);
};

export default ArticleOverview;
