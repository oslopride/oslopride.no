import React from "react";
import { css } from "@emotion/core";

const wrapper = css`
	width: 100%;
	height: 100%;
	font-size: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loading: React.FC<{}> = () => {
	const [showRainbows, setShowRainbows] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => setShowRainbows(true), 1500);
		return () => clearTimeout(timer);
	}, []);

	return <div css={wrapper}>{showRainbows && <span>🏳️‍🌈</span>}</div>;
};

export default Loading;
