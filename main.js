"use strict";

var server = require('./libs/server.js'),
	config = require('./config.js');

process.title = config.hostName;

server.start(config);