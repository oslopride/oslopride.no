import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import { PageProvider } from "../hooks/page-context";
import Layout from "../components/layout";

export default function PageTemplate({ data, pageContext }) {
	const { page, configuration } = data;
	const { locale } = pageContext;
	const baseUrl = locale === "no" ? "/" : `/${locale}/`;
	const blocks = page._rawBlocks[locale] || [];
	const context = { locale, baseUrl, configuration, gatsbyEnvironment: true };

	return (
		<PageProvider context={context}>
			<Layout>
				<Page blocks={blocks} />
			</Layout>
		</PageProvider>
	);
}

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		page: sanityPage(id: { eq: $id }) {
			_rawBlocks(resolveReferences: { maxDepth: 10 })
		}
		configuration: sanityConfiguration(_id: { eq: "global_configuration" }) {
			navigation_bar {
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
