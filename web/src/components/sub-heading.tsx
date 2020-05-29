import { css } from "@emotion/core";
import styled from "@emotion/styled";

import theme from "../utils/theme";

const lineCss = css`
	content: "";
	width: 3em;
	height: 2px;
	background-color: ${theme.color.main.pink};
	place-self: center;
`;

export type SubHeadingProps = { line: "left" | "right" | "both" | "line-only" };

const SubHeading = styled.span<SubHeadingProps>`
	display: inline-flex;
	text-transform: uppercase;
	font-size: 0.85rem;
	letter-spacing: 2px;
	font-weight: 600;

	${({ line }) =>
		(line === "left" || line === "both") &&
		css`
			::before {
				${lineCss}
				margin-right: 1em;
			}
		`}

	${({ line }) =>
		(line === "right" || line === "both") &&
		css`
			::after {
				${lineCss}
				margin-left: 1em;
			}
		`}
		
	${({ line }) =>
		line === "line-only" &&
		css`
			::after {
				${lineCss}
			}
		`}
`;

export default SubHeading;
