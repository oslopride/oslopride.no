import styled from "../../helpers/styled";

export const StickyFooter = styled.footer`
	background-color: ${props => props.theme.main.purple};
	color: ${props => props.theme.text.white};
	font-size: 16px;
`;

export const Footer = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	width: 80%;
	margin: 50px auto;
	a {
		color: ${props => props.theme.background.pink};
	}
	a,
	p {
		margin: 5px 0;
	}
`;

export const Image = styled.div`
	img {
		max-width: 50%;
		width: 300px;
		fill: ${props => props.theme.text.white};
	}
	h3 {
		text-transform: uppercase;
		margin-left: 20px;
		margin-top: 8px;
		font-weight: 500;
	}

	ul {
		margin-left: 20px;
		list-style: none;
		padding: 0;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-flow: column nowrap;
`;

export const Shortcuts = styled.div`
	display: flex;
	flex-flow: column nowrap;

	ul {
		margin: 0;
		list-style: none;
		padding: 0;
	}
`;
