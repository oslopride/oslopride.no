import styled from "@emotion/styled";

export type SubHeadingProps = { line: "left" | "right" | "both" | "line-only" };

const SubHeading = styled.span<SubHeadingProps>`
	display: inline-flex;
	text-transform: uppercase;
	font-size: 0.85rem;
	letter-spacing: 2px;
	font-weight: 600;
`;

export default SubHeading;
