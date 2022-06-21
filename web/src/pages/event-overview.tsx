import React, { useMemo, useRef, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import ReactDatePicker, {
	registerLocale,
	setDefaultLocale
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import nb from "date-fns/locale/nb";
import {
	SanityEventPage,
	SanitySimpleEvent,
	SanitySimpleEventList
} from "../sanity/models";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import EventCard from "../components/event-card";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import "dayjs/locale/nb";
import { MdClose } from "react-icons/md";
import { MultiSelect } from "../components/multiselect";

registerLocale("nb", nb);
setDefaultLocale("nb");

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

const activeFilterList = css`
	width: 95vw;
	max-width: 1200px;
	list-style-type: none;
	padding: 0;
	gap: 12px;
	min-height: 40px;
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin: 0 0 40px;
`;

const body = css`
	margin: 5vh auto 3rem auto;
	width: 95vw;
	max-width: 1250px;

	@media (min-width: 800px) {
		width: 90vw;
	}

	a {
		color: ${theme.color.main.pink};
	}

	h3 {
		margin: 1rem 0 0 0;
		font-size: 1.5rem;
	}
`;

const eventsShownCount = css`
	text-align: center;
	color: ${theme.color.text.black};
	font-weight: 700;
	font-size: 1rem;
`;

const eventList = css`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	gap: 48px 32px;
	list-style-type: none;
	margin: 0;
	padding: 0;

	@media (min-width: 650px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	& > li {
		width: 100%;
		display: flex;
		justify-content: center;
	}
`;

const removeFilterTag = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 16px;
	gap: 8px;
	background-color: ${theme.color.main.purple};
	border-radius: 100px;
	color: #e6ddef;
	line-height: 20px;
	font-size: 16px;
	font-weight: 500;
	border: 0;
	cursor: pointer;

	svg {
		height: 1.2rem;
		width: 1.2rem;
	}
`;

const filter = css`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	margin: 6rem 0 1rem;
	max-width: 1000px;

	@media (min-width: 650px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 900px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`;

const datePicker = css`
	.react-datepicker {
		border: none;
		border-radius: 0;
		background-color: #e6ddef;
	}

	.react-datepicker__header {
		background-color: #c5b6d5;
	}

	.react-datepicker__day {
		font-weight: 600;

		&:not([aria-disabled="true"]):hover {
			background-color: #c5b6d5;
		}
	}

	.react-datepicker__day--keyboard-selected {
		background-color: #c5b6d5;
		color: ${theme.color.text.black};
	}

	.react-datepicker__day--disabled {
		color: ${theme.color.text.grey};
		font-weight: 400;
	}
`;

const filterInput = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #e6ddef;
	border: none;
	cursor: pointer;
	font-weight: 700;
	font-size: 0.9rem;

	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
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
	},
	{
		value: "minipride",
		label: "Mini Pride",
		predicate: event => event.arena === "minipride"
	},
	{
		value: "external",
		label: "Ekstern",
		predicate: event => event.arena === "external"
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

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [dateIsOpen, setDateIsOpen] = useState(false);
	const dateBtnRef = useRef<HTMLButtonElement>(null);

	const handleDateChange = (date: Date | null) => {
		setDateIsOpen(false);
		setSelectedDate(date);
	};

	const handleDateClick: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		setDateIsOpen(prev => !prev);
	};

	const removeFilter = (
		setFn: React.Dispatch<React.SetStateAction<Filter[]>>,
		label: string
	) => {
		setFn(prev => prev.filter(item => item.label !== label));
	};

	const handleOutsideDateClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		// avoid closing and opening when clicking button
		if (
			e.target !== dateBtnRef.current &&
			!dateBtnRef.current?.contains(e.target as Node)
		) {
			setDateIsOpen(false);
		}
	};

	const [selectedArenaFilters, setArenaFilters] = React.useState<Filter[]>([]);
	const [selectedCategoryFilters, setCategoryFilters] = React.useState<
		Filter[]
	>([]);
	const [
		selectedAccessibilityFilters,
		setAccessibilityFilters
	] = React.useState<Filter[]>([]);

	const [showOldEvents, setShowOldEvents] = React.useState(false);

	const thisYearsEvents = useMemo(() => {
		let thisYearsEvents: SanitySimpleEventList = [];
		if (events) {
			// just filter out old events by checking if the end time is before now.
			const now = new Date();
			thisYearsEvents = events.filter(event => {
				const eventEnd = new Date(event.endTime);
				return isBefore(eventEnd, now);
			});
		}
		return thisYearsEvents;
	}, [events]);

	const [minDate, maxDate] = useMemo(() => {
		let minDate = new Date();
		let maxDate = new Date();
		for (const event of thisYearsEvents) {
			const eventDate = new Date(event.startTime);
			if (isBefore(eventDate, minDate)) {
				minDate = eventDate;
			}
			if (isAfter(eventDate, minDate)) {
				maxDate = eventDate;
			}
		}
		return [minDate, maxDate];
	}, [thisYearsEvents]);

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

	const filteredEvents = useMemo(() => {
		const eventsToFilterFrom = showOldEvents
			? [...thisYearsEvents, ...oldEvents]
			: thisYearsEvents;

		return eventsToFilterFrom.filter(e => {
			const eventDate = new Date(e.startTime);
			return (
				(selectedDate ? isSameDay(selectedDate, eventDate) : true) &&
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
	}, [
		thisYearsEvents,
		oldEvents,
		selectedArenaFilters,
		selectedAccessibilityFilters,
		selectedCategoryFilters,
		selectedDate,
		showOldEvents
	]);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || events === undefined) return <Loading />;
	if (page === null) return <NotFound />;

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
				displayScrollButton
			>
				<h2>{page.title.no}</h2>
				<p>{page.subtitle && page.subtitle.no}</p>
			</Hero>
			<div css={body}>
				<section css={filter}>
					<div css={datePicker}>
						<button
							css={filterInput}
							onClick={handleDateClick}
							ref={dateBtnRef}
						>
							Dato <BiCalendar />
						</button>
						{dateIsOpen && (
							<div style={{ position: "absolute", zIndex: 3 }}>
								<ReactDatePicker
									onChange={handleDateChange}
									minDate={minDate}
									maxDate={maxDate}
									selected={selectedDate}
									showPopperArrow={false}
									inline
									onClickOutside={handleOutsideDateClick}
									onSelect={() => setDateIsOpen(false)}
								/>
							</div>
						)}
					</div>
					<MultiSelect
						items={arenaFilters}
						selectedItems={selectedArenaFilters}
						onChange={items => items && setArenaFilters(items)}
						placeholder="Arena"
					/>
					<MultiSelect
						items={categoryFilters}
						selectedItems={selectedCategoryFilters}
						onChange={items => items && setCategoryFilters(items)}
						placeholder="Programtype"
					/>
					<MultiSelect
						items={accessibilityFilters}
						selectedItems={selectedAccessibilityFilters}
						onChange={items => items && setAccessibilityFilters(items)}
						placeholder="Tilgjengelighet"
					/>
				</section>
				<ul css={activeFilterList}>
					{selectedDate && (
						<li>
							<button
								css={removeFilterTag}
								onClick={() => setSelectedDate(null)}
							>
								<MdClose />
								{selectedDate.toLocaleDateString("nb-NO", {
									day: "2-digit",
									month: "long"
								})}
							</button>
						</li>
					)}
					{selectedArenaFilters.map(filter => (
						<li key={filter.label}>
							<button
								css={removeFilterTag}
								onClick={() => removeFilter(setArenaFilters, filter.label)}
							>
								<MdClose />
								{filter.label}
							</button>
						</li>
					))}
					{selectedCategoryFilters.map(filter => (
						<li key={filter.label}>
							<button
								css={removeFilterTag}
								onClick={() => removeFilter(setCategoryFilters, filter.label)}
							>
								<MdClose />
								{filter.label}
							</button>
						</li>
					))}
					{selectedAccessibilityFilters.map(filter => (
						<li key={filter.label}>
							<button
								css={removeFilterTag}
								onClick={() =>
									removeFilter(setAccessibilityFilters, filter.label)
								}
							>
								<MdClose />
								{filter.label}
							</button>
						</li>
					))}
				</ul>
				{thisYearsEvents.length > 0 && (
					<p css={eventsShownCount}>
						Viser {filteredEvents.length} av {thisYearsEvents.length}{" "}
						arrangement
					</p>
				)}
				{filteredEvents.length > 0 && (
					<ul css={eventList}>
						{filteredEvents.map(event => (
							<li key={event._id}>
								<EventCard event={event} />
							</li>
						))}
					</ul>
				)}
				{thisYearsEvents.length === 0 && <p>Ingen eventer enda</p>}
			</div>
		</>
	);
};

export default EventOverview;
