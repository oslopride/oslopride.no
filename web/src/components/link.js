import React from "react";
import { usePageContext } from "../hooks/page-context";
import GatsbyLink from "gatsby-link";

export default function Link({ to, children, ...rest }) {
	// const [LinkComponent, setLinkComponent] = React.useState("a");
	const { gatsbyEnvironment } = usePageContext();

	// React.useEffect(() => {
	// 	if (gatsbyEnvironment) {
	// 		import("gatsby-link").then(({ Link }) => {
	// 			setLinkComponent(Link);
	// 		});
	// 	}
	// }, [gatsbyEnvironment]);

	// let props = {};

	// if (LinkComponent !== "a") {
	// 	props = { to: href, ...rest };
	// } else {
	// 	props = { href, ...rest };
	//

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
