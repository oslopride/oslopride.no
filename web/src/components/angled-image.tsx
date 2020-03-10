import styled from "@emotion/styled";

export type angleDirection = "<" | ">";

type Props = {
	direction: angleDirection;
	angleHeight: string;
	overlayColor: string;
	imageUrl: string;
};

const AngledImage = styled.figure<Props>`
	position: relative;
	margin: 0;
	background-image: url("${props => props.imageUrl}");
	background-size: cover;
	background-position: center;
	clip-path: ${props =>
		props.direction === "<"
			? `polygon(0 0, 100% 0, 100% calc(100% - ${props.angleHeight}), 0 100%);`
			: `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${props.angleHeight}));`};

	::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: ${props => props.overlayColor};
		opacity: 0.75;
	}
`;

export default AngledImage;
