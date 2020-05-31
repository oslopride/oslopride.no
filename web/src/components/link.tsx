import React from "react";
import { Link as RouterLink } from "@reach/router";
import {
	SanityInternalLink,
	SanityExternalLink,
	SanityPage,
	SanityFrontPage,
	SanityArchive,
	SanityArticle,
	SanityEventPage,
	SanityPartnerPage
} from "../sanity/models";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";

const base = css`
	color: inherit;
`;

type Props = {
	link: SanityInternalLink | SanityExternalLink;
	className?: string;
};

const Link: React.FC<Props> = props => {
	const { link, className } = props;
	const { data, error } = useSWR<
		| SanityPage
		| SanityFrontPage
		| SanityArchive
		| SanityArticle
		| SanityEventPage
		| SanityPartnerPage
	>(
		link._type === "internalLink"
			? `*[_id == "${link.url._ref}"]  | order(_updatedAt desc) [0]`
			: null
	);

	if (link._type === "externalLink") {
		return (
			<a className={className} css={base} href={link.url}>
				{link.text}
			</a>
		);
	}

	if (error) return <span>[broken link]</span>;
	if (data === null) return <span>[broken link]</span>;
	if (data === undefined) {
		return (
			<a className={className} css={base} href="#">
				{link.text}
			</a>
		);
	}

	let url = "#";

	switch (data._type) {
		case "frontPage":
			url = "/";
			break;
		case "articleArchive":
			url = "/articles";
			break;
		case "eventOverview":
			url = "/events";
			break;
		case "partnerOverview":
			url = "/partners";
			break;
		case "page":
			url = `/p/${data.slug.current}`;
			break;
		case "article":
			url = `/a/${data.slug.current}`;
			break;
	}

	return (
		<RouterLink className={className} css={base} to={url}>
			{link.text}
		</RouterLink>
	);
};

type LinkButtonProps = {
	color?: "blue" | "pink";
};

export const LinkButton = styled(Link)<LinkButtonProps>`
	background-color: ${props =>
		props.color === "pink" ? theme.color.main.pink : theme.color.main.blue};
	text-transform: uppercase;
	text-align: center;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1rem 1.75rem;
	text-decoration: none;
	cursor: pointer;
	border-radius: 4px;
	color: ${props => (props.color === "pink" ? "#2b193c" : "#ffffff")};
	font-weight: bold;
	font-size: 1rem;
	transition: color 0.3s, background 0.3s;

	:hover {
		color: #ffffff;
		background-color: ${theme.color.main.purple};
	}
`;

export default Link;
