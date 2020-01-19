import React from "react";
import { usePageContext } from "../hooks/page-context";
import GatsbyLink from "gatsby-link";

export default function Link({ to, children, ...rest }) {
	const { gatsbyEnvironment } = usePageContext();

	if (gatsbyEnvironment) {
		return (
			<GatsbyLink to={to} {...rest}>
				{children}
			</GatsbyLink>
		);
	}

	return (
		<a href={to} {...rest}>
			{children}
		</a>
	);
}
