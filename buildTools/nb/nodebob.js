var shell = require('shelljs'),
	fs = require('fs');

var echo = console.log;

function fixSpaces(arr) {
	for (i in arr) {
		if (arr[i].indexOf(' ') > -1) {
			arr[i] = arr[i].replace(' ','');
			arr[i] = arr[i].splice(0,6) + '~1';
		}
	}
	return arr;
}

function initConfig(config) {
	var profile = config.profiles[config.activeProfile];
	this.appName		= profile.appName || this.appName;
	this.appPath		= profile.appPath || this.appPath;
	this.appIco			= profile.appIco || this.appIco;
	this.outputPath 	= profile.outputPath || this.outputPath;
	this.ffmpegsumo		= profile.ffmpegsumo || this.ffmpegsumo;
	this.libEGL			= profile.libEGL || this.libEGL;
	this.libGLESv2		= profile.libGLESv2 || this.libGLESv2;
	this.keepPackage	= profile.keepPackage || this.keepPackage;
	this.packagePath	= profile.packagePath || this.packagePath;
	return this;
}

// H/C default configuration
initConfig.prototype = {
    "appName"		: "app",
    "appPath"		: "app",
    "appIco"		: "app\\app.ico",
    "outputPath"	: "output",
	"packagePath"	: "output\\app.nw",
    "ffmpegsumo"	: true,
    "libEGL"		: false,
    "libGLESv2"		: false,
    "keepPackage"	: false
};

function initPaths(profile) {
	var paths = {};
	paths.basePath = function () {
		bP = shell.pwd().split('\\');
		bP = bP.splice(0,bP.length-2);
		//bP = fixSpaces(bP);
		bP = bP.join('\\');
		return bP;
	}();
	paths.packagePath 	= [paths.basePath, profile.packagePath].join('\\');
	paths.exePath 		= [paths.basePath, profile.outputPath, profile.appName + '.exe'].join('\\');
	paths.icoPath 		= [paths.basePath, profile.appIco].join('\\');
	paths.nwPath 		= [paths.basePath, 'buildTools', 'nw', 'nw.exe'].join('\\');
	paths.appPath 		= [paths.basePath, profile.appPath, '*'].join('\\');
	return paths;
}

function initCommands(profile) {
	var result = {
		zip			: [paths.basePath + '\\buildTools\\7z\\' + '7z a -tzip', paths.packagePath, paths.appPath],
		res			: [paths.basePath + '\\buildTools\\ar\\' + 'resourcer -op:upd -src:' + paths.exePath, '-type:14 -name:IDR_MAINFRAME -file:' + paths.icoPath],
		copy		: ['copy /y', paths.nwPath, paths.exePath],
		merge		: ['copy /y /b', paths.nwPath, '+', paths.packagePath, paths.exePath],
		ffmpegsumo 	: ['copy /y', paths.basePath + '\\buildTools\\nw\\ffmpegsumo.dll', paths.basePath + '\\' + profile.outputPath + '\\ffmpegsumo.dll'],
		libEGL 		: ['copy /y', paths.basePath + '\\buildTools\\nw\\libEGL.dll', paths.basePath + '\\' + profile.outputPath + '\\libEGL.dll'],
		libGLESv2 	: ['copy /y', paths.basePath + '\\buildTools\\nw\\libGLESv2.dll', paths.basePath + '\\' + profile.outputPath + '\\libGLESv2.dll'],
		icudt 		: ['copy /y', paths.basePath + '\\buildTools\\nw\\icudt.dll', paths.basePath + '\\' + profile.outputPath + '\\icudt.dll'],
		nwpak 		: ['copy /y', paths.basePath + '\\buildTools\\nw\\nw.pak', paths.basePath + '\\' + profile.outputPath + '\\nw.pak'],
		del 		: ['del', paths.packagePath],
		exec 		: function(c,m) {
			if (m) echo(m);
			shell.exec(this[c].join(' '));
		}
	}
	return result;
}


fs.readFile('../../config.json', 'utf8', function (err,data) {
	if (err) return console.log(err);
	echo('\n..:: nodebob v0.2 ::..');
	echo('\na build tool for node-webkit');

	// get user options
	var config = JSON.parse(data);
	var profile = new initConfig(config);

	// init 
	paths = initPaths(profile);
	commands = initCommands(profile);

	// run 	/*
	shell.cd(paths.basePath);
	commands.exec('zip', '\n:: Creating package ::...');
	commands.exec('copy','\n:: Creating executable ::...');
	commands.exec('res');
	commands.exec('merge');
	commands.exec("icudt", '\n:: Copying files ::...');
	commands.exec("nwpak");
	if (profile.ffmpegsumo)		commands.exec("ffmpegsumo");
	if (profile.libEGL) 		commands.exec("libEGL");
	if (profile.libGLESv2) 		commands.exec("libGLESv2");
	if (!profile.keepPackage)	commands.exec("del", '\n:: Deleting temporary files ::...\n');

	echo('\n:: Done! ::'); /**/
});
