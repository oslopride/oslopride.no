import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import { Global, css } from "@emotion/core";
import { normalize } from "polished";
import { hot } from "react-hot-loader/root";
import { SWRConfig } from "swr";
import sanity, { previewMode } from "./sanity";
import App from "./app";
import theme from "./utils/theme";

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

	html,
	body,
	#app {
		height: 100%;
		font-size: 18px;
		color: #252525;
	}

	::selection {
		background-color: ${theme.color.background.pink};
		color: ${theme.color.main.purple};
	}

	button:focus {
		outline: 1px dotted ${theme.color.background.pink};
	}

	body {
		font-family: proxima-nova, sans-serif;
	}

	#app {
		display: flex;
		flex-direction: column;
	}

	a {
		color: ${theme.color.main.purple};
		&:hover,
		&:focus {
			color: ${theme.color.main.blue};
		}
	}

	main {
		flex: 1 0 auto;
	}

	p,
	blockquote,
	ul {
		font-size: 1.1rem;
		line-height: 1.75rem;
	}

	footer {
		flex-shrink: 0;
	}
`;

const ConfiguredApp = hot(() => (
	<>
		<Global styles={globalStyles} />
		<SWRConfig
			value={{
				refreshInterval: previewMode ? 5000 : 0,
				fetcher: (query: string) => sanity.fetch(query)
			}}
		>
			<App />
		</SWRConfig>
	</>
));

const rootElement = document.getElementById("app");
ReactDOM.render(<ConfiguredApp />, rootElement);
