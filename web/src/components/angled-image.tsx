import styled from "@emotion/styled";

export type angleDirection = "<" | ">";

type Props = {
	direction: angleDirection;
	angleHeight: string;
	overlayColor: Array<string>;
	imageUrl: string;
};

const getGradient = (colorList: Array<string>, direction: string) => {
	if (colorList.length > 1) {
		let output = "background-image: linear-gradient(";
		if (direction === "<") {
			output += "190deg, ";
		} else {
			output += "170deg, ";
		}
		colorList.forEach((color, index) => {
			output += color;
			if (index === 0) {
				output += " 15%";
			}
			if (index < colorList.length - 1) {
				output += ",";
			}
		});
		output += ")";
		return output;
	} else {
		return null;
	}
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
		background-color: ${props => props.overlayColor[0]};
		${props => getGradient(props.overlayColor, props.direction)};
		background-size: 150% 150%;
		background-position: top left;
		opacity: 0.85;
	}
`;

export default AngledImage;
