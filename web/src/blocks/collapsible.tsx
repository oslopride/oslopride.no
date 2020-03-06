import React, { useState } from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { css } from "@emotion/core";

import { SanityCollapsibleList } from "../sanity/models";

type Props = {
	content: SanityCollapsibleList;
};

const CollapsibleList: React.FC<Props> = ({
	content: { title, listItems }
}) => {
	const [active, setActive] = useState<number | null>(null);

	const onClickHandler = (index: number): void => {
		setActive(index === active ? null : index);
	};

	return (
		<div
			css={css`
				padding: 15px;
			`}
		>
			<h2>{title}</h2>
			<ul
				css={css`
					list-style: none;
					padding: 0;
				`}
			>
				{listItems.map((item, idx) => {
					const isActive = active === idx;
					return (
						<li key={`${idx}-${item.title}`}>
							<h3
								css={css`
									display: flex;
									justify-content: space-between;
									background-color: ${isActive ? "green" : "lightgreen"};
									color: ${isActive ? "white" : "black"};
									padding: 15px;
									margin: 5px 0;
									cursor: pointer;
								`}
								onClick={() => onClickHandler(idx)}
							>
								<span>{item.title}</span>
								<span>{isActive ? "-" : "+"}</span>
							</h3>
							<div
								css={css`
									display: ${isActive ? "block" : "none"};
									padding: 3px 15px;
								`}
							>
								<BlockContentToReact blocks={item.content} />
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CollapsibleList;
