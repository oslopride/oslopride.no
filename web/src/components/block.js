import React from "react";

import Hero from "../blocks/hero";

export default function Block({ block }) {
	switch (block._type) {
		case "hero":
			return <Hero {...block} />;
		default:
			console.warn(`Unknown block type: "${block._type}"`);
			if (process.env.NODE_ENV !== "production") {
				return <pre>{JSON.stringify(block, null, 2)}</pre>;
			}
			return null;
	}
}
