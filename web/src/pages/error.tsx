import React from "react";
import Hero from "../components/hero";
import theme from "../utils/theme";
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

type Props = {
	error: string;
};

const Error: React.FC<Props & RouteComponentProps> = ({ error }) => {
	console.error(error); // For sentry

	return (
		<>
			<Helmet>
				<title>Oslo Pride | Error</title>
				<link rel="canonical" href="http://www.oslopride.no" />
				<meta
					name="description"
					content="Heisann, her gikk det visst i ball for oss, Beklager det!"
				/>
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
				<h1>500 - Error 🚨</h1>
			</Hero>
			<div css={body}>
				<p>Heisann, her gikk det visst i ball for oss 😧 Beklager det!</p>
				<p>
					Alle feil blir automatisk rapportert inn, så alle varsellapene våre
					uler nok nå 🚨 Vi fikser det så fort vi greier!
				</p>
			</div>
		</>
	);
};

export default Error;
