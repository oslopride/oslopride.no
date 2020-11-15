import theme from "../../utils/theme";
import styled from "@emotion/styled";

export const StickyFooter = styled.footer`
	background-color: ${theme.color.main.purple};
	color: ${theme.color.text.white};
`;

export const Footer = styled.div`
	width: 90vw;
	max-width: 900px;
	margin: 2.75rem auto 0 auto;

	display: -ms-grid;
	-ms-grid-columns: 3fr 2fr 1fr;

	display: grid;
	grid-template-columns: 3fr 2fr 1fr;
	column-gap: 1rem;

	padding: 2.5rem 1rem;

	a {
		color: ${theme.color.background.pink};
	}

	a,
	p {
		margin: 0.25rem 0;
	}

	@media screen and (max-width: 720px) {
		-ms-grid-columns: 1fr;
		grid-template-columns: 1fr;
		text-align: center;
	}
`;

export const Image = styled.div`
	img {
		width: 10rem;
		fill: ${theme.color.text.white};
		margin-left: -1rem;
	}
	h3 {
		text-transform: uppercase;
		margin-top: 8px;
		font-weight: 500;
	}

	ul {
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

		li {
			margin: 0.25rem 0;
		}
	}
`;
