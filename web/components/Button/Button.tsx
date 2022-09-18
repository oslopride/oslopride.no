import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.main.blue};
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  letter-spacing: 1px;
  padding: 1rem 1.75rem;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  transition: color 0.3s, background 0.3s;
  border: none;

  :hover,
  :focus {
    color: #ffffff;
    background-color: ${({ theme }) => theme.colors.main.purple};
  }
`;
