import React from "react";
import { RouteComponentProps } from "@reach/router";
import differenceInHours from "date-fns/differenceInHours";
import endOfDay from "date-fns/endOfDay";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import {
	SanityEventPage,
	SanitySimpleEvent,
	SanitySimpleEventList
} from "../sanity/models";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	text-align: center;

	h2 {
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0 auto;
	}
`;

const body = css`
	margin: 5vh auto 3rem auto;
	width: 95vw;
	max-width: 1200px;

	@media (min-width: 800px) {
		width: 90vw;
	}

	p {
		margin-bottom: 0;
		color: ${theme.color.text.grey};

		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 1rem 0 0 0;
		font-size: 1.5rem;
	}
`;

const oldEventButtonContainer = css`
	display: flex;
	justify-content: flex-end;

	& > button {
		border: none;
		background: inherit;
		text-decoration: underline;
		cursor: pointer;
	}
`;

const dateGroupHeader = css`
	text-transform: capitalize;
	flex: 1 1 100%;
	font-size: 1.75rem;
	margin: 2rem 0;
	text-align: center;
`;

const articleGroup = css`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	gap: 1.35rem 1rem;

	@media (min-width: 650px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const article = css`
	width: 100%;
	height: 100%;
	max-width: 500px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	border-radius: 8px;

	.imageWrapper {
		padding-bottom: 56.2%;
		position: relative;
	}

	img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.contentWrapper {
		background: #f7f8fa;
		padding: 24px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.timeAndPlace {
		display: flex;
		justify-content: space-between;

		time {
			color: #656781;
		}

		span {
			background: ${theme.color.background.lightYellow};
		}
	}

	h3 {
		font-size: 1.3rem;
		line-height: 1.4;
	}

	ul {
		flex: 1;
		list-style: none;
		padding: 0;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 0;

		li {
			margin: 8px;
		}
	}

	.tag {
		padding: 8px 16px;
		background: #ebe7f1;
		border-radius: 50px;
		font-size: 0.75rem;
		line-height: 1.2;
		font-weight: bold;
	}

	a {
		margin-top: 1rem;
		width: 100%;
		background-color: ${theme.color.main.blue};
		text-transform: uppercase;
		text-align: center;
		display: inline-block;
		letter-spacing: 1px;
		padding: 1rem 1.75rem;
		text-decoration: none;
		cursor: pointer;
		border-radius: 4px;
		color: #ffffff;
		font-weight: bold;
		transition: color 0.3s, background 0.3s;

		&:hover,
		&:focus {
			color: #ffffff;
			background-color: ${theme.color.main.purple};
		}
	}
`;

const groupEventsByDay = (events: SanitySimpleEventList) => {
	if (events.length === 0) {
		return [];
	}

	const groupedEvents = [[events[0]]];

	events.slice(1).forEach(event => {
		const lastGroup = groupedEvents[groupedEvents.length - 1];
		const lastEvent = lastGroup[lastGroup.length - 1];

		const lastEventStart = new Date(lastEvent.startTime);
		const currentEventStart = new Date(event.startTime);

		if (
			lastEventStart.toLocaleDateString("nb-NO", {
				year: "numeric",
				month: "numeric",
				day: "numeric"
			}) ===
			currentEventStart.toLocaleDateString("nb-NO", {
				year: "numeric",
				month: "numeric",
				day: "numeric"
			})
		) {
			lastGroup.push(event);
		} else {
			groupedEvents.push([event]);
		}
	});

	const upcommingEvents: typeof groupedEvents = [];
	const oldEvents: typeof groupedEvents = [];
	const currentDate = new Date();

	groupedEvents.forEach(group => {
		const groupDate = new Date(group[0].startTime);
		if (differenceInHours(currentDate, endOfDay(groupDate)) >= 5) {
			oldEvents.push(group);
		} else {
			upcommingEvents.push(group);
		}
	});

	return [oldEvents, upcommingEvents];
};

const getArenaName = (arena: SanitySimpleEvent["arena"]) => {
	switch (arena) {
		case "park":
			return "Pride Park";
		case "house":
			return "Pride House";
		case "parade":
			return "Pride Parade";
		default:
			return undefined;
	}
};

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: archive, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	const [showOldEevnts, setShowOldEvents] = React.useState(false);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (archive === undefined) return <Loading />;
	if (archive === null) return <NotFound />;

	const [oldEvent, upcommingEvents] =
		events && events.length > 0 ? groupEventsByDay(events) : [[], []];

	const displayEvents = showOldEevnts
		? [...oldEvent, ...upcommingEvents]
		: upcommingEvents;

	return (
		<>
			<Hero
				color={[theme.color.main.purple, theme.color.main.pink]}
				imageUrl={
					urlFor(archive.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				centerContent
			>
				<h2>{archive.title.no}</h2>
				<p>{archive.subtitle && archive.subtitle.no}</p>
			</Hero>

			<div css={body}>
				{oldEvent.length > 0 && !showOldEevnts ? (
					<div css={oldEventButtonContainer}>
						<button onClick={() => setShowOldEvents(true)}>
							Vis tidligere eventer
						</button>
					</div>
				) : null}
				{displayEvents && displayEvents.length > 0 ? (
					displayEvents.map(group => (
						<React.Fragment key={group[0].startTime}>
							<h2 css={dateGroupHeader}>
								{new Date(group[0].startTime).toLocaleDateString("nb-NO", {
									weekday: "long",
									day: "numeric",
									month: "long"
								})}
							</h2>
							<div css={articleGroup}>
								{group?.map(event => (
									<article css={article} key={event._id}>
										<div className="imageWrapper">
											<img
												src={
													urlFor(event.image)
														.width(window.innerWidth)
														.url() || ""
												}
												alt={event.title.no}
											/>
										</div>

										<div className="contentWrapper">
											<div className="timeAndPlace">
												<time dateTime={event.startTime}>
													{new Date(event.startTime).toLocaleTimeString(
														"nb-NO",
														{
															hour: "2-digit",
															minute: "2-digit"
														}
													)}
												</time>
												{getArenaName(event.arena) && (
													<span className="tag">
														{getArenaName(event.arena)}
													</span>
												)}
											</div>
											<h3>{event.title.no}</h3>
											<ul>
												{event.liveStream && <li className="tag">strømmes</li>}
												{event.wheelchairFriendly && (
													<li className="tag">rullestolvennlig</li>
												)}
												{event.signLanguageInterpreted && (
													<li className="tag">tegnspråktolket</li>
												)}
											</ul>
											<a href={`/event/${event.slug.current}`}>Se detaljer</a>
										</div>
									</article>
								))}
							</div>
						</React.Fragment>
					))
				) : (
					<p>Ingen eventer enda</p>
				)}
			</div>
		</>
	);
};

export default EventOverview;
