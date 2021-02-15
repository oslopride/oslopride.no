import React from "react";
import { css } from "@emotion/core";
import AngledImage, { angleDirection } from "./angled-image";
import theme from "../utils/theme";

const hero = (height: string) => css`
	min-height: 400px;
	height: ${height};
	padding-top: 13rem;

	@media screen and (max-width: 800px) {
		padding-top: 8rem;
	}
`;

const image = (height: string) => css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: ${height};
	min-height: 350px;
	z-index: -1;
`;

const scrollButton = (height: string) => css`
	display: block;
	position: absolute;
	top: calc(${height} - 1.5rem);
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
	angleDirection: angleDirection;
	height: string;
	imageUrl: string;
	color: Array<string>;
	overflow?: boolean;
	className?: string;
	textPosition?: "center" | "left";
	displayScrollButton?: boolean;
};

const Hero: React.FC<Props> = props => {
	const {
		angleDirection,
		height,
		imageUrl,
		color,
		className,
		children
	} = props;

	const contentRef = React.useRef<HTMLDivElement>(null);
	const scrollButtonRef = React.useRef<HTMLButtonElement>(null);

	const contentClass =
		props.textPosition === "center"
			? [defaultContent, centeredContent]
			: defaultContent;

	function scrollToContent(): void {
		const buttonDistanceFromTop = scrollButtonRef.current?.offsetTop as number;
		const buttonHeight = scrollButtonRef.current?.offsetHeight as number;
		const scrollOffsetFromTop = buttonDistanceFromTop + buttonHeight;

		window.scrollTo({ top: scrollOffsetFromTop, behavior: "smooth" });
	}

	return (
		<div css={hero(height)}>
			<AngledImage
				direction={angleDirection}
				imageUrl={imageUrl}
				overlayColor={color}
				css={image(height)}
			/>
			<div className={className}>
				<div css={contentClass} ref={contentRef}>
					{children}
				</div>
			</div>

			{props.displayScrollButton && (
				<button
					title="Scroll to main content"
					ref={scrollButtonRef}
					css={scrollButton(height)}
					onClick={scrollToContent}
				>
					<span role="img" aria-label="Arrow pointing down">
						↓
					</span>
				</button>
			)}
		</div>
	);
};

export default Hero;
