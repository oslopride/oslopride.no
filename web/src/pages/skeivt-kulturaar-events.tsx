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
import Select from "react-select";
import EventCard from "../components/event-card";

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
		label: "Foredrag",
		predicate: event => event.category === "talk"
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

	const [showOldEevnts, setShowOldEvents] = React.useState(false);

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

	const [oldEvent, upcommingEvents] =
		filteredEvents && filteredEvents.length > 0
			? groupEventsByDay(filteredEvents)
			: [[], []];

	const displayEvents = showOldEevnts
		? [...oldEvent, ...upcommingEvents]
		: upcommingEvents;

	const handleSubmit = (e: any) => {
		const encode = (data: any) => {
			return Object.keys(data)
				.map(
					key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
				)
				.join("&");
		};

		e.preventDefault();
		const newMessage = {};

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "submit-skeivt-kulturaar-event", newMessage })
		})
			.then(() => console.log("Submitted form"))
			.catch(error => console.log(error));
	};

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
					placeholder="Arena"
					onChange={setArenaFilters}
					options={arenaFilters}
					isSearchable={false}
					isMulti
				/>
				<Select
					placeholder="Programtype"
					onChange={setCategoryFilters}
					options={categoryFilters}
					isSearchable={false}
					isMulti
				/>
				<Select
					placeholder="Tilgjengelighet"
					onChange={setAccessibilityFilters}
					options={accessibilityFilters}
					isSearchable={false}
					isMulti
				/>
			</section>

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
									<EventCard key={event._id} event={event} />
								))}
							</div>
						</React.Fragment>
					))
				) : (
					<p>Ingen eventer enda</p>
				)}
			</div>

			<div>
				<form name="submit-skeivt-kulturaar-event" onSubmit={handleSubmit}>
					<input
						type="hidden"
						name="form-name"
						value="submit-skeivt-kulturaar-event"
					/>
					<p>
						<label>
							Kontaktperson: <input type="text" name="name" />
						</label>
					</p>
					<p>
						<label>
							Kontaktepost
							<input type="email" name="email" />
						</label>
					</p>
					<p>
						<label>
							Your Role:{" "}
							<select name="role[]" multiple>
								<option value="leader">Leader</option>
								<option value="follower">Follower</option>
							</select>
						</label>
					</p>
					<p>
						<label>
							Message: <textarea name="message" />
						</label>
					</p>
					<p>
						<button type="submit">Send</button>
					</p>
				</form>
			</div>
		</>
	);
};

export default EventOverview;
