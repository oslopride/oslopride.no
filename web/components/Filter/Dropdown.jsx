import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

const Dropdown = ({ onSelect, options, defaultValue }) => {
  const optionElements = options.map(({ name, value }) => (
    <option key={value} value={value}>{name}</option>
  ));

  return (
    <SelectDropdown defaultValue={defaultValue} onChange={(event) => onSelect(event.target.value)}>
      {optionElements}
    </SelectDropdown>
  );
};

export default Dropdown;

const SelectDropdown = styled.select`
  border: 2px solid ${theme.purple};
  border-radius: 0;
  padding: 5px 5px 5px 10px;
  background-color: white;
  min-height: 2em;
  min-width: 100px;
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;
  cursor: pointer;
  color: "white";
  background-color: "inherit";
  border-bottom: 2px solid ${theme.purple};
  border-right: 2px solid ${theme.purple};

  background-image: linear-gradient(45deg, transparent 50%, ${theme.purple} 50%),
    linear-gradient(135deg, ${theme.purple} 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(0.85em),
    calc(100% - 15px) calc(0.85em);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;

  min-width: 40%;

  @media (min-width: 450px) {
    min-width: 30%;
  }

  @media (min-width: 700px) {
    min-width: initial;
  }
  -webkit-appearance: none;

  &:active {
    background-color: ${theme.purple};
    color: white;

    background-image: linear-gradient(45deg, transparent 50%, white 50%),
      linear-gradient(135deg, white 50%, transparent 50%);
      linear-gradient(135deg, white 50%, transparent 50%);
  }
`;
