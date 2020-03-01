import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult } from "../sanity";
import { SanityPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";
import Block from "../blocks";

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
			sanity
				.fetch<SanityPage>(`*[_type == "page" && slug.current == $slug][0]`, {
					slug: props.slug
				})
				.then(result => {
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
		<div>
			<h2>{page.header.no.title}</h2>
			{page.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</div>
	);
};

export default Page;
