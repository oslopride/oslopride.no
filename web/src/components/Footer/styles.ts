import styled from "styled-components";

export const Footer = styled.footer`
	flex-shrink: 0;
	width: 100%;
	margin-top: 50px;
	padding: 50px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	font-size: 16px;
	background-color: ${props => props.theme.main.purple};
	color: ${props => props.theme.text.white};

	a {
		color: ${props => props.theme.background.pink};
	}
	a,
	p {
		margin: 5px 0;
	}
`;

export const Image = styled.div`
	width: 40%;
	img {
		max-width: 50%;
		width: 150px;
	}
	h3 {
		text-transform: uppercase;
		margin-left: 20px;
		margin-top: 8px;
		font-weight: 500;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-flow: column nowrap;
	width: 30%;
`;

export const Shortcuts = styled.div`
	display: flex;
	flex-flow: column nowrap;
	width: 30%;
`;
