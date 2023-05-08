import { css } from "@emotion/core";
import React from "react";
import { urlFor } from "../sanity";
import { SanitySimpleEvent } from "../sanity/models";
import theme from "../utils/theme";
import Link from "./link";
import { MdLocationPin } from "react-icons/md";

const EVENT_CATEGORIES = {
	concert: "Konsert",
	debate: "Debatt",
	talk: "Samtale",
	lecture: "Foredrag",
	workshop: "Workshop",
	party: "Fest",
	dans: "Dans",
	performance: "Performance",
	teater: "Teater",
	drag: "Drag",
	children: "Aktivitet for barn/unge",
	other: "Annet"
};

const getArenaName = (arena: SanitySimpleEvent["arena"]) => {
	switch (arena) {
		case "park":
			return "Pride Park";
		case "house":
			return "Pride House";
		case "parade":
			return "Pride Parade";
		case "salt":
			return "Salt";
		case "minipride":
			return "Mini Pride";
		default:
			return undefined;
	}
};

const style = css`
	width: 100%;
	height: 100%;
	max-width: 500px;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	.imageWrapper {
		padding-bottom: 56.2%;
		position: relative;
		height: 270px;
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

	.time {
		color: ${theme.color.text.grey};
		font-weight: 700;
		letter-spacing: 2px;
		text-transform: uppercase;
		font-size: 0.8rem;
	}

	h3,
	h3 a:link,
	h3 a:visited {
		font-size: 1.3rem;
		line-height: 1.4;
		font-weight: 700;
		color: #40147e;
		margin-top: 8px;
		text-decoration: none;
	}

	.eventLocation {
		font-size: 0.9rem;
		color: ${theme.color.text.black};
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 8px 0 0;
	}

	.tag {
		padding: 8px 16px;
		background: #bee0d6;
		border-radius: 50px;
		font-size: 0.8rem;
		line-height: 1.2;
		font-weight: 700;
		letter-spacing: 1px;
		text-transform: uppercase;
		align-self: flex-start;
		margin-top: 16px;
	}
`;

const EventCard: React.FC<{ event: SanitySimpleEvent }> = ({ event }) => {
	const eventDate = new Date(event.startTime);
	const eventDateFormatted = eventDate.toLocaleDateString("nb-NO", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	const timeFormatted = eventDate.toLocaleTimeString("nb-NO", {
		hour: "2-digit",
		minute: "2-digit"
	});
	const dateFormatted = `${eventDateFormatted} - kl. ${timeFormatted}`;
	return (
		<article css={style}>
			<div className="imageWrapper">
				<Link
					link={{
						_type: "internalInternalLink",
						url: `/event/${event.slug.current}`
					}}
				>
					<img
						src={
							urlFor(event.image)
								.width(500)
								.url() || ""
						}
						alt={event.title.no}
					/>
				</Link>
			</div>
			<div className="contentWrapper">
				<time dateTime={event.startTime} className="time">
					{dateFormatted}
				</time>
				<h3>
					<Link
						link={{
							_type: "internalInternalLink",
							url: `/event/${event.slug.current}`
						}}
					>
						{event.title.no}
					</Link>
				</h3>
				{getArenaName(event.arena) && (
					<p className="eventLocation">
						<MdLocationPin />
						{getArenaName(event.arena)}
					</p>
				)}
				<span className="tag">{EVENT_CATEGORIES[event.category]}</span>
			</div>
		</article>
	);
};

export default EventCard;
