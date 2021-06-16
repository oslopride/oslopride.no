import { css } from "@emotion/core";
import React from "react";
import { urlFor } from "../sanity";
import { SanitySimpleEvent } from "../sanity/models";
import theme from "../utils/theme";
import { LinkButton } from "./link";

const getVenueName = (venue: SanitySimpleEvent["venue"]) => {
	switch (venue) {
		case "stage1":
			return "Hovedscenen";
		case "stage2":
			return "BamseScenen";
		case "youngs":
			return "Youngs";
		case "melahuset":
			return "Melahuset";
		case "online":
			return "Digitalt";
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
	}
`;

const EventCard: React.FC<{ event: SanitySimpleEvent }> = ({ event }) => (
	<article css={style}>
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
					{new Date(event.startTime).toLocaleTimeString("nb-NO", {
						hour: "2-digit",
						minute: "2-digit"
					})}
					{event.venue ? `, ${getVenueName(event.venue)}` : ""}
				</time>
				{getArenaName(event.arena) && (
					<span className="tag">{getArenaName(event.arena)}</span>
				)}
			</div>
			<h3>{event.title.no}</h3>
			<ul>
				{event.liveStream && <li className="tag">strømmes</li>}
				{event.alcoholFree && <li className="tag">rusfritt</li>}
				{event.wheelchairFriendly && <li className="tag">rullestolvennlig</li>}
				{event.signLanguageInterpreted && (
					<li className="tag">tegnspråktolket</li>
				)}
			</ul>
			<LinkButton
				link={{
					_type: "internalInternalLink",
					text: "Se detaljer",
					url: `/event/${event.slug.current}`
				}}
			/>
		</div>
	</article>
);

export default EventCard;
