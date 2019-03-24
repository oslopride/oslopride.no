import theme from "@/utils/theme";
import styled from "styled-components";

const Button = styled.button`
  text-transform: uppercase;
  padding: 10px 15px;
  background: white;
  border: 3px solid #ddd;
  outline: none;
  cursor: pointer;

  :hover,
  :focus {
    border-color: ${theme.purple};
  }
  :active {
    background: ${theme.purple};
    color: white;
  }
`;

export default Button;
