var React = require('react');
var ReactDOMServer = require("react-dom/server");

import App from '../app/app';

var ReactDOM = require('react-dom');


module.exports = function (props) {

	var content = ReactDOMServer.renderToString(
		<App initialCount={props.initialCount}></App>
	);

	var propsScript = 'var APP_PROPS = ' + JSON.stringify(props);
	var html = ReactDOMServer.renderToStaticMarkup(
		<html>
		<head>
			<title>Server Side Rendering</title>
			<link rel="stylesheet" href="/assets/main.css"/>
		</head>
		<body>
		<div id="root" dangerouslySetInnerHTML={
			{__html: content}
		}/>
		<script dangerouslySetInnerHTML={
			{__html: propsScript}
		}></script>
		<script src={"assets/bundle.js"}></script>
		</body>
		</html>
	);

	return html;
}