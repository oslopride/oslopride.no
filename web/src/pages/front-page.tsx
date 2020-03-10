import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult, urlFor } from "../sanity";
import { SanityFrontPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";
import Block from "../blocks";
import Hero from "../components/hero";
import Link from "../components/link";
import { css } from "@emotion/core";

const hero = css`
	color: white;
	display: flex;
	flex-direction: column;
	padding: 0 7vw;

	span {
		text-transform: uppercase;
		font-size: 1rem;
		letter-spacing: 0.2rem;
		font-weight: 600;
	}

	h1 {
		font-size: calc(3rem + 2vw);
		margin: 2rem 0;
	}

	p {
		font-size: 1.2rem;
		margin: 0;
	}
`;

type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const [store, dispatch] = useSanityStore();
	const [isLoading, setLoading] = React.useState(store.frontPage === undefined);
	const [error, setError] = React.useState<false | string>(false);

	React.useEffect(() => {
		if (store.frontPage === undefined) {
			setLoading(true);
			setError(false);
			sanity
				.fetch<SanityFrontPage>(`*[_id == "global_frontPage"][0]`)
				.then(result => {
					if (!isEmptyResult(result)) {
						dispatch({ type: "set_front_page", data: result });
					} else {
						setError("No front page exits");
					}
					setLoading(false);
				});
		}
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!store.frontPage) return <div>404</div>;

	return (
		<div>
			<Hero
				angleDirection=">"
				anglePosition="after"
				height="100vh"
				color="#3a1b7b"
				imageUrl={
					urlFor(store.frontPage.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<span>Oslo Pride</span>
				<h1>{store.frontPage.header.no.title}</h1>
				<p>{store.frontPage.header.no.subtitle}</p>
				<ul>
					{store.frontPage.header.no.links?.map(link => (
						<li key={link._key}>
							<Link link={link} />
						</li>
					))}
				</ul>
			</Hero>
			{store.frontPage.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</div>
	);
};

export default FrontPage;
