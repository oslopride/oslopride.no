import React from "react";
import { css } from "@emotion/core";
import { rightAngledTriangleHeight } from "../utils";
import AngledImage, { angleDirection } from "./angled-image";

const hero = (height: string) => css`
	min-height: 400px;
	height: ${height};
	margin-bottom: -10rem;
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

const defaultContent = (marginBottom: string) => css`
	margin: 10rem 0 ${marginBottom} 8rem;
	width: 90vw;
	max-width: 900px;

	@media screen and (max-width: 1200px) {
		margin: 10rem auto ${marginBottom} auto;
	}
`;

const centeredContent = (marginBottom: string) => css`
	margin: 10rem auto ${marginBottom} auto;
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
			: `calc(${totalImageHeight} - ${contentBottomToPageTop}px - 0rem)`;

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
				<div
					css={
						props.textPosition === "center"
							? [
									defaultContent(childrenWrapper),
									centeredContent(childrenWrapper)
							  ]
							: defaultContent(childrenWrapper)
					}
					ref={contentRef}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Hero;
