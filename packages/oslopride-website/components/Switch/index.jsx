import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

const Switch = ({ isOn, callback, className }) => (
  <Wrapper className={className}>
    <Input type="checkbox" checked={isOn} onChange={callback} />
    <ToggleButton checked={isOn} />
  </Wrapper>
);

export default Switch;

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 2em;
  height: 1em;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 1em;

  &:before {
    position: absolute;
    content: "";
    height: 1em;
    width: 1em;
    left: 0;
    bottom: 0;
    background-color: ${theme.purple};
    transition: 0.2s;
    border-radius: 50%;
    transform: translateX(${({ checked }) => (checked ? "1em" : "0")});
  }
`;
