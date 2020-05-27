import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { ReactComponent as Heart } from "../assets/prideheart.svg";
import { SanityEventPage, SanitySimpleEventList } from "../sanity/models";
import BlockContentToReact from "@sanity/block-content-to-react";

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
		margin: 0 auto;
		@media (min-width: 600px) {
			max-width: 50vw;
		}
	}
`;

const body = css`
	margin: 2rem auto;
	width: 90vw;

	p {
		margin-bottom: 0;
		color: ${theme.color.text.grey};
		font-size: 1rem;
		line-height: 1.3rem;

		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 1rem 0 2rem 0;
		font-size: 1.5rem;
	}
`;

const dateGroupHeader = css`
	text-transform: capitalize;
	@media (min-width: 600px) {
		font-size: 2rem;
		margin: 0 2rem;
	}
`;

const articleGroup = css`
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
`;

const article = css`
	display: flex;
	flex-direction: column;
	background-color: #f7f8fa;

	@media (min-width: 600px) {
		width: 40vw;
		margin: 2rem;
	}

	min-height: 330px;
	margin-bottom: 2rem;
`;

const organizerStyle = () => css`
	color: ${theme.color.main.purple};
	margin: 1rem 0;
	font-weight: 600;
`;

const image = (image: string) => css`
	height: 200px;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;

	@media (min-width: 600px) {
		height: 350px;
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
	padding: 1.5rem 1.5rem 0 1.5rem;
	flex-grow: 1;
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
	display: block;
	background-color: ${theme.color.main.blue};
	text-transform: uppercase;
	letter-spacing: 2px;
	padding: 1em 1.7em;
	margin-top: 1rem;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	border-radius: 4px;
	color: #ffffff;
	font-weight: bold;

	:hover {
		color: #ffffff;
		background-color: ${theme.color.main.purple};
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
	return groupedEvents;
};

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: archive, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (archive === undefined) return <div>Loading...</div>;
	if (archive === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="50vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor(archive.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>{archive.title.no}</h2>
				<p>{archive.subtitle && archive.subtitle.no}</p>
			</Hero>

			<div css={body}>
				{events && events.length > 0 ? (
					groupEventsByDay(events).map(group => (
						<>
							<h2 css={dateGroupHeader}>
								{new Date(group[0].startTime).toLocaleDateString("nb-NO", {
									weekday: "long",
									day: "numeric",
									month: "long"
								})}
							</h2>
							<div css={articleGroup}>
								{group?.map(event => (
									<div css={article} key={event._id}>
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
												<time>
													{new Date(event.startTime).toLocaleTimeString(
														"nb-NO",
														{
															hour: "2-digit",
															minute: "2-digit"
														}
													)}
												</time>
												{" - "}
												<time>
													{new Date(event.endTime).toLocaleTimeString("nb-NO", {
														hour: "2-digit",
														minute: "2-digit"
													})}
												</time>
												{event.price && " Pris: " + event.price}
											</div>
											<BlockContentToReact blocks={event.description.no} />
										</div>
										<a css={eventLink} href={event.eventLink}>
											Gå til event
										</a>
									</div>
								))}
							</div>
						</>
					))
				) : (
					<p>No events yet</p>
				)}
			</div>
		</>
	);
};

export default EventOverview;
