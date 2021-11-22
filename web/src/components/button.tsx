import styled from "@emotion/styled";
import theme from "../utils/theme";

export const Button = styled.button`
	display: inline-flex;
	align-items: center;
	border-radius: 50px;
	padding: 24px 64px;
	background-color: #ff4fa4;
	text-transform: uppercase;
	text-align: center;
	display: inline-block;
	letter-spacing: 1px;
	padding: 1rem 1.75rem;
	text-decoration: none;
	cursor: pointer;
	color: #2b193c;
	font-weight: bold;
	transition: color 0.3s, background 0.3s;
	border: none;

	:hover,
	:focus {
		color: #ffffff;
		background-color: ${theme.color.main.purple};
	}
`;
