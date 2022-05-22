import React, { useMemo } from "react";
import { RouteComponentProps } from "@reach/router";
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
import Select from "react-select";
import EventCard from "../components/event-card";
import { isBefore } from "date-fns";

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

const filter = css`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	margin: 0 auto 2rem;
	padding: 0 1rem;
	max-width: 1000px;

	@media (min-width: 650px) {
		grid-template-columns: 1fr 1fr;

		div:last-of-type {
			grid-column-end: span 2;
		}
	}

	@media (min-width: 900px) {
		grid-template-columns: 1fr 1fr 1fr;

		div:last-of-type {
			grid-column-end: span 1;
		}
	}
`;

const filterHeader = css`
	text-align: center;
	margin-top: 2rem;
`;

type Filter = {
	value: string;
	label: string;
	predicate: (event: SanitySimpleEvent) => boolean;
};

const arenaFilters: Filter[] = [
	{
		value: "park",
		label: "Pride Park",
		predicate: event => event.arena === "park"
	},
	{
		value: "house",
		label: "Pride House",
		predicate: event => event.arena === "house"
	},
	{
		value: "parade",
		label: "Pride Parade",
		predicate: event => event.arena === "parade"
	},
	{
		value: "square",
		label: "Pride Square",
		predicate: event => event.arena === "square"
	}
];

const categoryFilters: Filter[] = [
	{
		value: "concert",
		label: "Konsert",
		predicate: event => event.category === "concert"
	},
	{
		value: "talk",
		label: "Samtale",
		predicate: event => event.category === "talk"
	},
	{
		value: "lecture",
		label: "Foredrag",
		predicate: event => event.category === "lecture"
	},
	{
		value: "debate",
		label: "Debatt",
		predicate: event => event.category === "debate"
	},
	{
		value: "party",
		label: "Fest",
		predicate: event => event.category === "party"
	},
	{
		value: "dans",
		label: "Dans",
		predicate: event => event.category === "dans"
	},
	{
		value: "drag",
		label: "Drag",
		predicate: event => event.category === "drag"
	},
	{
		value: "teater",
		label: "Teater",
		predicate: event => event.category === "teater"
	},
	{
		value: "minipride",
		label: "Mini Pride",
		predicate: event => event.category === "minipride"
	}
];

const accessibilityFilters: Filter[] = [
	{
		value: "liveStream",
		label: "Strømmes",
		predicate: event => event.liveStream
	},
	{
		value: "wheelChairFriendly",
		label: "Rullestolvennlig",
		predicate: event => event.wheelchairFriendly
	},
	{
		value: "signLanguageInterpreted",
		label: "Tegnspråktolket",
		predicate: event => event.signLanguageInterpreted
	},
	{
		value: "alcoholFree",
		label: "Rusfritt",
		predicate: event => event.alcoholFree
	}
];

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: page, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	const [selectedArenaFilters, setArenaFilters] = React.useState<Filter[]>([]);
	const [selectedCategoryFilters, setCategoryFilters] = React.useState<
		Filter[]
	>([]);
	const [
		selectedAccessibilityFilters,
		setAccessibilityFilters
	] = React.useState<Filter[]>([]);

	const [showOldEvents, setShowOldEvents] = React.useState(false);

	const eventsToDisplay = useMemo(() => {
		let eventsToDisplay: SanitySimpleEventList = [];
		if (events) {
			// just filter out old events by checking if they are in the future.
			const now = new Date();
			eventsToDisplay = events.filter(event => {
				const eventEnd = new Date(event.endTime);
				// return isAfter(eventEnd, now);
				return true;
			});
		}
		return eventsToDisplay;
	}, [events]);

	const oldEvents = useMemo(() => {
		let oldEvents: SanitySimpleEventList = [];
		if (events) {
			const now = new Date();
			oldEvents = events.filter(event => {
				const eventEnd = new Date(event.endTime);
				return isBefore(eventEnd, now);
			});
		}
		return oldEvents;
	}, [events, showOldEvents]);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || events === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	const filteredEvents =
		events &&
		events.filter(e => {
			return (
				(selectedArenaFilters.length < 1 ||
					selectedArenaFilters.reduce<boolean>(
						(prev, filter) => prev || filter.predicate(e),
						false
					)) &&
				(selectedCategoryFilters.length < 1 ||
					selectedCategoryFilters.reduce<boolean>(
						(prev, filter) => prev || filter.predicate(e),
						false
					)) &&
				(selectedAccessibilityFilters.length < 1 ||
					selectedAccessibilityFilters.reduce<boolean>(
						(prev, filter) => prev && filter.predicate(e),
						true
					))
			);
		});

	return (
		<>
			<Hero
				color={[theme.color.main.purple, theme.color.main.pink]}
				imageUrl={
					urlFor(page.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				centerContent
			>
				<h2>{page.title.no}</h2>
				<p>{page.subtitle && page.subtitle.no}</p>
			</Hero>
			<h3 css={filterHeader}>Filtrering</h3>
			<section css={filter}>
				<Select
					aria-label="Arena"
					placeholder="Arena"
					onChange={setArenaFilters}
					options={arenaFilters}
					isSearchable={false}
					isMulti
				/>
				<Select
					aria-label="Programtype"
					placeholder="Programtype"
					onChange={setCategoryFilters}
					options={categoryFilters}
					isSearchable={false}
					isMulti
				/>
				<Select
					aria-label="Tilgjengelighet"
					placeholder="Tilgjengelighet"
					onChange={setAccessibilityFilters}
					options={accessibilityFilters}
					isSearchable={false}
					isMulti
				/>
			</section>
			<div css={body}>
				{eventsToDisplay.length > 0 ? (
					<ul css={articleGroup}>
						{eventsToDisplay.map(event => (
							<li key={event._id}>
								<EventCard event={event} />
							</li>
						))}
					</ul>
				) : (
					<p>Ingen eventer enda</p>
				)}
			</div>
		</>
	);
};

export default EventOverview;
