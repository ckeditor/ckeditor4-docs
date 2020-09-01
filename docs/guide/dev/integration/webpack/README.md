---
category: integration
order: 40
url: guide/dev_webpack
menu-title: Webpack Integration
meta-title-short: Webpack Integration
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 WYSIWYG Editor Webpack Integration

<info-box info="">
	A working sample of the webpack integration is provided through the <a href="https://github.com/ckeditor/ckeditor4-webpack-template"><code>ckeditor4-webpack-template</code> GitHub template repository</a>. It can be used as a quick starting point for your project.
</info-box>

Integrating CKEditor 4 with webpack requires a few simple steps to prepare a correct webpack configuration for a working bundle.

## Basic Webpack Integration

In order to use CKEditor 4 with webpack, create a new project:

```
mkdir ckeditor4-webpack
cd ckeditor4-webpack
npm init -y
```

After creating the project, install the necessary development dependencies:

```
npm install --save-dev ckeditor4 webpack webpack-cli
```

After installing, create the webpack configuration in the `webpack.config.js` file. A configuration example is presented below:

```js
'use strict';

const path = require( 'path' );

module.exports = {
	mode: 'production',
	devtool: 'source-map',

	entry: path.resolve( __dirname, 'src', 'index.js' ),

	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'app.js',
		libraryTarget: 'umd'
	}
};
```

The next step is creating the source code, which will be contained in two files: `src/basePath.js` and `src/index.js`. The main file, `src/index.js`, should look like below:

```js
import './basePath.js';
import 'ckeditor4';

// Insert your code here.
// The code below is an example of using CKEditor 4.
CKEDITOR.replace( 'app', {
	extraPlugins: 'iframe'
} );
```

The remaining file, `src/basePath.js`, will be used to set the correct path to CKEditor 4:

```js
window.CKEDITOR_BASEPATH = '/node_modules/ckeditor4/';
```

This variable needs to be in a separate file that has to be loaded before the `ckeditor4` package. This is needed to bypass the way in which webpack works, moving all imports before the code containing them.

<info-box info="">
	Please note that such approach requires deploying the `node_modules/ckeditor4/` directory with the rest of the application. To avoid that, you can use the <a href="https://github.com/ckeditor/ckeditor4-webpack-template"><code>ckeditor4-webpack-template</code> GitHub template repository</a> which copies all the necessary files directly to the `dist/` directory.
</info-box>

The final step is to build the application containing CKEditor 4 WYSIWYG editor:

```js
npx webpack
```

The bundled code will appear in the `dist/app.js` file. It can be used on a webpage like a normal script:

```html
<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>CKEditor 4 webpack sample</title>
		</head>
		<body>
			<div id="app"></div>

			<script src="<path to your project>/dist/app.js"></script>
		</body>
	</html>
```

## CKEditor 4 Webpack Integration Template

A more complex integration, featuring transpiling the code with Babel and minimizing with Terser, is available in the dedicated [`ckeditor4-webpack-template` GitHub template repository](https://github.com/ckeditor/ckeditor4-webpack-template). It can be used as a starting point for web application projects.
