import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { urlFor } from "../sanity";
import { SanityFrontPage } from "../sanity/models";
import Hero from "../components/hero";
import SubHeading from "../components/sub-heading";
import { LinkButton } from "../components/link";
import { css } from "@emotion/core";
import useWindowSize from "../utils/use-window-size";
import theme from "../utils/theme";
import useConfig from "../utils/use-config";
import { ClientError, ServerError } from "@sanity/client";
import Advertisement from "../blocks/advertisement";

const date = css`
	font-size: 1rem;
	text-transform: uppercase;
	color: ${theme.color.background.pink};
`;

const hero = css`
	color: #ffffff;

	h2 {
		font-size: calc(2rem + 1.7vw);
		margin: 2rem 0;
	}

	p {
		font-size: 1rem;
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

type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const { width } = useWindowSize(500);
	const { data, error } = useSWR<SanityFrontPage, ClientError | ServerError>(
		`*[_id in ["global_frontPage", "drafts.global_frontPage"]] | order(_updatedAt desc) [0]`
	);
	const config = useConfig();

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (data === undefined) return <div>Loading...</div>;
	if (data === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection=">"
				anglePosition="after"
				height="100vh"
				color={theme.color.main.purple}
				imageUrl={
					urlFor(data.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				{width > 700 ? (
					<SubHeading>Oslo Pride</SubHeading>
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
			{data.callToAction && <Advertisement content={data.callToAction.no} />}
		</>
	);
};

export default FrontPage;
