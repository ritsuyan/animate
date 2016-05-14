var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;
	console.log(pathname);


});

server.listen(3000);