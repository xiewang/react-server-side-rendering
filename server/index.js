var express = require('express');
var path = require('path');

var page = require("../build/server/page.generator.js");

var app = express();
var port = 8082;
var stats = require("../build/assets/stats.generated.json");

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', function(req, res) {
	var props = {
		initialCount: 9
	};
	var html = page(props);
	res.end(html);
});

app.listen(port, function() {
	console.log('Listening on port %d', port);
});