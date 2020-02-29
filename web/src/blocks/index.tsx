import React from "react";
import { SanityBlock, SanityUnknown } from "../sanity/models";
import CallToActionMinimal from "./call-to-action-minimal";
import CallToAction from "./call-to-action";
import Hero from "./hero";

type Props = {
	block: SanityBlock;
};

const Block: React.FC<Props> = props => {
	switch (props.block._type) {
		case "callToActionMinimal":
			return <CallToActionMinimal content={props.block} />;
		case "callToAction":
			return <CallToAction content={props.block} />;
		case "hero":
			return <Hero content={props.block} />;
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
