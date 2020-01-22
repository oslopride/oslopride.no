import React from "react";
import Anchor from "../components/anchor";
import styled from "styled-components";

export default function CallToActionMinimal({ title, headline, button }) {
	return (
		<Wrapper>
			<Header>
				<h2>{title}</h2>
			</Header>
			<ContentWrapper>
				<h3>{headline}</h3>
				<ButtonWrapper>
					<button>
						<Anchor {...button} />
					</button>
				</ButtonWrapper>
			</ContentWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: block;

	width: 100%;
	background-color: inherit;
	margin: 100px 0;
	padding: 0 200px;
`;

const Header = styled.div`
	width: 50%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: left;

	h2 {
		font-size: 1em;
		text-transform: uppercase;
		letter-spacing: 2px;
		padding-left: 60px;
		position: relative;

		:before {
			content: "";
			display: block;
			height: 4px;
			width: 50px;
			background-color: #e350a0;
			position: absolute;
			left: 0;
			top: 7px;
		}
	}
`;

const ContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;

	h3 {
		font-size: 2em;
		margin: 10px 0;
		width: 50%;
	}
`;

const ButtonWrapper = styled.div`
	width: 50%;
	text-align: right;

	button {
		min-width: 100px;
		height: 50px;
		padding: 0 2em;
		background-color: #e350a0;
		border-radius: 25px;
		border: none;
		box-shadow: 0 0 18px #dcdcdc;
		letter-spacing: 1.5px;

		a {
			text-decoration: none;
			color: white;
			text-transform: uppercase;
			font-weight: bold;
		}
	}
`;
