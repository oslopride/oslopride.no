import React from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { SanityTextArea } from "../sanity/models";

type Props = {
	content: SanityTextArea;
};

const TextArea: React.FC<Props> = props => {
	return <BlockContentToReact blocks={props.content.text} />;
};

export default TextArea;
