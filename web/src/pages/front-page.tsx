import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { SanityFrontPage } from "../sanity";
import { isEmptyResult } from "../sanity/utils";

type State = {
	isLoading: boolean;
	page: SanityFrontPage | null;
};
type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const [state, setState] = React.useState<State>({
		isLoading: true,
		page: null
	});

	React.useEffect(() => {
		const query = `*[_id == "global_frontPage"][0]`;
		sanity.fetch<SanityFrontPage>(query).then(result => {
			setState(current => ({
				...current,
				isLoading: false,
				page: isEmptyResult(result) ? null : result
			}));
		});
	}, []);

	if (state.isLoading) return <div>Loading...</div>;
	if (state.page === null) return <div>Error</div>;

	return (
		<div>
			<h2>Front Page</h2>
			<pre>{JSON.stringify(state.page.blocks)}</pre>
		</div>
	);
};

export default FrontPage;
