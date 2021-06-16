import React from "react";
import { RouteComponentProps } from "@reach/router";
import { urlFor } from "../sanity";
import { SanityLivePage, SanitySimpleEventList } from "../sanity/models";
import Hero from "../components/hero";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";
import Seo from "../components/seo";
import SanityProtableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import EventCard from "../components/event-card";
import { add, format, isAfter, isBefore, isSameDay } from "date-fns";
import { LinkButton } from "../components/link";
import YoutubeEmbed from "../components/sanity-portable-text/youtube-embed";

const hero = css`
	text-align: center;

	h2 {
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0;
	}
`;

const livestream = css`
	width: 90vw;
	max-width: 900px;
	margin: 4rem auto 5rem;

	.notStarted {
		text-align: center;
	}

	.description {
		& > h3 {
			margin-top: 0;
		}
		& > p {
			margin-bottom: 0;
			text-transform: uppercase;
			font-size: 0.8rem;
			color: #3a1b7b;
			font-weight: bold;
		}
	}
`;

const eventPreview = css`
	max-width: 1600px;
	margin: 2rem auto;
	padding: 0 2rem;

	.eventCards {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2rem;
		justify-items: center;

		@media (max-width: 1200px) {
			grid-template-columns: 1fr 1fr;
		}

		@media (max-width: 750px) {
			grid-template-columns: 1fr;
		}
	}

	.eventsButton {
		margin-top: 3rem;
		text-align: center;
	}
`;

type Props = { slug?: string } & RouteComponentProps;
const Live: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent" && liveStream == true && official == true] | order(startTime asc)`
	);
	const { data: page, error } = useSWR<SanityLivePage>(
		`*[_id in ["global_livestream", "drafts.global_livestream"]] | order(_updatedAt desc) [0]`
	);

	// For debugging purposes
	const offset: Duration = {};

	const [now, setNow] = React.useState(add(new Date(), offset));

	React.useEffect(() => {
		const interval = setInterval(() => setNow(add(new Date(), offset)), 1000);
		return () => clearInterval(interval);
	}, [setNow]);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || events === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	const upcomingEvents = events.filter(
		event =>
			isSameDay(now, new Date(event.startTime)) &&
			isAfter(new Date(event.endTime), now)
	);

	const currentEvent =
		upcomingEvents.length > 0 &&
		isBefore(new Date(upcomingEvents[0].startTime), now)
			? upcomingEvents.shift()
			: undefined;

	console.log(currentEvent?.description?.no);

	return (
		<>
			<Hero
				color={[theme.color.main.purple]}
				css={hero}
				imageUrl={
					urlFor(page.image)
						.width(window.innerWidth)
						.url() || ""
				}
				centerContent
				displayScrollButton
			>
				<h2>{page?.title.no}</h2>
				<p>{page?.subtitle.no}</p>
			</Hero>

			<section css={livestream}>
				{page.active ? (
					<>
						{page.youtube && <YoutubeEmbed node={page.youtube} />}

						{currentEvent && (
							<div className="description">
								<p>Direkte nå</p>
								<h3>{currentEvent.title.no}</h3>
								<SanityProtableText blocks={currentEvent?.description?.no} />
							</div>
						)}

						{!currentEvent && upcomingEvents.length > 0 && (
							<div className="description">
								<p>
									Fra {format(new Date(upcomingEvents[0].startTime), "HH:mm")}
								</p>
								<h3>{upcomingEvents[0].title.no}</h3>
								<SanityProtableText
									blocks={upcomingEvents[0]?.description?.no}
								/>
							</div>
						)}
					</>
				) : (
					<p className="notStarted">
						Direktesendingen har ikke startet enda. Du finner programmet for
						hele festivalen under.
					</p>
				)}
			</section>

			<section css={eventPreview}>
				<h2>Senere i dag</h2>

				{upcomingEvents.length === 0 && (
					<p>Ingen flere strømmede arrangementer i dag.</p>
				)}

				<div className="eventCards">
					{upcomingEvents.map(event => (
						<EventCard key={event._id} event={event} />
					))}
				</div>

				<div className="eventsButton">
					<LinkButton
						link={{
							_type: "internalInternalLink",
							text: "Se hele programmet",
							url: "/events"
						}}
						color="pink"
					/>
				</div>
			</section>

			<Seo
				openGraph={{
					type: "article",
					title: page.title?.no || "Oslo Pride",
					description: page.subtitle?.no || "Oslo Pride",
					url: `https://www.oslopride.no/page`,
					locale: "nb_NO",
					publishedAt: page._createdAt || "",
					modifiedAt: page._updatedAt || "",
					image: {
						url:
							urlFor(page.image)
								.width(1200)
								.url() || "",
						alt: page.title?.no || "Oslo Pride"
					}
				}}
			/>
		</>
	);
};

export default Live;
