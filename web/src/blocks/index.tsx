import React from "react";
import { SanityBlock, SanityUnknown } from "../sanity/models";
import Announcement from "./announcement";
import Advertisement from "./advertisement";
import CollapsibleList from "./collapsible";
import PartnerPreview from "./partner-preview";
import TextArea from "./text-area";
import PartnerList from "./partner-list";
import Quote from "./quote";

type Props = {
	block: SanityBlock;
};

const Block: React.FC<Props> = props => {
	console.log("props.block", props.block._type);

	switch (props.block._type) {
		case "announcement":
			return <Announcement content={props.block} />;
		case "advertisement":
			return <Advertisement content={props.block} />;
		case "collapsibleList":
			return <CollapsibleList content={props.block} />;
		case "partnerPreview":
			return <PartnerPreview content={props.block} />;
		case "textArea":
			return <TextArea content={props.block} />;
		case "partnerList":
			return <PartnerList content={props.block} />;
		case "quote":
			return <Quote content={props.block} />;
		default:
			console.warn(
				`Unknown block type: ${(props.block as SanityUnknown)._type}`
			);
			if (process.env.NODE_ENV !== "production") {
				return <pre>{JSON.stringify(props.block, null, 2)}</pre>;
			}
			return null;
	}
};

export default Block;
