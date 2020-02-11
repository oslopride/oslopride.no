import React from "react";
import { graphql } from "gatsby";
import PageTemplate from "../templates/page-template";

export default function FrontPage(props) {
	return <PageTemplate {...props} />;
}

export const query = graphql`
	query SanityFrontPagesQuery {
		page: sanityFrontPage(_id: { eq: "global_frontPage" }) {
			_rawBlocks
		}
		configuration: sanityConfiguration(_id: { eq: "global_configuration" }) {
			navigationBar: _rawNavigationBar(resolveReferences: { maxDepth: 10 })
			footer: _rawFooter(resolveReferences: { maxDepth: 10 })
			advanced: _rawAdvanced(resolveReferences: { maxDepth: 10 })
			date
		}
	}
`;
