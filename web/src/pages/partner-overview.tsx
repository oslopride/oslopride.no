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
		margin-bottom: 0;

		a {
			color: ${theme.color.main.pink};
		}
	}

	h3 {
		margin: 0;
		font-size: 1.75rem;
	}
`;

const PartnerOverview: React.FC<Props> = () => {
	const { data: partners } = useSWR<SanityPartnerList>(
		`*[_type == "partner"]{image, name, url, description, type->{name, ordinal}}`
	);

	const { data: page, error } = useSWR<SanityPartnerPage>(
		`*[_type == "partnerOverview"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (page === undefined || partners === undefined)
		return <div>Loading...</div>;
	if (page === null) return <div>404 - Not found</div>;

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
