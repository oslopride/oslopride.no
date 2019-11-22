import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

const Selectors = ({ selectors, className }) => {
  const selectorElements = selectors.map(({ name, selected, callback }) => (
    <SelectBox key={name} checked={selected}>
      <InvisibleInput
        type="radio"
        name="event-filter-selectors"
        onChange={callback}
        checked={selected}
      />
      <SelectorLabel>{name}</SelectorLabel>
    </SelectBox>
  ));

  return (
    <Container className={className}>
      <SelectorTitle>Arena</SelectorTitle>
      <SelectorList>{selectorElements}</SelectorList>
    </Container>
  );
};

export default Selectors;

const SelectBox = styled.label`
  height: 2em;
  min-width: 100px;
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ checked }) => (checked ? "white" : "inherit")};
  background-color: ${({ checked }) => (checked ? theme.purple : "inherit")};
  border-bottom: 2px solid ${theme.purple};
  border-right: 2px solid ${theme.purple};
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 40%;

  @media (min-width: 450px) {
    min-width: 30%;
  }

  @media (min-width: 700px) {
    min-width: initial;
  }
`;

const InvisibleInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
`;

const Container = styled.div`
  width: 100%;
`;

const SelectorTitle = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
`;

const SelectorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 2px solid ${theme.purple};
  border-left: 2px solid ${theme.purple};
  border-radius: 2px;
`;

const SelectorLabel = styled.span`
  padding: 0 5px;
`;
