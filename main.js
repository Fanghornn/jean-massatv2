/**
 **************************************
 *	@author: Jean Baptiste Priam Massat
 *			 Aka Fanghornn
 *			 
 * 	@mail: jean.massat[at]gmail[dot]com
 *
 * 	@Project: My personnal website
 *
 *	@Copyright (c) <2014> <Jean Baptiste PRIAM MASSAT>
 *
 ************************************** 
 */
"use strict";

var server = require('./libs/server.js'),
	config = require('./config.js');

process.title = config.hostName;

server.start(config);