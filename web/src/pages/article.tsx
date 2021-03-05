import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityArticle } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import Seo from "../components/seo";
import SanityPortableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import ScrollUpButton from "../components/scroll-up-button";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	margin-bottom: 3rem;
	text-align: center;

	h2 {
		margin: 0 0 1rem 0;
	}

	time {
		color: ${theme.color.background.pink};
	}
`;

const body = css`
	display: block;
	width: 90vw;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 4rem;
	overflow-wrap: break-word;

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

const nav = css`
	display: grid;
	grid-column-gap: 1rem;
	grid-template-columns: 1fr auto 1fr;

	h3 {
		color: ${theme.color.text.grey};
		text-transform: uppercase;
		font-size: 0.85rem;
		letter-spacing: 1px;
	}

	> div {
		max-width: 15rem;
	}

	a:link,
	a:visited {
		color: ${theme.color.text.black};
		font-weight: 600;
		text-decoration: none;
		@media (min-width: 700px) {
			line-height: 1.5;
			font-size: 1.4rem;
		}
	}
`;

const next = css`
	grid-column-start: 3;
	justify-self: end;

	h3 {
		text-align: right;
	}
`;

const scrollUpButton = css`
	grid-column-start: 2;
	align-self: center;
`;

const prev = css`
	grid-column-start: 1;
`;

const divider = css`
	margin-bottom: 1.5em;
`;

const articleFooter = css`
	max-width: 1200px;
	margin: 0 auto 3rem;

	@media (max-width: 1250px) {
		margin: 0 1rem 3rem;
	}

	hr {
		border: none;
		border-top: 1px solid rgba(101, 103, 129, 0.4);
	}
`;

const Article: React.FC<Props> = props => {
	const { slug } = props;

	const { data: article, error } = useSWR<SanityArticle>(
		`*[_type == "article" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	// get all articles in order to get next and prev from currently viewed article
	const { data: articleList } = useSWR<Array<SanityArticle>>(
		`*[_type == "article"]{ _id, title, slug }  | order(_createdAt desc)`
	);

	const indexOfCurrentArticle =
		articleList?.findIndex(articleItem => articleItem._id === article?._id) ??
		-1;

	const nextArticle =
		indexOfCurrentArticle >= 1
			? articleList?.[indexOfCurrentArticle - 1]
			: null;

	const prevArticle =
		indexOfCurrentArticle < (articleList?.length || 0) - 1
			? articleList?.[indexOfCurrentArticle + 1]
			: null;

	if (error) return <Error error={JSON.stringify(error)} />;
	if (article === undefined) return <Loading />;
	if (article === null) return <NotFound />;

	const formattedDate = format(new Date(article._createdAt), "do MMMM yyyy", {
		locale: nb
	});

	return (
		<>
			<Hero
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(article.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				displayScrollButton
				centerContent
			>
				<time css={date} dateTime={article._createdAt}>
					{formattedDate}
				</time>
				<h2>{article.title.no}</h2>
				{article.credits?.no && <p>{article.credits.no}</p>}
			</Hero>
			<div css={body}>
				{article.body?.no && <SanityPortableText blocks={article.body.no} />}
			</div>
			<footer css={articleFooter}>
				<hr css={divider} />
				<nav css={nav}>
					{prevArticle && (
						<div css={prev}>
							<h3>Forrige artikkel</h3>
							<a href={`/a/${prevArticle.slug.current}`}>
								{prevArticle.title.no}
							</a>
						</div>
					)}
					<ScrollUpButton css={scrollUpButton} />
					{nextArticle && (
						<div css={next}>
							<h3>Neste artikkel</h3>
							<a href={`/a/${nextArticle.slug.current}`}>
								{nextArticle.title.no}
							</a>
						</div>
					)}
				</nav>
			</footer>

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
