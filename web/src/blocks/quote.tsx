import React from "react";
import { SanityQuote } from "../sanity/models";

type Props = {
	content: SanityQuote;
};

const Quote: React.FC<Props> = ({ content: { content, citation } }) => {
	return (
		<blockquote>
			{content.no}
			<cite>{citation}</cite>
		</blockquote>
	);
};

export default Quote;
