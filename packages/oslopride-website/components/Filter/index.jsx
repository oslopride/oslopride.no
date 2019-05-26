import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";
import Selector from "./Selector";

const Filter = ({ selector }) => (
  <Wrapper>{selector && <Selector {...selector} />}</Wrapper>
);

export default Filter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 3px solid ${theme.purple};
`;
