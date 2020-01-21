import React from "react";
import Anchor from "../components/anchor";
import styled from "styled-components";

export default function CallToActionMinimal({ title, headline, button }) {
	return (
		<Wrapper>
			<Header>
				<h2>{title}</h2>
				<h3>{headline}</h3>
			</Header>
			<Anchor {...button} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	background-color: inherit;
`;

const Header = styled.div`
	font-size: 2em;

	h2 {
		color: blue;
	}
`;
