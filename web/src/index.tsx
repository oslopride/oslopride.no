import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import App from "./app";
import { SanityStoreProvider } from "./sanity/store";

const SanityStoreConnectedApp = () => (
	<SanityStoreProvider>
		<App />
	</SanityStoreProvider>
);

const HotApp = hot(SanityStoreConnectedApp);

const rootElement = document.getElementById("app");
ReactDOM.render(<HotApp />, rootElement);
