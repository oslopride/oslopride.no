import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

export default function({ locale }) {
	const data = useStaticQuery(
		graphql`
			query SanityNavbarConfigurationQuery {
				sanityConfiguration(_id: { eq: "global_configuration" }) {
					navigation_bar {
						title {
							no
							en
						}
						slug {
							current
						}
					}
				}
			}
		`
	);

	const prefix = locale === "no" ? "/" : `/${locale}/`;

	const links = (data.sanityConfiguration.navigation_bar || []).map(page => (
		<li key={page.slug.current}>
			<Link
				to={`${prefix}${page.slug.current}`}
				aria-label={page.title[locale]}
			>
				{page.title[locale] || page.title.en}
			</Link>
		</li>
	));

	return <ul>{links}</ul>;
}
