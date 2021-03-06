import React, { ButtonHTMLAttributes } from "react";
import { css } from "@emotion/core";

import theme from "../utils/theme";

const scrollButton = css`
	display: block;
	height: 3rem;
	width: 3rem;
	color: #fff;
	background: ${theme.color.main.pink};
	border: 3px solid #fff;
	border-radius: 50%;
	cursor: pointer;
	transition: background 0.3s;

	:hover,
	:focus {
		background: ${theme.color.main.purple};
	}
`;

function scrollToContent(): void {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

type ScrollUpButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ScrollUpButton = (props: ScrollUpButtonProps) => {
	return (
		<button
			title="Bla opp til hovedinnholdet"
			css={scrollButton}
			onClick={scrollToContent}
			{...props}
		>
			<span role="img" aria-label="Oppoverpil">
				↑
			</span>
		</button>
	);
};

export default ScrollUpButton;
