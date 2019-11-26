---
category: integration
order: 40
url: guide/dev_webpack
menu-title: Webpack Integration
meta-title-short: Webpack Integration
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 WYSIWYG Editor Webpack Integration

<info-box info="">
	The sample of the integration is provided through the <a href="https://github.com/ckeditor/ckeditor4-webpack-template"><code>ckeditor4-webpack-template</code> GitHub template repository</a>.
</info-box>

Out of the box CKEditor 4 does not work correctly after being bundled using webpack. However integrating CKEditor 4 and webpack is not difficult and this tutorial shows how to achieve it.

## Basic Integration

In order to use CKEditor 4 with webpack, start with creating the new project:

```sh
mkdir my-project
cd my-project
npm init -y
```

After creating the project, install necessary development dependencies:

```sh
npm install --save-dev ckeditor4 webpack webpack-cli
```

After installing, create webpack configuration in `webpack.config.js` file. Sample configuration is presented below:

```javascript
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

The next step is creating the source code, which will be contained in two files: `src/basePath.js` and `src/index.js`. The main file, `src/index.js`, should look like this:

```javascript
import './basePath.js';
import 'ckeditor4';

// Insert yout code here.
```

The remaining file, `src/basePath.js`, will contain only setting the correct path to CKEditor 4:

```javascript
window.CKEDITOR_BASEPATH = '/node_modules/ckeditor4/';
```

This variable has to be in the separate file to be loaded before `ckeditor4` package. It's needed to bypass the way in which webpack works, moving all imports before the code containing them.

The final step is to build the app containing CKEditor 4:

```javascript
npx webpack
```

The bundled code will appear in `dist/app.js` file.

## CKEditor 4 Webpack Integration Template

The more complex integration, featuring also transpiling the code with Babel and minimizing with Terser, is available in [`ckeditor4-webpack-template` GitHub template repository](https://github.com/ckeditor/ckeditor4-webpack-template). It can be used as a starting point for web apps projects.
