import React from "react";
import { css } from "@emotion/core";
import { rightAngledTriangleHeight } from "../utils";
import AngledImage, { angleDirection } from "./angled-image";

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
	anglePosition: "before" | "after" | "center";
	angleDirection: angleDirection;
	height: string;
	imageUrl: string;
	color: Array<string>;
	overflow?: boolean;
	className?: string;
	textPosition?: "center" | "left";
};

const Hero: React.FC<Props> = props => {
	const {
		anglePosition,
		angleDirection,
		height,
		imageUrl,
		color,
		className,
		children
	} = props;

	const contentRef = React.useRef<HTMLDivElement>(null);

	const triangleHeight = rightAngledTriangleHeight(100, 6);

	const totalImageHeight =
		anglePosition === "before"
			? height
			: anglePosition === "after"
			? `calc(${height} + ${triangleHeight}vw)`
			: `calc(${height} + (${triangleHeight}vw / 2))`;

	const contentClass =
		props.textPosition === "center"
			? [defaultContent, centeredContent]
			: defaultContent;

	return (
		<div css={hero(totalImageHeight)}>
			<AngledImage
				direction={angleDirection}
				angleHeight={`${triangleHeight}vw`}
				imageUrl={imageUrl}
				overlayColor={color}
				css={image(totalImageHeight)}
			/>
			<div className={className}>
				<div css={contentClass} ref={contentRef}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Hero;
