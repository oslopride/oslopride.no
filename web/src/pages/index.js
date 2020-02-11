import React from "react";
import { graphql } from "gatsby";
import PageTemplate from "../templates/page-template";

export default function FrontPage(props) {
	return <PageTemplate {...props} />;
}

export const query = graphql`
	query SanityFrontPagesQuery {
		page: sanityFrontPage(_id: { eq: "global_front_page" }) {
			_rawBlocks
		}
		configuration: sanityConfiguration(_id: { eq: "global_configuration" }) {
			navigationBar {
				title {
					en
					no
				}
				slug {
					current
				}
			}
		}
	}
`;
