import React from "react";
import { RouteComponentProps } from "@reach/router";
import Hero from "../components/hero";
import theme from "../utils/theme";
import { css } from "@emotion/core";
import { urlFor } from "../sanity";
import useSWR from "swr";
import { SanityPartnerList, SanityPartnerPage } from "../sanity/models";
import Seo from "../components/seo";
import PartnerList from "../blocks/partner-list";
import SubHeading from "../components/sub-heading";
import BlockContentToReact from "@sanity/block-content-to-react";
import { LinkButton } from "../components/link";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

type Props = { slug?: string } & RouteComponentProps;

const hero = css`
	color: #ffffff;
	text-align: center;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 2rem 0;
	}

	p {
		font-size: 1.1rem;
		margin: 0;
	}
`;

const body = css`
	display: block;
	margin: 100px auto;
	width: 90vw;
	max-width: 900px;

	p {
		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 0;
		font-size: 1.75rem;
	}
`;

const callToActionStyle = css`
	text-align: center;
	margin: 0 5vw;

	h2 {
		margin: 2rem 0;
	}
`;

const linkButtonWrapper = css`
	display: block;
	padding: 2rem;
`;

const PartnerOverview: React.FC<Props> = () => {
	const { data: partners } = useSWR<SanityPartnerList>(
		`*[_type == "partner"]{image, name, url, description, type->{name, ordinal}}`
	);

	const { data: page, error } = useSWR<SanityPartnerPage>(
		`*[_type == "partnerOverview"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined || partners === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="400px"
				color={[theme.color.main.pink, theme.color.main.blue]}
				imageUrl={
					urlFor(page.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				textPosition="center"
			>
				<h2>{page.title.no}</h2>
				<p>{page.subtitle && page.subtitle.no}</p>
			</Hero>

			<div css={body}>
				<PartnerList content={partners} />

				{page.callToAction && page.callToAction.no && (
					<div css={callToActionStyle}>
						<SubHeading color={theme.color.main.pink} line="both">
							{page.callToAction.no.title}
						</SubHeading>
						<h2>{page.callToAction.no.subtitle}</h2>
						{page.callToAction.no.description && (
							<BlockContentToReact blocks={page.callToAction.no.description} />
						)}
						{page.callToAction.no.link && (
							<div css={linkButtonWrapper}>
								<LinkButton link={page.callToAction.no.link} />
							</div>
						)}
					</div>
				)}
			</div>

			<Seo
				openGraph={{
					type: "website",
					title: page.title.no,
					description: page.subtitle?.no,
					url: `https://www.oslopride.no/partners`,
					locale: "nb_NO",
					image: {
						url:
							urlFor(page.image)
								.width(1200)
								.url() || "",
						alt: page.subtitle ? page.subtitle.no : ""
					}
				}}
			/>
		</>
	);
};

export default PartnerOverview;
