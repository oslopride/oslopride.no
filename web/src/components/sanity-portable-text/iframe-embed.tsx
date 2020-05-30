import React from "react";
import { css } from "@emotion/core";

const wrapper = css`
	position: relative;
	padding-bottom: 56.25%; //  16:9-format
	height: 0;
	overflow: hidden;
`;

const embed = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

type Props = {
	node?: {
		url?: string;
	};
};

const IframeEmbed: React.FC<Props> = ({ node }) => {
	if (!node || !node.url) {
		return null;
	}

	if (!node.url) {
		return null;
	}

	return (
		<div css={wrapper}>
			<iframe
				css={embed}
				title="Embed"
				src={node.url}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			/>
		</div>
	);
};

export default IframeEmbed;
