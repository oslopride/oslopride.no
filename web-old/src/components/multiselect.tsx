import React from "react";
import {
	useSelect,
	useMultipleSelection,
	UseMultipleSelectionStateChange
} from "downshift";
import { css } from "@emotion/core";
import { FiChevronDown } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import theme from "../utils/theme";

const menu = css`
	position: absolute;
	padding: 0;
	list-style-type: none;
	top: 100%;
	width: 100%;
	z-index: 2;
	margin: 0;
	background-color: #e6ddef;
	font-size: 0.9rem;
	font-weight: 500;

	li {
		cursor: pointer;
		padding: 15px 21px 15px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1;

		svg {
			width: 1rem;
			height: 1rem;
		}
	}

	.highlighted {
		background-color: #c5b6d5;
	}
	.selected {
	}
`;

const container = css`
	position: relative;
	width: 100%;

	button {
		align-items: center;
		justify-content: space-between;
		display: flex;
		padding: 20px;
		width: 100%;
		height: 100%;
		background-color: #e6ddef;
		border: none;
		cursor: pointer;
		font-weight: 700;
		font-size: 0.9rem;

		svg {
			transition: transform 150ms ease-in-out;
			margin-left: auto;
			width: 1.2rem;
			height: 1.2rem;
		}

		&[aria-expanded="true"] svg {
			transform: rotate(180deg);
		}
	}
`;

type MultiSelectProps<T> = {
	items: Array<T>;
	displayFormat?: (item: any) => string;
	placeholder?: React.ReactNode;
	selectedItems: Array<T>;
	onChange: (selectedItems: Array<T> | undefined) => void;
};

function defaultDisplayFormat(item: any): string {
	if (typeof item === "string") return item;
	if (item.label) return item.label;
	if (item.name) return item.name;
	if (item.display) return item.display;
	return "Unknown";
}

export function MultiSelect<T>({
	items,
	displayFormat = defaultDisplayFormat,
	placeholder,
	onChange,
	selectedItems
}: MultiSelectProps<T>) {
	const onSelectedItemsChange = (
		changes: UseMultipleSelectionStateChange<T>
	) => {
		onChange(changes.selectedItems);
	};

	const {
		getDropdownProps,
		addSelectedItem,
		removeSelectedItem
	} = useMultipleSelection({ onSelectedItemsChange, selectedItems });

	const {
		isOpen,
		getToggleButtonProps,
		getMenuProps,
		highlightedIndex,
		getItemProps
	} = useSelect({
		selectedItem: null,
		defaultHighlightedIndex: 0, // after selection, highlight the first item.
		itemToString: displayFormat,
		items,
		stateReducer: (state, actionAndChanges) => {
			const { changes, type } = actionAndChanges;
			switch (type) {
				case useSelect.stateChangeTypes.MenuKeyDownEnter:
				case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
				case useSelect.stateChangeTypes.ItemClick:
					return {
						...changes,
						isOpen: false
					};
			}
			return changes;
		},
		onStateChange: ({ type, selectedItem }) => {
			switch (type) {
				case useSelect.stateChangeTypes.MenuKeyDownEnter:
				case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
				case useSelect.stateChangeTypes.ItemClick:
					// eslint-disable-next-line
					const alreadySelected = selectedItem
						? selectedItems.includes(selectedItem)
						: false;
					if (selectedItem && alreadySelected) {
						removeSelectedItem(selectedItem);
					}
					if (selectedItem && !alreadySelected) {
						addSelectedItem(selectedItem);
					}
					break;
				default:
					break;
			}
		}
	});
	return (
		<div css={container}>
			<button
				{...getToggleButtonProps(
					getDropdownProps({ preventKeyAction: isOpen })
				)}
			>
				{placeholder} <FiChevronDown />
			</button>
			<ul {...getMenuProps()} css={menu}>
				{isOpen &&
					items.map((item, index) => {
						const isSelected = selectedItems.includes(item);
						const isHighlighted = highlightedIndex === index;
						return (
							<li
								className={`${isHighlighted ? "highlighted" : ""} ${
									isSelected ? "selected" : ""
								}`}
								key={`${displayFormat(item)}${index}`}
								{...getItemProps({ item, index })}
							>
								{displayFormat(item)} {isSelected && <MdClose />}
							</li>
						);
					})}
			</ul>
		</div>
	);
}
