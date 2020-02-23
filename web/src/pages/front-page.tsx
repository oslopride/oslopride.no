import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult } from "../sanity";
import { SanityFrontPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";

type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const [isLoading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<null | string>(null);
	const [store, dispatch] = useSanityStore();

	React.useEffect(() => {
		if (store.frontPage === undefined) {
			setLoading(true);
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
	if (error !== null) return <div>{error}</div>;

	return (
		<div>
			<h2>Front Page</h2>
			<pre>{JSON.stringify(store.frontPage?.blocks, null, 2)}</pre>
		</div>
	);
};

export default FrontPage;
