import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./overmind";

import App from "./app";

const overmind = createOvermind(config);
overmind.actions.getConfiguration();

const OvermaindConnectedApp = () => (
	<Provider value={overmind}>
		<App />
	</Provider>
);

const HotApp = hot(OvermaindConnectedApp);

const rootElement = document.getElementById("app");

if (rootElement && rootElement.hasChildNodes()) {
	ReactDOM.hydrate(<HotApp />, rootElement);
} else {
	ReactDOM.render(<HotApp />, rootElement);
}
