import React from "react";
import { RouteComponentProps } from "@reach/router";
import sanity, { isEmptyResult } from "../sanity";
import { SanityFrontPage } from "../sanity/models";
import { useSanityStore } from "../sanity/store";
import Block from "../blocks";

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
			<h2>Front Page</h2>
			{store.frontPage.blocks.no.map(block => (
				<Block key={block._key} block={block} />
			))}
		</div>
	);
};

export default FrontPage;
