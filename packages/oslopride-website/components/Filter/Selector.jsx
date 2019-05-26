import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Selector = ({ selectors, defaultSelector, className }) => {
  const [checked, setChecked] = useState(defaultSelector);
  const onChange = useCallback(
    (value, callback) => () => {
      setChecked(value);
      callback(value);
    },
    [setChecked]
  );

  const inspectedChecked = selectors.some(({ value }) => value === checked)
    ? checked
    : defaultSelector;

  const selectorElements = selectors.map(({ name, value, callback }) => (
    <label key={name}>
      <input
        type="radio"
        name="event-filter-selectors"
        onChange={onChange(value, callback)}
        checked={value === inspectedChecked}
      />
      <SelectorLabel>{name}</SelectorLabel>
    </label>
  ));

  return (
    <Container className={className}>
      <SelectorTitle>Arena</SelectorTitle>
      <SelectorList>{selectorElements}</SelectorList>
    </Container>
  );
};

export default Selector;

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
  justify-content: center;

  label {
    margin: 2px 8px;
  }
`;

const SelectorLabel = styled.span`
  margin-left: 5px;
`;
