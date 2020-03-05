import React from "react";
import { SanityCollapsibleList } from "../sanity/models";
import BlockContentToReact from "@sanity/block-content-to-react";

type Props = {
	content: SanityCollapsibleList;
};

const CollapsibleList: React.FC<Props> = ({ content }) => {
	const { title, listItems } = content;
	return (
		<>
			<h2>{title}</h2>
			<ul>
				{listItems.map((item, idx) => (
					<li key={`${idx}-${item.title}`}>
						<h3>{item.title}</h3>
						<BlockContentToReact blocks={item.content} />
					</li>
				))}
			</ul>
		</>
	);
};

export default CollapsibleList;
