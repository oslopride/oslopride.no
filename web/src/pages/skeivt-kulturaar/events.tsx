import React, { useCallback, useRef, useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import Hero from "../../components/hero";
import theme from "../../utils/theme";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { urlFor } from "../../sanity";
import useSWR from "swr";
import {
	SanityEventPage,
	SanitySimpleEvent,
	SanitySimpleEventList
} from "../../sanity/models";
import Loading from "../../components/loading";
import NotFound from "../not-found";
import Error from "../error";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import { ReactComponent as Location } from "../../assets/location.svg";
import linkArrow from "../../assets/link-arrow.svg";
import { Button } from "../../components/button";

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

	h3 {
		margin: 1rem 0 0 0;
		font-size: 1.5rem;
	}
`;

const EventList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 40px;
`;

const EventCard = styled.li`
	display: flex;
	flex-direction: column;
	max-width: 400px;
	flex: 1;
`;

const EventImage = styled.img`
	width: 400px;
	height: 265px;
	object-fit: cover;
`;

const EventContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px;
	background-color: ${theme.color.background.white};

	time {
		font-weight: bold;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: ${theme.color.text.grey};
	}

	h2 {
		font-weight: bold;
		font-size: 24px;
		line-height: 30px;
		color: ${theme.color.text.black};
		margin: 4px 0 0;
	}

	p {
		font-size: 14px;
		line-height: 24px;
		margin: 4px 0 0;
	}

	a:link,
	a:visited {
		margin-right: auto;
	}

	a.facebook {
		font-weight: bold;
		font-size: 16px;
		line-height: 24px;

		&::after {
			content: url(${linkArrow});
			width: 1em;
			height: 1em;
			color: ${theme.color.main.purple};
			&:hover,
			&:focus {
				color: ${theme.color.main.blue};
			}
		}
	}
`;

const TagList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin: 24px 0 0;
	gap: 8px;
	padding: 0;
`;

const Tag = styled.li`
	margin: 0;
	display: flex;
	align-items: center;
	padding: 8px 12px;
	background: ${theme.color.background.lightPurple};
	color: ${theme.color.main.purple};
	border-radius: 100px;
	font-weight: bold;
	font-size: 12px;
	line-height: 14px;
	letter-spacing: 1px;
	text-transform: uppercase;
`;

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: page, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	console.log(events);

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
			>
				<h2>{page.title.no}</h2>
				<p>{page.subtitle && page.subtitle.no}</p>
			</Hero>

			<div css={body}>
				<EventList>
					<EventCard>
						<EventImage
							src="https://via.placeholder.com/650x950"
							alt={`Event ${""}`}
						/>
						<EventContent>
							<time>time</time>
							<h2>Event name</h2>
							<p>Location</p>
							<Link to="/" className="facebook">
								Facebook link
							</Link>
							<Link to="/">Event link</Link>
							<TagList>
								<Tag>Tag</Tag>
							</TagList>
						</EventContent>
					</EventCard>
				</EventList>
			</div>
		</>
	);
};

export default EventOverview;
