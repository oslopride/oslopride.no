import React from "react";
import { Link as RouterLink } from "@reach/router";
import { SanityInternalLink, SanityExternalLink } from "../sanity/models";

type Props = {
	link: SanityInternalLink | SanityExternalLink;
};

const Link: React.FC<Props> = props => {
	const { link } = props;

	switch (link._type) {
		case "externalLink":
			return <a href={link.url}>{link.text}</a>;
		case "internalLink":
			switch (link.url._type) {
				case "page":
					return <RouterLink to={`/${link.url.slug}`}>{link.text}</RouterLink>;
				case "frontPage":
					return <RouterLink to="/">{link.text}</RouterLink>;
			}
	}
	return null;
};

export default Link;
