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

type ScrollUpButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ScrollUpButton = (props: ScrollUpButtonProps) => {
	const scrollButtonRef = React.useRef<HTMLButtonElement>(null);

	function scrollToContent(): void {
		// const buttonDistanceFromTop = scrollButtonRef.current?.offsetTop;
		// const buttonHeight = scrollButtonRef.current?.offsetHeight;
		// const scrollOffsetFromTop = buttonDistanceFromTop + buttonHeight;

		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<button
			title="Bla opp til hovedinnholdet"
			ref={scrollButtonRef}
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
