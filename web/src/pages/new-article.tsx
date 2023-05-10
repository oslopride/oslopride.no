import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityNewArticle } from "../sanity/models";
import Loading from "../components/loading";
import NotFound from "./not-found";
import Error from "./error";

type Props = { slug?: string } & RouteComponentProps;

const NewArticle: React.FC<Props> = () => {
	// const { slug } = props;

	const { data: article, error } = useSWR<SanityNewArticle>(
		`*[_type == "newArticle"][0]{...}`
	);
	console.log("new article ", article);

	if (error) return <Error error={JSON.stringify(error)} />;
	if (article === undefined) return <Loading />;
	if (article === null) return <NotFound />;

	return (
		<div>
			<h1>New Article</h1>
		</div>
	);
};

export default NewArticle;
