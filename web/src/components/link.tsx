/* eslint-disable jsx-a11y/anchor-is-valid */
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
	SanityPartnerPage,
	SanityLivePage
} from "../sanity/models";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import useSWR from "swr";

const base = css`
	color: inherit;
`;

type InternalInternalLink = {
	_type: "internalInternalLink";
	url: string;
	text: string;
};

type Props = {
	link: SanityInternalLink | SanityExternalLink | InternalInternalLink;
	className?: string;
} & Omit<
	React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
	"ref"
>;

const Link: React.FC<Props> = props => {
	const { link, className, ...anchorProps } = props;
	const { data, error } = useSWR<
		| SanityPage
		| SanityFrontPage
		| SanityArchive
		| SanityArticle
		| SanityEventPage
		| SanityPartnerPage
		| SanityLivePage
	>(
		link._type === "internalLink"
			? `*[_id == "${link.url._ref}"]  | order(_updatedAt desc) [0]`
			: null
	);

	if (link._type === "externalLink") {
		return (
			<a
				className={className}
				css={base}
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				{...anchorProps}
			>
				{link.text}
			</a>
		);
	}

	if (link._type === "internalInternalLink") {
		return (
			<RouterLink
				className={className}
				css={base}
				to={link.url}
				{...anchorProps}
			>
				{link.text}
			</RouterLink>
		);
	}

	if (error) return <span>[broken link]</span>;
	if (data === null) return <span>[broken link]</span>;
	// display link text while resolving data
	if (data === undefined) {
		return (
			<a className={className} css={base} href="#" {...anchorProps}>
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
		case "live":
			url = "/live";
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
		<RouterLink className={className} css={base} to={url} {...anchorProps}>
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
	transition: color 0.3s, background 0.3s;

	:hover,
	:focus {
		color: #ffffff;
		background-color: ${theme.color.main.purple};
	}
`;

export default Link;
