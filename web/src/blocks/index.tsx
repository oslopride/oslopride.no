import React from "react";
import { SanityBlock, SanityUnknown } from "../sanity/models";
import Announcement from "./announcement";
import Advertisement from "./advertisement";

type Props = {
	block: SanityBlock;
};

const Block: React.FC<Props> = props => {
	switch (props.block._type) {
		case "announcement":
			return <Announcement content={props.block} />;
		case "advertisement":
			return <Advertisement content={props.block} />;
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
