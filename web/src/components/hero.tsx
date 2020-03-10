import React from "react";
import { css } from "@emotion/core";
import { rightAngledTriangleHeight } from "../utils";
import AngledImage, { angleDirection } from "./angled-image";

const image = (height: string) => css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: ${height};
	z-index: -1;
`;

const content = (marginBottom: string) => css`
	color: white;
	margin-top: calc(7rem + 7vw);
	margin-bottom: ${marginBottom};
`;

type Props = {
	anglePosition: "before" | "after" | "center";
	angleDirection: angleDirection;
	height: string;
	imageUrl: string;
	color: string;
	overflow?: boolean;
	className?: string;
};

const Hero: React.FC<Props> = props => {
	const {
		anglePosition,
		angleDirection,
		height,
		imageUrl,
		color,
		overflow,
		className,
		children
	} = props;
	// Distance from the bottom of the content to the top of the page
	const [contentBottomToPageTop, setContentBottomToPageTop] = React.useState(0);

	const updateContentBottomToPageTop = (elm: HTMLDivElement | null) => {
		if (elm) {
			setContentBottomToPageTop(elm.offsetTop + elm.clientHeight);
		}
	};

	const triangleHeight = rightAngledTriangleHeight(100, 6);

	const totalImageHeight =
		anglePosition === "before"
			? height
			: anglePosition === "after"
			? `calc(${height} + ${triangleHeight}vw)`
			: `calc(${height} + (${triangleHeight}vw / 2))`;

	const childrenWrapper = overflow
		? "0"
		: `calc(${totalImageHeight} - ${contentBottomToPageTop}px)`;

	return (
		<>
			<AngledImage
				direction={angleDirection}
				angleHeight={`${triangleHeight}vw`}
				imageUrl={imageUrl}
				overlayColor={color}
				css={image(totalImageHeight)}
			/>
			<div
				className={className}
				ref={updateContentBottomToPageTop}
				css={content(childrenWrapper)}
			>
				{children}
			</div>
		</>
	);
};

export default Hero;
