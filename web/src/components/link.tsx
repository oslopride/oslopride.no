import React from "react";
import { Link as RouterLink } from "@reach/router";
import {
	SanityInternalLink,
	SanityExternalLink,
	SanityPage,
	SanityFrontPage
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
	const { data, error } = useSWR<SanityPage | SanityFrontPage>(
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

	const url = data._type === "frontPage" ? "/" : `/${data.slug.current}`;

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
	letter-spacing: 1px;
	padding: 1rem 1.75rem;
	text-decoration: none;
	cursor: pointer;
	border-radius: 4px;
	color: ${props => (props.color === "pink" ? "#371755" : "#ffffff")};
	font-weight: bold;
	font-size: 1rem;
	transition: color 0.3s, background 0.3s;

	:hover {
		color: #ffffff;
		background-color: ${theme.color.main.purple};
	}
`;

export default Link;
