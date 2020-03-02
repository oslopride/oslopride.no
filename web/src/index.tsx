import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import { Global, css } from "@emotion/core";
import { normalize } from "polished";
import { hot } from "react-hot-loader/root";
import App from "./app";
import { SanityStoreProvider } from "./sanity/store";
import { ThemeProvider } from "emotion-theming";

WebFont.load({
	typekit: {
		id: "ygk6hzk"
	}
});

const globalStyles = css`
	${normalize()}

	* {
		box-sizing: border-box;
	}

	html {
		font-family: proxima-nova, sans-serif;
	}
`;

const theme = {
	main: { purple: "#3a1b7b", pink: "#e350a0", blue: "#184FBD" },
	text: { black: "#252525", grey: "#656781", white: "#ffffff" },
	background: { white: "#f7f8fa", pink: "#f7acb3", purple: "#bfb4d3" }
};

const ConfiguredApp = hot(() => (
	<>
		<Global styles={globalStyles} />
		<SanityStoreProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</SanityStoreProvider>
	</>
));

const rootElement = document.getElementById("app");
ReactDOM.render(<ConfiguredApp />, rootElement);
