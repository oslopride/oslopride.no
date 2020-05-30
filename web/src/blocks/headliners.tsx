import React from "react";
import {
	Locale,
	SanityObject,
	SanityObjectArray,
	SanitySimpleEvent
} from "../sanity/models";
import SubHeading from "../components/sub-heading";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import BlockContentToReact from "@sanity/block-content-to-react";
import { LinkButton } from "../components/link";

type EventCardProps = {
	content: SanitySimpleEvent;
};

type Props = {
	content: Locale<
		SanityObjectArray<
			SanityObject<
				"headliner",
				{
					title?: string;
					subtitle?: string;
				}
			>
		>
	>;
	featuredEvents: SanityObjectArray<SanitySimpleEvent>;
};

const lineCss = css`
	margin: 2rem 0;
`;

const buttonCenter = css`
	margin: 90px 0;
`;

const headlinersContainer = () => css`
	text-align: center;
	margin-bottom: 125px;
`;

const headlinersStyle = (hasAttachedEvents: boolean) => css`
	position: relative;
	z-index: -2;
	margin-top: -400px;
	padding-top: 400px;
	padding-bottom: ${hasAttachedEvents ? "250px" : "100px"};
	background-color: #3a1b7b;
	text-align: center;
	color: white;

	h2 {
		font-size: 3rem;
		line-height: 3.5rem;
		margin: 1rem 0;
	}

	p {
		font-size: 1rem;
		line-height: 1.75rem;
		margin: 1rem 0;
	}
`;

const featuredEventsContainer = () => css`
	max-width: 1200px;
	margin: -200px 1rem 3rem 1rem;

	@media (min-width: 600px) {
		margin: -200px auto 5rem auto;
		display: flex;
		flex-flow: row wrap;
	}
	align-content: flex-start;
	justify-content: space-between;
`;

const eventItem = css`
	text-align: left;
	margin: 1rem 0;
	@media (min-width: 600px) {
		margin: 1rem;
		flex: 0.5 1 0px;
	}
	display: flex;
	flex-direction: column;
	background-color: #f7f8fa;
	min-height: 330px;
`;

const image = (image: string) => css`
	height: 200px;
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;

	@media (min-width: 600px) {
		height: 220px;
	}
	background-image: url(${image});
	background-size: cover;
	background-position: center center;
`;

const eventBody = css`
	padding: 1.5rem;
	flex-grow: 1;

	h3 {
		margin: 0;
	}

	p {
		font-size: 1rem;
	}
`;

const SimpleEventCard: React.FC<EventCardProps> = props => {
	const { content } = props;

	return (
		<article css={eventItem} key={content._id}>
			<div
				css={image(
					urlFor(content.image)
						.width(window.innerWidth)
						.url() || ""
				)}
			/>
			<div css={eventBody}>
				<h3>{content.title.no}</h3>
				<BlockContentToReact blocks={content.description.no} />
			</div>
		</article>
	);
};

const Headliners: React.FC<Props> = props => {
	const { content, featuredEvents } = props;

	const hasFeaturedEvents = !!featuredEvents?.length;

	return (
		<div css={headlinersContainer}>
			<section css={headlinersStyle(hasFeaturedEvents)}>
				{content.no.map((item, _idx) => (
					<article key={_idx}>
						<h2>{item.title}</h2>
						<p>{item.subtitle}</p>
						{_idx + 1 < content.no.length && (
							<SubHeading css={lineCss} line="line-only" />
						)}
					</article>
				))}
			</section>

			{hasFeaturedEvents && (
				<>
					<div css={featuredEventsContainer}>
						{featuredEvents.map((event, _idx) => (
							<SimpleEventCard key={_idx} content={event} />
						))}
					</div>

					<LinkButton
						css={buttonCenter}
						link={{
							_type: "externalLink",
							text: "Se alle arrangementer",
							url: "/events"
						}}
					/>
				</>
			)}
		</div>
	);
};

export default Headliners;
