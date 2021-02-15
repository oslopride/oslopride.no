import React from "react";
import { RouteComponentProps } from "@reach/router";
import { urlFor } from "../sanity";
import { SanityPage } from "../sanity/models";
import Hero from "../components/hero";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";
import Seo from "../components/seo";
import SanityProtableText from "../components/sanity-portable-text";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

const hero = css`
	color: #ffffff;
	text-align: center;

	h2 {
		font-size: 4rem;
		margin: 0 0 2rem 0;
	}

	p {
		margin: 0;
	}
`;

const body = css`
	display: block;
	width: 90vw;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 4rem;
	padding-bottom: 5rem;

	p,
	blockquote,
	ul {
		margin-bottom: 2rem;
	}
`;

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityPage>(
		`*[_type == "page" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (page === undefined) return <Loading />;
	if (page === null) return <NotFound />;

	return (
		<>
			<Hero
				angleDirection="<"
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(page.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				textPosition="center"
				displayScrollButton
			>
				<h2>{page.header.no.title}</h2>
				<p>{page.header.no.subtitle}</p>
			</Hero>
			<div css={body}>
				{page.body?.no && <SanityProtableText blocks={page.body.no} />}
			</div>
			<Seo
				openGraph={{
					type: "website",
					title: page.header.no.title,
					description: page.header.no.subtitle,
					url: `https://www.oslopride.no/p/${slug}`,
					locale: "nb_NO",
					image: {
						url:
							urlFor(page.header.no.image)
								.width(1200)
								.url() || "",
						alt: page.header.no.subtitle
					}
				}}
			/>
		</>
	);
};

export default Page;
