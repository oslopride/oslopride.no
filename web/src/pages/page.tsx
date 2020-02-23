import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useOvermind } from "../overmind";

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const { state, actions } = useOvermind();

	React.useEffect(() => {
		if (props.slug) {
			actions.setCurrentPage(props.slug);
		}
	}, [props.slug]);

	if (state.currentPage === null) {
		if (state.isLoadingCurrentPage) return <div>Loading...</div>;
		return <div>Error</div>;
	}

	return (
		<div>
			<h2>{state.currentPage.title.no}</h2>
			<pre>{JSON.stringify(state.currentPage.blocks)}</pre>
		</div>
	);
};

export default Page;
