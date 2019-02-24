import Sheet from "@/components/Sheet";
import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
`;

const UnderConstruction = () => (
  <Sheet>
    <Heading>
      <span role="img" aria-label="Konstruksjonssymbol">
        🚧
      </span>
    </Heading>
    <p>Under utvikling, kommer snart.</p>
  </Sheet>
);

export default UnderConstruction;
