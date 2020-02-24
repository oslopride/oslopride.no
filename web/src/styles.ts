import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const theme = {
	main: { purple: "#3a1b7b", pink: "#e350a0", blue: "#184FBD" },
	text: { black: "#252525", grey: "#656781", white: "#ffffff" },
	background: { white: "#f7f8fa", pink: "#f7acb3", purple: "#bfb4d3" }
};

export const GlobalStyle = createGlobalStyle`
	${normalize()}

	html, body, #app {
		height: 100%;
	}

	body {
    	font-family: proxima-nova, sans-serif;
	}

	#app {
		display: flex;
		flex-direction: column;
	}
`;

export const Content = styled.div`
	flex: 1 0 auto;
	margin-bottom: 32px;
`;
