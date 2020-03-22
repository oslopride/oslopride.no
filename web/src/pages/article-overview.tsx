import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";

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

const ArticleOverview: React.FC<Props> = props => {
	const { slug } = props;

	console.log(slug);

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
			<p>All articles will be listed here</p>
		</>
	);
};

export default ArticleOverview;
