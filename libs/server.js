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

var express = require('express'),
	app,
	path = require('path'),
	nodemailer = require('nodemailer'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	mailOptions = {},
	indexPage,
	hostName,
	transporter;

function startServer(config){

	app = express();
	app.disable('x-powered-by'); 
	app.use(require('compression')());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(helmet());

	//Here we are gonna define our content security policy to avoid xss
	var helmetCspOptions = {
		
		//http://content-security-policy.com/ for references
		directives: {
			defaultSrc: ["'self'", "https://fonts.googleapis.com"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
			fontSrc: ["'self'", "https://fonts.gstatic.com"],
			reportUri: '/report-violation',
			objectSrc: ["'self'"]
		},

		reportOnly: false,
 
		setAllHeaders: false,
 
		disableAndroid: true
	};

	app.use(helmet.csp(helmetCspOptions));
	

	//Setting options object for express http handling
	var expressHttpOptions = {
		maxAge:'10d',
		index: false,
		setHeaders: function(res){
			res.set('x-timestamp', Date.now());
		}
	};

	//Setting static directory used by express
	if (!config.dev){

		indexPage = 'disabled.html';

		app.use(express.static(path.join(__dirname + '/../', 'static'), expressHttpOptions));

	}else{

		indexPage = 'indexDev.html';

		//We disable cache for development environement
		expressHttpOptions.etag = false;
		expressHttpOptions.maxAge = 0;

		app.use(express.static(path.join(__dirname + '/../', 'src'), expressHttpOptions));

	}

	hostName = config.hostName;

	transporter = nodemailer.createTransport('smtps://' + config.mailLogin + '%40gmail.com:' + config.mailPassword + '@smtp.gmail.com');

	//Setting my own mail address as receiver of web mails sent from the front end user
	mailOptions = {
		to: config.mailLogin + '@gmail.com'
	};

	app.set('title', config.hostName);

	//If i want to use render engines
	// app.set('views', __dirname + '/views');
	// app.set('view engine', 'foo');

	setAppRoutes();

	app.listen(config.port);

}

function setAppRoutes(){

	//The main route (regex matches / and /index.html)
	app.get('(/|/index.html)', function(req, res){
		res.sendFile(indexPage, {root:'./views'});
	});

	app.get('/robots.txt', function(req, res){
		res.type('text/plain');
		res.sendFile('robots.txt', {root:'./views'});
	});

	//Web form mail POST sender handler
	app.post('/vaguemestre', handleMailSending);

	//Handles any other routes accessed by any http method
	app.all('*', function(req, res){
		//Send 404 error
		res.sendFile( '404.html', {root:'./views'});
	});

}

/**
 * [handleMailSending Handle the POST request with data and send a mail to myself]
 * 
 * @param  {[object]} req 		[express request object]
 * @param  {[object]} res 		[express response object]
 * 
 * @return {[undefined]}     	[Just send back a response to the ajax request call]
 */
function handleMailSending(req, res){

	var mailSubject = (req.body.subject === '') ? hostName + ' : no subject' : hostName + ' : ' + req.body.subject; 

	//Setting mail options from the front end form POST data 
	mailOptions.from = req.body.author;
	mailOptions.subject = mailSubject + ' - ' + req.body.authorMail;
	mailOptions.html = '<p>' + req.body.content + '<p>';

	//Sending the mail
	transporter.sendMail(mailOptions, function(error){
		
		if(error){

			//Returning fail to ajax request
			res.send('fail');
			res.end();
		
		}else{

			//The mail has been sent, everything went fine
			res.send('ok');
			res.end();

		}

		//Reset mailOptions object properties
		mailOptions.from = '';
		mailOptions.subject = '';
		mailOptions.html = '';

	});

}

exports.start = function(config){
	startServer(config);
};
