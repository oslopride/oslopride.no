import theme from "../../helpers/theme";
import styled from "@emotion/styled";

export const StickyFooter = styled.footer`
	background-color: ${theme.color.main.purple};
	color: ${theme.color.text.white};
	font-size: 16px;
`;

export const Footer = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	width: 70%;
	margin: 50px auto;

	a {
		color: ${theme.color.background.pink};
	}

	a,
	p {
		margin: 5px 0;
	}

	> div {
		flex: 1;
		margin: 0 20px;

		:nth-of-type(1) {
			flex: 2;
		}
	}

	@media (max-width: 767px) {
		text-align: center;

		> div {
			flex: 1 0 100%;
			padding: 20px;
		}

		ul,
		h3 {
			margin-left: 0;
		}
	}
`;

export const Image = styled.div`
	img {
		width: 180px;
		fill: ${theme.color.text.white};
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

		li {
			margin: 5px 0;
		}
	}
`;
