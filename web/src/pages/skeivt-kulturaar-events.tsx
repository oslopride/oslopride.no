import React from "react";
import { RouteComponentProps } from "@reach/router";
import differenceInHours from "date-fns/differenceInHours";
import endOfDay from "date-fns/endOfDay";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
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
import { ReactComponent as Calendar } from "../assets/calendar.svg";

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

const FormSection = styled.fieldset`
	border: none;
`;

const FormSectionHeader = styled.h2`
	display: flex;
	align-items: center;
	color: ${theme.color.main.purple};
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
`;

const FormSectionHeaderIcon = styled.figure`
	display: inline-flex;
	align-items: center;
	width: 40px;
	height: 40px;
	background-color: ${theme.color.main.purple};
	color: white;
	justify-content: center;
	margin: 0 0.5em 0 0;
`;

const Label = styled.label`
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.text.black};

	&[aria-required]::after {
		content: "*";
		color: #e11029;
		margin-left: 0.25em;
	}
`;

const Input = styled.input`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 12px 16px;
	background-color: #eceef4;
	border-radius: 4px;
	border: 1px solid transparent;
	width: 100%;
	min-height: 60px;

	&::placeholder {
		color: ${theme.color.text.grey};
		font-size: 16px;
	}

	&:focus,
	&:active {
		border-color: ${theme.color.main.purple};
		outline: none;
	}
`;

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: page, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || events === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		console.log(event);
		const encode = (data: any) => {
			return Object.keys(data)
				.map(
					key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
				)
				.join("&");
		};

		event.preventDefault();
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

			<div css={body}>
				<form name="submit-skeivt-kulturaar-event" onSubmit={handleSubmit}>
					<input
						type="hidden"
						name="form-name"
						value="submit-skeivt-kulturaar-event"
					/>
					<FormSection>
						<FormSectionHeader>
							<FormSectionHeaderIcon>
								<Calendar />
							</FormSectionHeaderIcon>
							Arrangementinformasjon
						</FormSectionHeader>
						<p>
							<Label htmlFor="name" aria-required="true">
								Navn på arrangementet
							</Label>
							<Input name="name" required placeholder="Navn på arrangementet" />
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
					</FormSection>
					<p>
						<button type="submit">Send</button>
					</p>
				</form>
			</div>
		</>
	);
};

export default EventOverview;
