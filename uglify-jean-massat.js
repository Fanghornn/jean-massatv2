var fs = require('fs');
var uglifycss = require('uglifycss');
var UglifyJS = require('uglify-js');

/**
 * JS
 */
var tmpMinified = '';
var finalScriptPath = './static/js/site.min.js';
var temporaryFilePath = './temporary.js';
var finalResult = '';
var scriptList = [
	'./src/js/libs/jquery.1.11.1.min.js',
	'./src/js/plugins/jquery.appear.min.js',
	'./src/js/plugins/jquery.mousewheel-3.0.6.pack.js',
	'./src/js/plugins/jquery.bxslider/jquery.bxslider.min.js',
	'./src/js/plugins/jquery.fancybox/jquery.fancybox.pack.js',
	'./src/js/plugins/jquery.customscroll/jquery.mCustomScrollbar.concat.min.js',
	'./src/js/plugins/jquery.mousewheel-3.0.6.pack.js',
	'./src/js/plugins/jquery.owlcarousel/owl.carousel.min.js',
	'./src/js/plugins/alertify.min.js',
	'./src/js/plugins/isotope.pkgd.min.js',
	'./src/js/plugins/imagesloaded.pkgd.min.js',
	'./src/js/site.js',
	'./src/js/MailHandler.js'
];

console.log('\n Making all JavaScript files into a temporary one...');

//Now we're gonna itterate through all .js files that we need and make just one big ass one
for (var i = 0; i < scriptList.length; i++) {

	tmpMinified += fs.readFileSync(scriptList[i], 'utf8');

}

//Writing combined js files in a temporary file
fs.writeFileSync(temporaryFilePath, tmpMinified);

console.log('\n "' + temporaryFilePath +'" successfuly written !');

console.log('\n Launching now JavaScript compress please wait...');

//Compressing
finalResult = UglifyJS.minify(temporaryFilePath, {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	}
});

//Writing result in static js path
fs.writeFileSync(finalScriptPath, finalResult.code);

console.log('\n All of the JavaScript files has been successfuly compressed in: ' + finalScriptPath + ' !');

//Removing temporary js file on the server
fs.unlinkSync(temporaryFilePath);

console.log('\n "' + temporaryFilePath +'" has been successfuly removed !\n\n\n');

/**
 * CSS
 */
var styleResult = '';
var cssPath = './static/css/style.min.css';
var styleList = [
	'./src/css/map-icons.css',
	'./src/css/icomoon.css',
	'./src/css/alertify.css',
	'./src/js/plugins/jquery.bxslider/jquery.bxslider.css',
	'./src/js/plugins/jquery.customscroll/jquery.mCustomScrollbar.min.css',
	'./src/js/plugins/jquery.fancybox/jquery.fancybox.css',
	'./src/js/plugins/jquery.owlcarousel/owl.carousel.css',
	'./src/js/plugins/jquery.owlcarousel/owl.theme.css',
	'./src/css/green.css',
	'./src/css/style.css'
];
temporaryFilePath = './temporary.css';

//Reset tmpMinified content
tmpMinified = '';

console.log('\n Making all CSS files into a temporary one...');

//Now we're gonna itterate through all CSS files that we need and make just one big ass one
for (i = 0; i < styleList.length; i++) {

	tmpMinified += fs.readFileSync(styleList[i], 'utf8');

}

//Writing combined CSS files in a temporary file
fs.writeFileSync(temporaryFilePath, tmpMinified);

console.log('\n "' + temporaryFilePath +'" successfuly written !');

console.log('\n Launching now CSS compress please wait...');

//Getting all css files that needs to be compressed and launch compress task
styleResult = uglifycss.processFiles(
	[temporaryFilePath],
	{ maxLineLen: 500, expandVars: true }
);

//Writing result in static css path
fs.writeFileSync(cssPath, styleResult);

console.log('\n All of the JavaScript files has been successfuly compressed in: ' + cssPath + ' !');

//Removing temporary js file on the server
fs.unlinkSync(temporaryFilePath);

console.log('\n "' + temporaryFilePath +'" has been successfuly removed !');