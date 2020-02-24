import styled from "styled-components";

export const Header = styled.header`
	display: block;
	max-width: 100%;
	position: relative;
	background-color: black;
	padding: 24px;

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	img {
		width: 170px;
		height: auto;
	}

	div {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		p {
			text-transform: uppercase;
			color: #ecafb4;
			font-weight: 600;
			margin-right: 50px;
		}
	}
`;
