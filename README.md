#nodebob

nodebob is a **build tool** for **node-webkit** written in nodejs.

Write your node-webkit project inside the `app` folder and build your desktop application in just one click!

* nodebob creates the folder `output` that contains all the necessary files to build a standalone application without dependencies
* you can also add your custom application icon in `app/app.ico`
    
**node-webkit** is an app runtime based on `Chromium` and `node.js`.

> You can write native apps in HTML and Javascript with node-webkit. It also lets you to call Node.js modules directly from DOM and enables a new way of writing native applications with all Web technologies.

>**Features**

>* Apps written in modern HTML5, CSS3, JS and WebGL.
* Complete support for Node.js APIs and all its third party modules.
* Good performance: Node and WebKit runs in the same thread: Function calls are made straightforward;
* objects are in the same heap and can just reference each other;
* Easy to package and distribute apps.
* Available on Linux, Mac OSX and Windows

> [source] [node-webkit]

##Configuration

You may save different build profiles in `config.json` and switch between them by changing the `activeProfile` property. Paths are relatve, remember to escape backslash. The configuration options are:

**appName**: Your application's name. Will name the executable. *Default: `'app'`*  
**appPath**: Path to your app's root folder. *Default: `'app'`*  
**appIco**: Path to your ico. *Default: `'app\app.ico'`*  
**outputPath**: Path to output folder. *Default: `'output'`*  
**packagePath**: Path to the package file. *Default: `'output\app.nw'`*  
**ffmpegsumo**: Wether to include `ffmpegsumo.dll` in your app. *Default: `true`*  
**libEGL**: Wether to include `libEGL.dll` in your app. *Default: `false`*  
**libGLESv2**: Wether to include `libGLESv2.dll` in your app. *Default: `false`*  
**keepPackage**: Wether to keep or delete the package file (.nw). *Default: `false`*

Include `ffmpegsumo.dll` in your output if you want to use `<video>` and `<audio>` tags. Include `libEGL.dll` and `libGLESv2.dll` if you are using WebGL.

##Tech

nodebob uses a number of open source projects to work properly:

* [7-zip] - a lightware file archiver, v9.20
* [Anolis Resourcer] - a windows resource editor, v0.9.0
* [node-webkit] - v0.5.1-win32

##Dependencies

You need nodejs installed in your system.

##Version

0.2.0

##Windows versions

Tested on ```Windows 7 x64```.

##Quick start

**Install**

```git clone https://github.com/geo8bit/nodebob.git nodebob```

**Run**

Execute ```nodebob/build.bat```

##License

[MIT]

[node-webkit]: https://github.com/rogerwang/node-webkit
[7-zip]: http://www.7-zip.org/
[Anolis Resourcer]: http://www.anol.is/
[MIT]: http://opensource.org/licenses/MIT
[node-webkit]: https://github.com/rogerwang/node-webkit#introduction 