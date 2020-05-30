import React from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import YoutubeEmbed from "./youtube-embed";
import IframeEmbed from "./iframe-embed";
import { PROJECT_ID, DATASET } from "../../sanity";
import { css } from "@emotion/core";

const wrapper = css`
	& div > figure > img {
		max-width: 100%;
	}
	& div > figure {
		margin: 0;
	}
	p {
		min-height: 1em;
	}
`;

type Props = {
	blocks: any[];
};

const SanityProtableText: React.FC<Props> = props => {
	return (
		<div css={wrapper}>
			<BlockContentToReact
				blocks={props.blocks}
				projectId={PROJECT_ID}
				dataset={DATASET}
				imageOptions={{ w: 1000, fit: "max" }}
				serializers={{
					types: {
						youtube: YoutubeEmbed,
						iframe: IframeEmbed
					}
				}}
			/>
		</div>
	);
};

export default SanityProtableText;
