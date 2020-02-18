import React from "react";

import Hero from "../blocks/hero";
import CallToAction from "../blocks/call-to-action";
import CallToActionMinimal from "../blocks/call-to-action-minimal";
import PartnerList from "../blocks/partner-list";

export default function Block({ block }) {
	switch (block._type) {
		case "hero":
			return <Hero {...block} />;
		case "callToAction":
			return <CallToAction {...block} />;

		case "callToActionMinimal":
			return <CallToActionMinimal {...block} />;
		case "partnerList":
			return <PartnerList {...block} />;
		default:
			console.warn(`Unknown block type: "${block._type}"`);
			if (process.env.NODE_ENV !== "production") {
				return <pre>{JSON.stringify(block, null, 2)}</pre>;
			}
			return null;
	}
}
