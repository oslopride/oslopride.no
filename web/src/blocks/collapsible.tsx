import React, { useState, useRef } from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { css } from "@emotion/core";

import { SanityCollapsibleList } from "../sanity/models";
import theme from "../utils/theme";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Minus } from "../assets/minus.svg";

type Props = {
	content: SanityCollapsibleList;
};

const CollapsibleList: React.FC<Props> = ({
	content: { title, listItems }
}) => {
	const [active, setActive] = useState<number | null>(null);
	const itemRefs = listItems.map(() => useRef<HTMLLIElement>(null));

	const onClickHandler = (index: number): void => {
		setActive(index === active ? null : index);
	};

	const { white, black } = theme.color.text;
	const purple = theme.color.main.purple;
	const lightPurple = theme.color.background.purple;

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
					const Icon = isActive ? Minus : Plus;
					return (
						<li key={`${idx}-${item.title}`} ref={itemRefs[idx]}>
							<h3
								css={css`
									display: flex;
									justify-content: space-between;
									align-items: center;
									background-color: ${isActive ? purple : lightPurple};
									color: ${isActive ? white : black};
									padding: 15px;
									margin: 5px 0;
									cursor: pointer;
								`}
								onClick={() => onClickHandler(idx)}
							>
								{item.title}
								<Icon
									height="1em"
									width="1em"
									css={css`
										stroke: ${isActive ? white : purple};
									`}
								/>
							</h3>
							<div
								css={css`
									padding: 3px 15px;
									visibility: ${isActive ? "visible" : "hidden"};
									transition: height 0.1s ease-in-out;
									overflow: hidden;
									height: ${isActive
										? itemRefs[idx].current?.clientHeight
										: 0}px;
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
