import React from "react";
// Hack to not make sanity break when importing the component
// See: https://github.com/gatsbyjs/gatsby/issues/10668
import Link from "gatsby-link";

export default function Anchor({ _type, text, url }) {
	switch (_type) {
		case "external_link":
			return (
				<a href={url} target="_blank" rel="noopener noreferrer">
					{text}
				</a>
			);
		case "internal_link":
			return <Link to={`/${url.slug.current || "404"}`}>{text}</Link>;
	}
}
