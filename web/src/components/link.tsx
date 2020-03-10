import React from "react";
import { Link as RouterLink } from "@reach/router";
import {
	SanityInternalLink,
	SanityExternalLink,
	SanityPage,
	SanityFrontPage
} from "../sanity/models";
import styled from "@emotion/styled";
import { useSanityStore } from "../sanity/store";
import sanity, { isEmptyResult } from "../sanity";
import { css } from "@emotion/core";

const base = css`
	color: inherit;
`;

type Props = {
	link: SanityInternalLink | SanityExternalLink;
	className?: string;
};

const Link: React.FC<Props> = props => {
	const { link, className } = props;
	const [store, dispatch] = useSanityStore();
	const [url, setUrl] = React.useState<string | undefined>(
		link._type === "externalLink"
			? link.url
			: (store.frontPage?._id === link.url._ref && "") ||
					store.pages[link.url._ref]?.slug.current
	);

	React.useEffect(() => {
		if (link._type === "internalLink" && url === undefined) {
			sanity
				.fetch<SanityPage | SanityFrontPage>(`*[_id == $id][0]`, {
					id: link.url._ref
				})
				.then(result => {
					if (!isEmptyResult(result)) {
						if (result._type === "frontPage") {
							dispatch({ type: "set_front_page", data: result });
							setUrl("");
						} else {
							dispatch({ type: "add_page", data: result });
							setUrl(result.slug.current);
						}
					}
				});
		}
	}, [link]);

	if (url === undefined) return null;

	switch (link._type) {
		case "externalLink":
			return (
				<a className={className} css={base} href={url}>
					{link.text}
				</a>
			);
		case "internalLink":
			return (
				<RouterLink className={className} css={base} to={`/${url}`}>
					{link.text}
				</RouterLink>
			);
	}
	return null;
};

export default Link;
