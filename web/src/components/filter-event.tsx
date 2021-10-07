import React from "react";
import { css } from "@emotion/core";

import { SanitySimpleEvent } from "../sanity/models";

type Filter = {
	value: string;
	label: string;
	predicate: (event: SanitySimpleEvent) => boolean;
};

type FilterProps = {
	underlineColor: string;
	bgColor: string;
	filterTitle: string;
	filterOptions: Filter[];
	selectedFilters: Filter[];
	setFilters: (filter: Filter[]) => void;
};

const FilterEvent: React.FC<FilterProps> = ({
	underlineColor,
	bgColor,
	filterTitle,
	filterOptions,
	selectedFilters,
	setFilters
}) => {
	const containsFilterOption = (filterObj: Filter, filterArray: Filter[]) => {
		let objIndex = -1;

		filterArray.some((filter, index) => {
			if (filterObj.label === filter.label) {
				objIndex = index;
				return true;
			}
			return false;
		});

		return objIndex;
	};

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			<h2
				css={css`
					padding-bottom: 8px;
					border-bottom: solid 4px ${underlineColor};
				`}
			>
				{filterTitle}
			</h2>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: 24px;
					background-color: ${bgColor};
				`}
			>
				{filterOptions.map((option, index) => {
					return (
						<div
							key={`arenaOption${index}`}
							css={css`
								${index !== filterOptions.length - 1 &&
									`border-bottom: 2px solid ${underlineColor};
									padding-bottom: 6px; 
									`}
								${index !== 0 && `margin-top: 6px;`}
								width: 100%;
							`}
						>
							<label>
								<input
									type="checkbox"
									onChange={() => {
										const newFilters = [...selectedFilters];
										const filterIndex = containsFilterOption(
											option,
											selectedFilters
										);
										if (filterIndex >= 0) {
											newFilters.splice(filterIndex, 1);
											setFilters(newFilters);
										} else {
											newFilters.push(option);
											setFilters(newFilters);
										}
									}}
								/>
								{option.label}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FilterEvent;
