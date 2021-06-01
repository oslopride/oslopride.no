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

	.detailsHeadline {
		font-size: 2rem;
	}

	.details {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@media (min-width: 700px) {
			grid-template-columns: 1fr 1fr;
		}

		li {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid black;
			padding-bottom: 0.5rem;

			max-width: 100%;
			min-width: 300px;
		}

		span:first-of-type {
			color: ${theme.color.main.purple};
			font-weight: bold;
			text-transform: uppercase;
			font-size: 0.75rem;
			line-height: 1.5;
		}

		span:last-of-type {
		}

		a {
			cursor: pointer;
			color: inherit;
		}
	}
`;

const date = css`
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 0.5rem !important;
	font-weight: 600;
`;

function isSameDay(date1: Date, date2: Date) {
	return (
		date1.toLocaleDateString("nb-NO", {
			year: "numeric",
			month: "numeric",
			day: "numeric"
		}) ===
		date2.toLocaleDateString("nb-NO", {
			year: "numeric",
			month: "numeric",
			day: "numeric"
		})
	);
}

const getArenaName = (arena: SanitySimpleEvent["arena"]) => {
	switch (arena) {
		case "park":
			return "Pride Park";
		case "house":
			return "Pride House";
		case "parade":
			return "Pride Parade";
		case "external":
			return "Eksternt arrangement";
		default:
			return "Annet";
	}
};

const getVenueName = (venue: SanitySimpleEvent["venue"]) => {
	switch (venue) {
		case "stage1":
			return "Scene 1";
		case "stage2":
			return "Scene 2";
		case "youngs":
			return "Youngs";
		case "melahuset":
			return "Melahuset";
		case "online":
			return "Dititalt";
		default:
			return "Annet";
	}
};

const Event: React.FC<Props> = props => {
	const { slug } = props;

	const { data: event, error } = useSWR<SanitySimpleEvent>(
		`*[_type == "simpleEvent" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (event === undefined) return <Loading />;
	if (event === null) return <NotFound />;

	const startTime = new Date(event.startTime).toLocaleDateString("nb-NO", {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit"
	});

	const sameDayEvent =
		!!event.endTime &&
		isSameDay(new Date(event.startTime), new Date(event.endTime));

	const endTime =
		event.endTime &&
		(sameDayEvent
			? new Date(event.endTime).toLocaleTimeString("nb-NO", {
					hour: "2-digit",
					minute: "2-digit"
			  })
			: new Date(event.endTime).toLocaleDateString("nb-NO", {
					weekday: "long",
					day: "numeric",
					month: "long",
					hour: "2-digit",
					minute: "2-digit"
			  }));

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
					{startTime}
				</time>
				<h2>{event.title.no}</h2>
			</Hero>
			<div css={body}>
				{event.description?.no && (
					<SanityPortableText blocks={event.description.no} />
				)}
				<h3 className="detailsHeadline">Arrangementdetaljer</h3>
				<ul className="details">
					<li>
						<span>Arrangør</span>
						<span>{event.official ? "Oslo Pride" : event.organizer}</span>
					</li>
					<li>
						<span>Dato og tid</span>
						<span>
							{startTime} {endTime && `- ${endTime}`}
						</span>
					</li>
					<li>
						<span>Arena</span>
						<span>{getArenaName(event.arena)}</span>
					</li>
					{event.venue && (
						<li>
							<span>Lokasjon</span>
							<span>{getVenueName(event.venue)}</span>
						</li>
					)}
					{event.address && (
						<li>
							<span>Adresse</span>
							<span>{event.address}</span>
						</li>
					)}
					<li>
						<span>Rullestolvennlig</span>
						<span>{event.wheelchairFriendly ? "Ja" : "Nei"}</span>
					</li>
					<li>
						<span>Tegnspråktolket</span>
						<span>{event.signLanguageInterpreted ? "Ja" : "Nei"}</span>
					</li>
					<li>
						<span>Rusfritt</span>
						<span>{event.alcoholFree ? "Ja" : "Nei"}</span>
					</li>
					{/* <li>
						<span>Strømmes</span>
						<span>{event.liveStream ? "Ja" : "Nei"}</span>
					</li> */}
					{event.eventLink && (
						<li>
							<span>Arrangement-lenke</span>
							<span>
								<a href={event.eventLink}>{event.eventLink}</a>
							</span>
						</li>
					)}
				</ul>
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
