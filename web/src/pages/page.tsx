import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult, urlFor } from "../sanity";
import { SanityPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";
import Block from "../blocks";
import Hero from "../components/hero";
import { css } from "@emotion/core";

const hero = css`
	color: white;
	display: flex;
	flex-direction: column;
	padding: 0 7vw;
	text-align: center;

	h2 {
		font-size: 2.5rem;
		margin: 0 0 2rem 0;
	}

	p {
		font-size: 1rem;
		margin: 0;
	}
`;

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const [store, dispatch] = useSanityStore();
	const page = Object.values(store.pages).find(
		page => page.slug.current === props.slug
	);
	const [isLoading, setLoading] = React.useState(page === undefined);
	const [error, setError] = React.useState<false | string>(
		props.slug === undefined ? "No slug provided" : false
	);

	React.useEffect(() => {
		if (page === undefined && props.slug) {
			setError(false);
			setLoading(true);
			console.log(`*[_type == "page" && slug.current == "${props.slug}"][0]`);
			sanity
				.fetch<SanityPage>(`*[_type == "page" && slug.current == $slug][0]`, {
					slug: props.slug
				})
				.then(result => {
					console.log(result);
					if (!isEmptyResult(result)) {
						dispatch({ type: "add_page", data: result });
					}
					setLoading(false);
				});
		}
	}, [props.slug]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (page === undefined) return <div>404 - Not found</div>;

	return (
		<>
			<Hero
				angleDirection="<"
				anglePosition="after"
				height="50vh"
				color="#3a1b7b"
				imageUrl={
					urlFor(page.header.no.image)
						.width(window.innerWidth)
						.url() || ""
				}
				css={hero}
			>
				<h2>{page.header.no.title}</h2>
				<p>{page.header.no.subtitle}</p>
			</Hero>
			{page.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</>
	);
};

export default Page;
