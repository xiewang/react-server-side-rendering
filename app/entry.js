import React from "react";
import { render } from "react-dom";
import App from "./app";

const APP_PROPS = window.APP_PROPS || {};

render(
	<App {...APP_PROPS}/>,
	document.getElementById('root')
);