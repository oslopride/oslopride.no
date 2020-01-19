import React from "react";

import Block from "./block";

export default function Page({ blocks }) {
	return (
		<>
			{blocks.map(block => (
				<Block block={block} key={block._key} />
			))}
		</>
	);
}
