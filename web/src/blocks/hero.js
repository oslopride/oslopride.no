import React from "react";
import styled from "styled-components";
import Anchor from "../components/anchor";
import { urlFor } from "../utils/sanity";

export default function Hero({ title, subtitle, links, image }) {
	const imageRef = React.useRef(null);
	const [imageHeight, setImageHeight] = React.useState(0);
	const updateImageHeight = () =>
		setImageHeight((imageRef.current || {}).offsetHeight || 0);

	return (
		<Wrapper>
			<ImageContainer>
				{image && (
					<>
						<Image
							onLoad={updateImageHeight}
							ref={imageRef}
							src={urlFor(image)
								.maxWidth(500)
								.url()}
						/>
					</>
				)}
			</ImageContainer>

			<TextContainer imageHeight={imageHeight}>
				<h1>{title}</h1>

				{subtitle && <p>{subtitle}</p>}

				{links && links.lenght > 0 && (
					<ul>
						{links.map(link => (
							<li key={link._key}>
								<Anchor {...link} />
							</li>
						))}
					</ul>
				)}
			</TextContainer>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	max-width: 1000px;
	margin: 0 auto;
	padding: 0 1rem;

	@media (min-width: 700px) {
		flex-direction: row-reverse;
	}
`;

const ImageContainer = styled.div`
	flex: 1;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: linear-gradient(to top, white, transparent);
	}

	@media (min-width: 700px) {
		&::after {
			display: none;
		}
	}
`;

const Image = styled.img`
	max-width: 100%;
`;

const TextContainer = styled.div`
	flex: 1;
	margin-top: -${props => props.imageHeight * 0.35}px;
	z-index: 10;

	@media (min-width: 700px) {
		margin-top: 0;
	}
`;
