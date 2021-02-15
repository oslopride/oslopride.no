import React from "react";
import { RouteComponentProps } from "@reach/router";
import differenceInHours from "date-fns/differenceInHours";
import endOfDay from "date-fns/endOfDay";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { ReactComponent as Heart } from "../assets/prideheart.svg";
import { SanityEventPage, SanitySimpleEventList } from "../sanity/models";
import BlockContentToReact from "@sanity/block-content-to-react";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import { LinkButton } from "../components/link";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	color: #ffffff;
	text-align: center;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0 auto;
		@media (min-width: 600px) {
			max-width: 50vw;
		}
	}
`;

const body = css`
	margin: 5vh auto 3rem auto;
	width: 90vw;
	max-width: 1150px;
	padding: 0 0.75rem;

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

const dateGroupHeader = css`
	text-transform: capitalize;
	flex: 1 1 100%;
	font-size: 1.75rem;
	margin: 2rem 0;
	text-align: center;

	@media (min-width: 800px) {
		font-size: 2.5rem;
		margin: 4rem 0;
	}
`;

const articleGroup = css`
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
	justify-content: space-between;
`;

const article = css`
	margin: 1rem 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f7f8fa;

	@media (min-width: 800px) {
		width: 100%;
		margin: 2rem 0;
		max-width: unset;
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 40% 1fr;
		grid-template-areas:
			"img text"
			"img button";
		grid-column-gap: 2rem;
	}
`;

const organizerStyle = () => css`
	color: ${theme.color.main.purple};
	margin: 1rem 0;
	font-weight: 600;

	@media (min-width: 800px) {
		margin-top: 0;
	}
`;

const image = (image: string) => css`
	height: 250px;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;

	@media (min-width: 800px) {
		grid-area: img;
		height: 100%;
	}
	background-image: url(${image});
	background-size: cover;
	background-position: center center;
`;

const officialBadge = css`
	height: 65px;
	width: 65px;
	display: block;
	margin: 25px;
	border-radius: 40px;
	background-color: white;
	svg {
		display: block;
		height: 35px;
		width: 35px;
		margin: 1.175rem 0.97rem;
	}
`;

const preview = css`
	margin: 1rem;
	flex-grow: 1;

	@media (min-width: 800px) {
		grid-area: text;
		margin: 0;
		align-self: start;
		margin: 2rem 2rem 0 0;
	}
`;

const date = css`
	letter-spacing: 1px;
	margin: 0.5rem 0;
	font-weight: 600;
	font-size: 1rem;
`;

const eventLink = css`
	margin: 1.5rem;
	width: calc(100% - 3rem);
	margin: 1rem 0;
	width: calc(100% - 2rem);
	margin: 1rem;

	@media (min-width: 800px) {
		grid-area: button;
		margin: 2rem 2rem 2rem 0;
		align-self: end;
	}
`;

const descriptionContainer = css`
	overflow-y: hidden;
`;

const eventPrice = css`
	margin-top: 0.25rem;
	font-weight: normal;
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
				angleDirection="<"
				height="60vh"
				color={[theme.color.main.purple, theme.color.main.pink]}
				imageUrl={
					urlFor(archive.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				textPosition="center"
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
										<div
											css={image(
												urlFor(event.image)
													.width(window.innerWidth)
													.url() || ""
											)}
										>
											{event.official && (
												<div css={officialBadge}>
													<Heart />
												</div>
											)}
										</div>
										<div css={preview}>
											<div css={organizerStyle}>
												{event.organizer
													? `Arrangeres av ${event.organizer}`
													: `Arrangeres av Oslo Pride`}
											</div>
											<h3>{event.title.no}</h3>
											<div css={date}>
												<time dateTime={event.startTime}>
													{new Date(event.startTime).toLocaleTimeString(
														"nb-NO",
														{
															hour: "2-digit",
															minute: "2-digit"
														}
													)}
												</time>
												{event.endTime && (
													<>
														{" "}
														{" - "}
														<time dateTime={event.endTime}>
															{new Date(event.endTime).toLocaleTimeString(
																"nb-NO",
																{
																	hour: "2-digit",
																	minute: "2-digit"
																}
															)}
														</time>
													</>
												)}
												{event.price && (
													<p css={eventPrice}>{`Pris: ${event.price}`}</p>
												)}
											</div>
											<div css={descriptionContainer}>
												<BlockContentToReact blocks={event.description?.no} />
											</div>
										</div>
										<LinkButton
											css={eventLink}
											link={{
												_type: "externalLink",
												text: "Gå til event",
												url: event.eventLink
											}}
										/>
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
