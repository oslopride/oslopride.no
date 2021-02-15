import React from "react";
import styled from "@emotion/styled";

import SubHeading from "../components/sub-heading";
import { SanityArticle } from "../sanity/models";
import { urlFor } from "../sanity";
import theme from "../utils/theme";
import { LinkButton } from "../components/link";

const formatDate = (date: Date): string =>
	date.toLocaleDateString("nb-NO", { month: "long", year: "numeric" });

const ArticleList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: baseline;
	list-style: none;
	padding: 0;
	margin-bottom: 50px;

	@media (min-width: 750px) {
		flex-direction: row;
	}

	li {
		width: 100%;
		@media (min-width: 750px) {
			width: 33.33%;
		}
	}
`;

const Header = styled.header`
	text-align: center;

	h3 {
		font-size: 1.2em;
		margin: 0 auto 30px;
		max-width: 800px;
		text-align: center;

		@media (min-width: 600px) {
			font-size: 1.5em;
		}

		@media (min-width: 750px) {
			font-size: 2em;
		}
	}
`;

const ArticleStyled = styled.article`
	margin: 1rem;
	text-align: left;

	a {
		display: flex;
		flex-direction: column;
		color: inherit;
		text-decoration: none;
	}

	img {
		max-width: 100%;
		height: 200px;
		object-fit: cover;

		@media (min-width: 400px) {
			height: 300px;
		}

		@media (min-width: 750px) {
			height: 200px;
		}

		@media (min-width: 1100px) {
			height: 250px;
		}
	}

	time {
		margin-top: 20px;
		text-transform: uppercase;
		font-size: 0.75em;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: ${theme.color.text.grey};
	}

	h4 {
		margin: 10px 0;
	}
`;

const SectionStyled = styled.section`
	text-align: center;
	margin-bottom: 30px;
`;

type ArticlePreviewProps = {
	article: SanityArticle;
};

const ArticlePreview = ({ article }: ArticlePreviewProps) => (
	<ArticleStyled>
		<a href={`/a/${article.slug.current}`}>
			{article.image && (
				<img
					alt={article.title.no}
					src={
						urlFor(article.image)
							.width(700)
							.url() || undefined
					}
				/>
			)}
			<time>{formatDate(new Date(article._createdAt))}</time>
			<h4>{article.title.no}</h4>
		</a>
	</ArticleStyled>
);

type Props = {
	content: SanityArticle[];
};

const FeaturedArticles: React.FC<Props> = ({ content }: Props) => (
	<SectionStyled>
		<Header>
			<h2>
				<SubHeading>Artikler</SubHeading>
			</h2>
			<h3>
				Viktige intervju, rørende historier, og veien mot et mer åpent samfunn i
				Norge
			</h3>
		</Header>
		<ArticleList>
			{content.map(article => (
				<li key={article.slug.current}>
					<ArticlePreview article={article} />
				</li>
			))}
		</ArticleList>
		<LinkButton
			link={{
				_type: "externalLink",
				text: "Se alle artikler",
				url: "/articles"
			}}
		/>
	</SectionStyled>
);

export default FeaturedArticles;
