import React from "react";
import { RouteComponentProps } from "@reach/router";
import { urlFor } from "../sanity";
import { SanityPage } from "../sanity/models";
import Block from "../blocks";
import Hero from "../components/hero";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";
import Seo from "../components/seo";

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
	margin: 5vh auto 3rem auto;
	width: 90vw;
	max-width: 900px;

	p {
		font-size: 1.1rem;
		margin: 0;
	}
`;

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityPage>(
		`*[_type == "page" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	if (error) return <div>{JSON.stringify(error)}</div>;
	if (page === undefined) return <div>Loading...</div>;
	if (page === null) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="500px"
				color={[theme.color.main.purple]}
				imageUrl={
					urlFor(page.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
				textPosition="center"
			>
				<h2>{page.header.no.title}</h2>
				<p>{page.header.no.subtitle}</p>
			</Hero>
			<div css={body}>
				{page.blocks.no.map(block => (
					<Block key={block._key} block={block} />
				))}
			</div>
			{page.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
			<Seo
				openGraph={{
					type: "website",
					title: page.header.no.title,
					description: page.header.no.subtitle,
					url: `https://www.oslopride.no/${slug}`,
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
