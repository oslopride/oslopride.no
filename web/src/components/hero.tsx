import React from "react";
import { css } from "@emotion/core";
import BackgroundImage from "./background-image";
import theme from "../utils/theme";

const hero = css`
	position: relative;
	min-height: 400px;
	padding-top: 13rem;
	padding-bottom: 7rem;
	color: #ffffff;
	overflow-wrap: break-word;

	h2 {
		font-size: 4rem;
	}

	@media screen and (max-width: 800px) {
		padding-top: 8rem;
		padding-bottom: 2rem;
	}
`;

const image = css`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

const scrollButton = css`
	display: block;
	position: absolute;
	bottom: -1.5rem;
	left: 50%;
	transform: translateX(-50%);
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

const defaultContent = css`
	position: relative;
	width: 90vw;
	max-width: 900px;
	margin-left: 8rem;

	@media screen and (max-width: 1200px) {
		margin: auto;
	}

	@media screen and (min-width: 2000px) {
		max-width: 1300px;
		margin: auto;
	}
`;

const centeredContent = css`
	margin: auto;
`;

type Props = {
	imageUrl: string;
	color: Array<string>;
	overflow?: boolean;
	className?: string;
	centerContent?: boolean;
	displayScrollButton?: boolean;
};

const Hero: React.FC<Props> = props => {
	const { imageUrl, color, className, children } = props;

	const scrollButtonRef = React.useRef<HTMLButtonElement>(null);

	function scrollToContent(): void {
		const buttonDistanceFromTop = scrollButtonRef.current?.offsetTop as number;
		const buttonHeight = scrollButtonRef.current?.offsetHeight as number;
		const scrollOffsetFromTop = buttonDistanceFromTop + buttonHeight;

		window.scrollTo({ top: scrollOffsetFromTop, behavior: "smooth" });
	}

	return (
		<div css={hero}>
			<BackgroundImage imageUrl={imageUrl} overlayColor={color} css={image} />
			<div
				className={className}
				css={[defaultContent, props.centerContent && centeredContent]}
			>
				{children}
			</div>

			{props.displayScrollButton && (
				<button
					title="Bla ned til hovedinnholdet"
					ref={scrollButtonRef}
					css={scrollButton}
					onClick={scrollToContent}
				>
					<span role="img" aria-label="Nedoverpil">
						↓
					</span>
				</button>
			)}
		</div>
	);
};

export default Hero;
