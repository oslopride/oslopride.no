import styled from "@emotion/styled";

import theme from "../utils/theme";

const SubHeading = styled.span`
	display: inline-flex;
	text-transform: uppercase;
	font-size: 0.85rem;
	letter-spacing: 2px;
	font-weight: 600;

	::before {
		content: "";
		width: 3em;
		height: 2px;
		background-color: ${theme.color.main.pink};
		place-self: center;
		margin-right: 1em;
	}
`;

export default SubHeading;
