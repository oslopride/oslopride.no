import React from "react";
import { css } from "@emotion/core";
import useSWR from "swr";

import sanity from "../sanity";
import { SanityPartnerPreview, SanityPartner } from "../sanity/models";
import theme from "../utils/theme";

type Props = {
	content: SanityPartnerPreview;
};

const PartnerPreview: React.FC<Props> = ({ content: { partners } }) => {
	const refList = partners.map(ref => ref._ref);
	const { data, error } = useSWR<SanityPartner[]>(
		`*[_id in ${JSON.stringify(refList)}]`,
		query => sanity.fetch(query)
	);
	console.log(data);

	return (
		<div
			css={css`
				padding: 15px;
			`}
		>
			<h2>2</h2>
			<h2>1</h2>
		</div>
	);
};

export default PartnerPreview;
