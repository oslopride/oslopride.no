import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityPage } from "../sanity/models";

type Props = { slug?: string } & RouteComponentProps;

const Page: React.FC<Props> = props => {
	const { slug } = props;

	const { data: page, error } = useSWR<SanityPage>(
		`*[_type == "article" && slug.current == "${slug}"] | order(_updatedAt desc) [0]`
	);

	return (
		<>
			<h2>Article</h2>
		</>
	);
};

export default Page;
