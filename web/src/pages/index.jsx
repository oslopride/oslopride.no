import React from "react";
import { graphql } from "gatsby";
import Page from "../templates/page";

export default function FrontPage(props) {
	return <Page {...props} />;
}

export const query = graphql`
	query SanityFrontPagesQuery {
		page: sanityFrontPage(_id: { eq: "global_front_page" }) {
			_rawBlocks
		}
	}
`;
