import React from "react";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";
import { SanityPartner } from "../sanity/models";

type Props = { slug?: string } & RouteComponentProps;

const Partner: React.FC<Props> = props => {
	const { data: partner } = useSWR<SanityPartner>(
		`*[_type == "partner" && _id == "${props.slug}"] {
			_id,
			image,
			name,
			url,
			description,
			type
		}`
	);

	return <pre>{JSON.stringify(partner, null, 2)}</pre>;
};

export default Partner;
