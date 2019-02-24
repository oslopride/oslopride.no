import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  padding: 15px 15px;

  @media (min-width: 400px) {
    padding: 15px 30px;
  }
`;

const Sheet = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

export default Sheet;
