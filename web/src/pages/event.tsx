import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanitySimpleEvent } from "../sanity/models";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { css } from "@emotion/core";
import Seo from "../components/seo";
import SanityPortableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

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

const Event: React.FC<Props> = props => {
	const { slug } = props;

	const { data: event, error } = useSWR<SanitySimpleEvent>(
		`*[_type == "simpleEvent" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (event === undefined) return <Loading />;
	if (event === null) return <NotFound />;

	const formattedDate = new Date(event.startTime).toLocaleDateString("nb-NO", {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit"
	});

	return (
		<>
			<Hero
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(event.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				displayScrollButton
				centerContent
			>
				<time css={date} dateTime={event.startTime}>
					{formattedDate}
				</time>
				<h2>{event.title.no}</h2>
			</Hero>
			<div css={body}>
				{event.description?.no && (
					<SanityPortableText blocks={event.description.no} />
				)}
			</div>

			<Seo
				openGraph={{
					type: "article",
					title: event.title?.no || "Oslo Pride",
					description: event.blurb?.no || "Oslo Pride",
					url: `https://www.oslopride.no/event/${slug}`,
					locale: "nb_NO",
					publishedAt: event._createdAt || "",
					modifiedAt: event._updatedAt || "",
					image: {
						url:
							urlFor(event.image)
								.width(1200)
								.url() || "",
						alt: event.title?.no || "Oslo Pride"
					}
				}}
			/>
		</>
	);
};

export default Event;
