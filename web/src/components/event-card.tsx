import { css } from "@emotion/core";
import React from "react";
import { urlFor } from "../sanity";
import { SanitySimpleEvent } from "../sanity/models";
import theme from "../utils/theme";
import Link from "./link";

const getVenueName = (venue: SanitySimpleEvent["venue"]) => {
	switch (venue) {
		case "stage1":
			return "Hovedscenen";
		case "stage2":
			return "BamseScenen";
		case "kultur":
			return "Kulturhuset";
		case "loudproud":
			return "Loud ‘n’ Proud";
		case "box":
			return "Pride Box";
		case "online":
			return "Digitalt";
		case "youngs":
			return "Youngs";
		case "minipride":
			return "Mini Pride";
		default:
			return "Annet";
	}
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

const style = css`
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
		height: 270px;
	}

	img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.external {
		text-align: center;
		padding: 0.5em;
		background: ${theme.color.background.lightYellow};
		font-weight: bold;
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
				<img
					src={
						urlFor(event.image)
							.width(500)
							.url() || ""
					}
					alt={event.title.no}
				/>
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
				<p className="eventLocation">{getArenaName(event.arena)}</p>
				<span className="tag">{event.category}</span>
			</div>
		</article>
	);
};

export default EventCard;
