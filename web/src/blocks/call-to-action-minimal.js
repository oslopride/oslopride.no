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
			<ButtonWrapper>
				<button>
					<Anchor {...button} />
				</button>
			</ButtonWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	width: 1000px;
	max-width: 90vw;
	margin: 100px auto;

	@media screen and (max-width: 1024px) {
		display: block;

		button {
			margin-top: 1.5em;
		}
	}
`;

const Header = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: left;
	width: 50%;

	h2 {
		font-size: 1em;
		text-transform: uppercase;
		letter-spacing: 2px;
		position: relative;
		padding-left: 60px;

		:before {
			content: "";
			display: block;
			width: 50px;
			height: 4px;
			background-color: #e350a0;
			position: absolute;
			left: 0;
			top: 7px;
		}
	}

	h3 {
		font-size: 2em;
		margin: 10px 0;
	}

	@media screen and (max-width: 1024px) {
		width: 100%;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: 50%;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;

	button {
		min-width: 100px;
		height: 50px;
		padding: 0 2em;
		background-color: #e350a0;
		border-radius: 25px;
		border: none;
		box-shadow: 0 0 18px #dcdcdc;
		letter-spacing: 2px;

		a {
			text-decoration: none;
			color: white;
			text-transform: uppercase;
			font-weight: 600;
			font-size: 0.8em;
		}
	}

	@media screen and (max-width: 1024px) {
		width: 100%;
		justify-content: left;
	}
`;
