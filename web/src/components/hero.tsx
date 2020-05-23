import React from "react";
import { css } from "@emotion/core";
import { rightAngledTriangleHeight } from "../utils";
import AngledImage, { angleDirection } from "./angled-image";

const hero = (height: string) => css`
	min-height: 400px;
	height: ${height};
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

const content = (marginBottom: string) => css`
	padding: calc(7rem + 7vw) 7vw ${marginBottom};
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
	const [contentBottomToPageTop, setContentBottomToPageTop] = React.useState<
		number | undefined
	>(undefined);
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		if (contentRef.current) {
			setContentBottomToPageTop(
				contentRef.current.offsetTop + contentRef.current.offsetHeight
			);
		}
	}, []);

	const triangleHeight = rightAngledTriangleHeight(100, 6);

	const totalImageHeight =
		anglePosition === "before"
			? height
			: anglePosition === "after"
			? `calc(${height} + ${triangleHeight}vw)`
			: `calc(${height} + (${triangleHeight}vw / 2))`;

	const childrenWrapper =
		overflow || contentBottomToPageTop === undefined
			? "0"
			: `calc(${totalImageHeight} - ${contentBottomToPageTop}px)`;

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
				<div css={content(childrenWrapper)} ref={contentRef}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Hero;
