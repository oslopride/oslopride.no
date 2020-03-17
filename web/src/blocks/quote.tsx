import React from "react";
import { css } from "@emotion/core";

import { SanityQuote } from "../sanity/models";
import { ReactComponent as Triangles1 } from "../assets/triangles-1.svg";
import { ReactComponent as Triangles2 } from "../assets/triangles-2.svg";
import theme from "../utils/theme";

const wrapper = css`
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const quote = css`
	font-size: 2.5rem;
	font-size: min(max(24px, 4vw), 46px);
	font-style: italic;
	text-align: center;
	margin: 0;
	display: inline-block;

	cite {
		font-size: 0.7em;
		display: block;
		margin-top: 1.3em;
		@media (min-width: 600px) {
			display: none;
		}
	}

	p {
		margin: 0;
	}

	@media (max-width: 600px) {
		&::before {
			width: 100%;
			color: ${theme.color.main.pink};
			content: "“";
			font-size: 20vw;
		}
	}
`;

const triangles = css`
	flex-grow: 1;
	min-width: 150px;
	max-width: 350px;
	@media (max-width: 600px) {
		display: none;
	}
`;

type Props = {
	content: SanityQuote;
};

const Quote: React.FC<Props> = ({ content: { content, citation } }) => (
	<div css={wrapper}>
		<Triangles1 css={triangles} />
		<blockquote css={quote}>
			<p>{content.no}</p>
			<cite>- {citation}</cite>
		</blockquote>
		<Triangles2 css={triangles} />
	</div>
);

export default Quote;
