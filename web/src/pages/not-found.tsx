import React from "react";
import Hero from "../components/hero";
import theme from "../utils/theme";
import * as Sentry from "@sentry/browser";
import { css } from "@emotion/core";
import { RouteComponentProps } from "@reach/router";
import { Helmet } from "react-helmet";

const body = css`
	margin: 5vh auto 3rem auto;
	width: 90vw;
	max-width: 900px;

	p {
		font-size: 1.1rem;
		margin: 0;
	}
`;

const hero = css`
	color: white;
	text-align: center;
`;

const NotFound: React.FC<RouteComponentProps> = () => {
	Sentry.captureException(new Error("404 Not Found"));
	return (
		<>
			<Helmet>
				<title>Oslo Pride | Siden finnes ikke</title>
				<link rel="canonical" href="http://www.oslopride.no" />
				<meta name="description" content="Denne siden finnes dessverre ikke." />
				<meta name="robots" content="noindex" />
			</Helmet>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl=""
				textPosition="center"
				css={hero}
			>
				<h1>404 - Siden finnes ikke</h1>
			</Hero>
			<div css={body}>
				<p>Siden du leter etter finnes dessverre ikke 😿</p>
			</div>
		</>
	);
};

export default NotFound;
