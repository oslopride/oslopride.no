import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult } from "../sanity";
import { SanityPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const [isLoading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<null | string>(null);
	const [store, dispatch] = useSanityStore();

	const page = Object.values(store.pages).find(
		page => page.slug.current === props.slug
	);

	React.useEffect(() => {
		if (page === undefined && props.slug) {
			setLoading(true);
			sanity
				.fetch<SanityPage>(`*[_type == "page" && slug.current == $slug][0]`, {
					slug: props.slug
				})
				.then(result => {
					if (!isEmptyResult(result)) {
						dispatch({ type: "add_page", data: result });
					} else {
						setError(`Cannot find any page with slug "${props.slug}"`);
					}
					setLoading(false);
				});
		}
	}, [props.slug]);

	if (isLoading) return <div>Loading...</div>;
	if (error !== null) return <div>{error}</div>;

	return (
		<div>
			<h2>{page?.title.no}</h2>
			<pre>{JSON.stringify(page?.blocks, null, 2)}</pre>
		</div>
	);
};

export default Page;
