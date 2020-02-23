import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useOvermind } from "../overmind";

type Props = {} & RouteComponentProps;

const FrontPage: React.FC<Props> = () => {
	const { state, actions } = useOvermind();

	React.useEffect(() => {
		if (state.frontPage === null) {
			actions.getFrontPage();
		}
	}, []);

	if (state.frontPage === null) return <div>Loading...</div>;

	return (
		<div>
			<h2>Front Page</h2>
			<pre>{JSON.stringify(state.frontPage.blocks)}</pre>
		</div>
	);
};

export default FrontPage;
