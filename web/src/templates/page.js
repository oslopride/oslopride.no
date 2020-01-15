import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../blocks/hero";
import Image from "../blocks/image";

export default function Page({ data: { page }, pageContext: { locale } }) {
	const blocks = (page._rawBlocks[locale] || []).map(block => {
		switch (block._type) {
			case "hero":
				return <Hero key={block._key} {...block} />;
			default:
				console.warn(`Unknown block type: "${block._type}"`);
				if (process.env.NODE_ENV !== "production") {
					return <pre key={block._key}>{JSON.stringify(block, null, 2)}</pre>;
				}
				return null;
		}
	});
	return <Layout locale={locale}>{blocks}</Layout>;
}

export const query = graphql`
	query PageTemplateQuery($id: String!) {
		page: sanityPage(id: { eq: $id }) {
			_rawBlocks(resolveReferences: { maxDepth: 10 })
		}
	}
`;
