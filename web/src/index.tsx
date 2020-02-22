import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import App from "./app";

const HotApp = hot(App);

ReactDOM.render(<HotApp />, document.getElementById("app"));
