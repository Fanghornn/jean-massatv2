"use strict";

var express = require('express'),
	app,
	path = require('path');

function startServer(config){

	app = express();
	app.disable('x-powered-by'); 
	app.use(require('compression')());

	//Setting static directory used by express
	if (!config.dev)
		app.use(express.static(path.join(__dirname, 'static')));
	else
		app.use(express.static(path.join(__dirname + '/../', 'src')));

	app.set('title', config.hostName);

	//If i want to use render engines
	// app.set('views', __dirname + '/views');
	// app.set('view engine', 'foo');

	setAppRoutes();

	app.listen(config.port);

}

function setAppRoutes(){

	//The only avaiable route (regex matches / and /index.html)
	app.get('(/|/index.html)', function(req, res){
		res.sendFile( 'index.html', {root:'./views'});
	});

	//Handles any other routes accessed by any http method
	app.all('*', function(req, res){
		//Send 404 error
		res.sendFile( '404.html', {root:'./views'});
	});

}

exports.start = function(config){
	startServer(config);
};