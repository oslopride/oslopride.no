import React from "react";
import { RouteComponentProps } from "@reach/router";
import { urlFor } from "../sanity";
import { SanityLivePage } from "../sanity/models";
import Hero from "../components/hero";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";
import Seo from "../components/seo";
import SanityProtableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

const hero = css`
	text-align: center;

	h2 {
		margin: 0 0 2rem 0;
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
	padding-bottom: 5rem;

	p,
	blockquote,
	ul {
		margin-bottom: 2rem;
	}
`;

type Props = { slug?: string } & RouteComponentProps;
const Live: React.FC<Props> = () => {
	const { data: live, error } = useSWR<SanityLivePage>(
		`*[_type == "livestream"][0]`
	);
	console.log(live);
	if (error) return <Error error={JSON.stringify(error)} />;
	if (live === undefined) return <Loading />;
	if (live === null) return <NotFound />;
	return (
		<>
			<Hero
				color={[theme.color.main.purple]}
				css={hero}
				imageUrl={
					urlFor(live.image)
						.width(window.innerWidth)
						.url() || ""
				}
				centerContent
				displayScrollButton
			>
				<h2>{live?.title.no}</h2>
				<p>{live?.subtitle.no}</p>
			</Hero>
			<div css={body}>
				<p>{live.body.no}</p>
			</div>

			<Seo
				openGraph={{
					type: "article",
					title: live.title?.no || "Oslo Pride",
					description: live.subtitle?.no || "Oslo Pride",
					url: `https://www.oslopride.no/live`,
					locale: "nb_NO",
					publishedAt: live._createdAt || "",
					modifiedAt: live._updatedAt || "",
					image: {
						url:
							urlFor(live.image)
								.width(1200)
								.url() || "",
						alt: live.title?.no || "Oslo Pride"
					}
				}}
			/>
		</>
	);
};

export default Live;
