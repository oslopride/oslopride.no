import React, { useCallback, useRef, useState } from "react";
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
import { ReactComponent as Location } from "../assets/location.svg";
import { Button } from "../components/button";
import { useDropzone } from "react-dropzone";

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

const paragraph = css`
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.text.black};
`;

const FormSection = styled.fieldset`
	border: none;

	& + & {
		margin-top: 1em;
	}

	small {
		color: ${theme.color.text.grey};
	}
`;

const FormSectionHeader = styled.h2`
	display: flex;
	align-items: center;
	color: ${theme.color.main.purple};
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	margin-bottom: 0;
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
	display: inline-block;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.text.black};
	margin-top: 1.5em;
	margin-bottom: 0.3em;

	&[aria-required]::after {
		content: "*";
		color: #e11029;
		margin-left: 0.25em;
	}
`;

const inputStyle = css`
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

const DropZone = styled.div`
	border: 1px dotted black;
	padding: 1em;
`;

const textareaStyle = css`
	${inputStyle};
	min-height: 8em;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 2em;

	.grid-span {
		grid-column-start: span 2;
	}
`;

const EventOverview: React.FC<Props> = () => {
	const { data: events } = useSWR<SanitySimpleEventList>(
		`*[_type == "simpleEvent"] | order(startTime asc)`
	);

	const { data: page, error } = useSWR<SanityEventPage>(
		`*[_type == "eventOverview"] | order(_updatedAt desc) [0]`
	);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const onDrop = useCallback(acceptedFiles => {
		setImageFile(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || events === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formRef.current) {
			const formData = new FormData(formRef.current);
			if (imageFile) {
				formData.set("image", imageFile, imageFile?.name);
			}

			fetch("/", {
				method: "POST",
				// typescript is dumb?
				body: new URLSearchParams(formData as any).toString()
			})
				.then(() => console.log("Submitted form"))
				.catch(error => console.log(error));
		}
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
				<form
					id="submit-skeivt-kulturaar-event"
					name="submit-skeivt-kulturaar-event"
					onSubmit={handleSubmit}
					ref={formRef}
				>
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

						<Label htmlFor="name" aria-required="true">
							Navn på arrangementet
						</Label>
						<input
							css={inputStyle}
							name="name"
							required
							placeholder="Navn på arrangementet"
						/>

						<Label htmlFor="organizer-name" aria-required="true">
							Arrangørnavn
						</Label>
						<input
							css={inputStyle}
							name="organizer-name"
							required
							placeholder="Arrangørnavn"
						/>

						<Label htmlFor="event-link">Lenke til arrangementet</Label>
						<input
							css={inputStyle}
							name="event-link"
							placeholder="URL"
							aria-describedby="event-link-help-text"
						/>
						<small id="event-link-help-text">
							Lenke til Facebook arrangement f.eks.
						</small>
					</FormSection>
					<FormSection>
						<FormSectionHeader>
							<FormSectionHeaderIcon>
								<Calendar />
							</FormSectionHeaderIcon>
							Dato og klokkeslett
						</FormSectionHeader>
						<Grid>
							<div>
								<Label htmlFor="start-date" aria-required="true">
									Startdato
								</Label>
								<input
									css={inputStyle}
									name="start-date"
									required
									type="date"
								/>
							</div>
							<div>
								<Label htmlFor="end-date" aria-required="true">
									Sluttdato
								</Label>
								<input css={inputStyle} name="end-date" required type="date" />
							</div>
							<div>
								<Label htmlFor="start-time" aria-required="true">
									Klokkeslett: starttidspunkt
								</Label>
								<input
									css={inputStyle}
									name="start-time"
									required
									type="time"
								/>
							</div>
							<div>
								<Label htmlFor="end-time" aria-required="true">
									Klokkeslett: sluttidspunkt
								</Label>
								<input css={inputStyle} name="end-time" required type="time" />
							</div>
						</Grid>
					</FormSection>
					<FormSection>
						<DropZone {...getRootProps()}>
							<input {...getInputProps({ name: "image" })} />
							{isDragActive ? (
								<p>Drop the files here ...</p>
							) : (
								<p>Drag 'n' drop some files here, or click to select files</p>
							)}
						</DropZone>
					</FormSection>
					<FormSection>
						<FormSectionHeader>
							<FormSectionHeaderIcon>
								<Location />
							</FormSectionHeaderIcon>
							Kontaktperson
						</FormSectionHeader>
						<p css={paragraph}>
							Ved spørsmål så trenger redaktør kontaktinformasjon til
							arrangement. Dette vil ikke bli synlig i kalenderen.
						</p>
						<Grid>
							<div>
								<Label htmlFor="contact-name" aria-required>
									Fullt navn
								</Label>
								<input
									css={inputStyle}
									name="contact-name"
									placeholder="Fullt navn"
									required
								/>
							</div>
							<div>
								<Label htmlFor="pronoun">Pronomen</Label>
								<input css={inputStyle} name="pronoun" placeholder="Pronomen" />
							</div>
							<div>
								<Label htmlFor="phone-number" aria-required>
									Telefonnummer
								</Label>
								<input
									css={inputStyle}
									name="phone-number"
									placeholder="Telefonnummer"
									required
								/>
							</div>
							<div>
								<Label htmlFor="contact-email">E-postaddresse</Label>
								<input
									css={inputStyle}
									name="contact-email"
									placeholder="E-postaddresse"
								/>
							</div>
							<div className="grid-span">
								<Label htmlFor="contact-info">Informasjon til redaktør</Label>
								<textarea
									css={textareaStyle}
									name="contact-info"
									placeholder="Informasjon til redaktør"
								/>
							</div>
						</Grid>
					</FormSection>
					<p>
						<Button type="submit" color="pink">
							Send inn arrangement
						</Button>
					</p>
				</form>
			</div>
		</>
	);
};

export default EventOverview;
