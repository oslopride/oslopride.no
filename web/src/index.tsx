import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { DataProvider } from "./hooks/data-context";

import App from "./app";

const HotApp = hot(App);

const rootElement = document.getElementById("app");
ReactDOM.render(
	<DataProvider>
		<HotApp />
	</DataProvider>,
	rootElement
);
