import React from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { css } from "@emotion/core";

import { SanitySplitPane } from "../sanity/models";

const wrapper = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	@media (max-width: 600px) {
		flex-direction: column;
	}
`;

type Props = {
	content: SanitySplitPane;
};

const SplitPane: React.FC<Props> = ({ content: { left, right } }) => (
	<div css={wrapper}>
		<BlockContentToReact blocks={left.text} />
		<BlockContentToReact blocks={right.text} />
	</div>
);

export default SplitPane;
