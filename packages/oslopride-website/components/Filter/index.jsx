import React from "react";
import styled from "styled-components";
import Selectors from "./Selectors";
import Toggles from "./Toggles";
import Dropdown from "./Dropdown";

const Filter = ({ selectors, defaultSelector, toggles, dropdownOptions, defaultDropdownValue, onDropdownSelect }) => (
  <Wrapper>
    <Selectors selectors={selectors} defaultSelector={defaultSelector} />
    <Container>
      <Toggles toggles={toggles} />
      <Dropdown onSelect={onDropdownSelect} options={dropdownOptions} defaultValue={defaultDropdownValue} />
    </Container>
  </Wrapper>
);

export default Filter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 750px) {
    flex-direction: row;
  }
`;
