shell = require('shelljs');

var echo = console.log;

// PATHS

var paths = {};
paths.basePath = function () {
	r = shell.pwd().split('\\');
	r = r.splice(0,r.length-2).join('\\');
	r += '\\';
	return r
}();
paths.packagePath 	= paths.basePath + 'release\\app.nw';
paths.exePath 		= paths.basePath + 'release\\app.exe';
paths.icoPath 		= paths.basePath + 'app\\app.ico';
paths.nwPath 		= paths.basePath + 'buildTools\\nw\\nw.exe';
paths.appPath 		= paths.basePath + 'app\\*';

// COMMANDS

var commandsCnt = function() {
	this.zip		= paths.basePath + 'buildTools\\7z\\' + '7z a -tzip ' + paths.packagePath + ' ' + paths.appPath;
	this.ar			= paths.basePath + 'buildTools\\ar\\' + 'resourcer -op:upd -src:' + paths.exePath + ' -type:14 -name:IDR_MAINFRAME -file:' + paths.icoPath;
	this.copy		= 'copy /b /y ' + paths.nwPath + ' ' + paths.exePath;
	this.merge		= 'copy /b /y ' + paths.exePath + ' + ' + paths.packagePath + ' ' + paths.exePath;
	this.ffmpegsumo = 'copy /y ' + paths.basePath + '\\buildTools\\nw\\ffmpegsumo.dll ' + paths.basePath + '\\release\\ffmpegsumo.dll';
	this.libEGL 	= 'copy /y ' + paths.basePath + '\\buildTools\\nw\\libEGL.dll ' + paths.basePath + '\\release\\libEGL.dll';
	this.libGLESv2 	= 'copy /y ' + paths.basePath + '\\buildTools\\nw\\libGLESv2.dll ' + paths.basePath + '\\release\\libGLESv2.dll';
	this.icudt 		= 'copy /y ' + paths.basePath + '\\buildTools\\nw\\icudt.dll ' + paths.basePath + '\\release\\icudt.dll';
	this.nwpak 		= 'copy /y ' + paths.basePath + '\\buildTools\\nw\\nw.pak ' + paths.basePath + '\\release\\nw.pak';
	this.del 		= 'del ' + paths.packagePath;
	this.exec 	= function(c,m) {
		if (m) echo(m);
		shell.exec(this[c]);
	}
}

// MAIN

shell.cd(paths.basePath);
var command = new commandsCnt();

echo('\n..:: nodebob v0.1 ::..');
echo('\na build tool for node-webkit');

command.exec('zip', '\n..:: Creating package ::..');
command.exec('copy','\n..:: Creating exec ::..');
command.exec('ar');
command.exec('merge');
command.exec("icudt", '\n..:: Copying files ::..');
command.exec("nwpak");
command.exec("ffmpegsumo");
command.exec("libEGL");
command.exec("libGLESv2");
command.exec("del", '\n..:: Deleting temporary files ::..');

echo('\n..:: Done!');