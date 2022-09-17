import React from "react";
import { css } from "@emotion/core";
import getYouTubeID from "get-youtube-id";

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

const YoutubeEmbed: React.FC<Props> = ({ node }) => {
	if (!node || !node.url) {
		return null;
	}

	const id = getYouTubeID(node.url);
	if (!id) {
		return null;
	}

	const embedUrl = `https://www.youtube.com/embed/${id}`;
	return (
		<div css={wrapper}>
			<iframe
				css={embed}
				title="YouTube"
				width="560"
				height="315"
				src={embedUrl}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
			/>
		</div>
	);
};

export default YoutubeEmbed;
