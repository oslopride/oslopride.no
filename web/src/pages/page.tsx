import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { SanityPage } from "../sanity";
import { isEmptyResult } from "../sanity/utils";

type State = {
	isLoading: boolean;
	page: SanityPage | null;
};

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const [state, setState] = React.useState<State>({
		isLoading: true,
		page: null
	});

	React.useEffect(() => {
		if (props.slug) {
			setState({ isLoading: true, page: null });
			const query = `*[_type == "page" && slug.current == $slug][0]`;
			sanity
				.fetch<SanityPage>(query, { slug: props.slug })
				.then(result => {
					setState(current => ({
						...current,
						isLoading: false,
						page: isEmptyResult(result) ? null : result
					}));
				});
		}
	}, [props.slug]);

	if (state.isLoading) return <div>Loading...</div>;
	if (state.page === null) return <div>Error</div>;

	return (
		<div>
			<h2>{state.page.title.no}</h2>
			<pre>{JSON.stringify(state.page.blocks)}</pre>
		</div>
	);
};

export default Page;
