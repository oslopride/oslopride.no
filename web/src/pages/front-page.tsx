import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { urlFor } from "../sanity";
import { DereferencedSanityPartner, SanityFrontPage } from "../sanity/models";
import Hero from "../components/hero";
import SubHeading from "../components/sub-heading";
import { LinkButton } from "../components/link";
import { css } from "@emotion/core";
import useWindowSize from "../utils/use-window-size";
import theme from "../utils/theme";
import useConfig from "../utils/use-config";
import { ClientError, ServerError } from "@sanity/client";
import Advertisement from "../blocks/advertisement";
import FeaturedArticles from "../blocks/featured-articles";
import Seo from "../components/seo";
import PartnerPreview from "../blocks/partner-preview";
import Headliners from "../blocks/headliners";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";
import SanityPortableText from "../components/sanity-portable-text";

const date = css`
	font-size: 1rem;
	text-transform: uppercase;
	color: ${theme.color.background.pink};
`;

const hero = css`
	h2 {
		line-height: 3.5rem;
		margin: 2rem 0;
	}

	p {
		margin: 0;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin: 1rem 0;
		padding: 0;

		@media (min-width: 600px) {
			flex-direction: row;

			li:not(:first-of-type) {
				margin-left: 1rem;
			}
		}

		li {
			display: inherit;
			margin-top: 1rem;
		}
	}
`;

const body = css`
	margin: 5vh auto 3rem auto;
	width: 90vw;
	max-width: 1200px;

	p {
		margin: 0;
	}
`;

type Props = {} & RouteComponentProps;

type SanityQueryResult = SanityFrontPage & {
	partners: DereferencedSanityPartner[];
};

const FrontPage: React.FC<Props> = () => {
	const { width } = useWindowSize(500);
	const { data, error } = useSWR<SanityQueryResult, ClientError | ServerError>(
		`*[_id in ["global_frontPage", "drafts.global_frontPage"]] | order(_updatedAt desc) [0]
		{...,
		featuredArticles[]->{image, slug, title, _createdAt},
		featuredEvents[]->{image, title, description, startTime, endTime, eventLink},
		"partners": *[_type == "partner"]{image, name, url, type->{name, ordinal}}
		}`
	);
	const config = useConfig();

	if (error) return <Error error={JSON.stringify(error)} />;
	if (data === undefined) return <Loading />;
	if (data === null) return <NotFound />;

	return (
		<>
			<Hero
				height="720px"
				color={[theme.color.main.purple, theme.color.main.pink]}
				imageUrl={
					urlFor(data.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				{width > 700 ? (
					<SubHeading>{data.header.no.subHeading}</SubHeading>
				) : (
					<h1 css={date}>{config?.date}</h1>
				)}
				<h2>{data.header.no.title}</h2>
				<p>{data.header.no.subtitle}</p>
				<ul>
					{data.header.no.links?.map((link, idx) => (
						<li key={link._key}>
							<LinkButton
								link={link}
								color={idx === 0 ? "pink" : "blue"}
								css={css`
									width: 100%;
								`}
							/>
						</li>
					))}
				</ul>
			</Hero>
			<div css={body}>
				{data.body?.no && <SanityPortableText blocks={data.body.no} />}
			</div>
			{data.headliners?.no?.length > 0 && (
				<Headliners
					content={data.headliners}
					featuredEvents={data.featuredEvents}
				/>
			)}
			{data.callToAction && <Advertisement content={data.callToAction.no} />}
			<div css={body}>
				{data.featuredArticles && (
					<FeaturedArticles content={data.featuredArticles} />
				)}
			</div>
			{data.partners && <PartnerPreview content={data.partners} />}
			<Seo
				openGraph={{
					title: "Hjem",
					description: data.header.no.subtitle,
					image: {
						url:
							urlFor(data.header.no.image)
								.width(1200)
								.url() || "",
						alt: data.header.no.subtitle
					},
					locale: "nb_NO",
					type: "website",
					url: "https://www.oslopride.no"
				}}
			/>
		</>
	);
};

export default FrontPage;
