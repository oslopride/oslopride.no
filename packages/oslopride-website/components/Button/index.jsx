import styled from "styled-components";

const Button = styled.button`
  text-transform: uppercase;
  padding: 10px 15px;
  background: #fff;
  border: 3px solid #ddd;
  outline: none;
  cursor: pointer;

  :hover,
  :focus {
    border-color: #3a1b7b;
  }
`;

export default Button;
