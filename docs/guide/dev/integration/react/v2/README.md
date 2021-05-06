---
category: react-integration
order: 40
url: guide/dev_react_v2
menu-title: React Integration v2
meta-title-short: React Integration v2
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 React Integration - v2

<info-box info="">
	This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-react"><code>ckeditor4-react</code> npm package</a>.
</info-box>

CKEditor 4 offers a native React integration through the CKEditor 4 React component and hooks. It provides deep integration of CKEditor 4 and React that lets you use the native features of the WYSIWYG editor inside your React app. Our package is compatible with React versions 16.8.6 and newer.

## Basic Usage

In order to create an editor instance in React, install the `ckeditor4-react` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-react
```

This package exposes a high-level `CKEditor` component and a low-level `useCKEditor` hook. For simpler use cases `CKEditor` component should be a go-to solution. For advanced cases consider using `useCKEditor` hook. An example React component featuring `CKEditor` would look like the following:

```js
import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div className="App">
			<h2>Using CKEditor 4 in React</h2>
			<CKEditor initData="<p>Hello from CKEditor 4!</p>" />
		</div>
	);
}

export default App;
```

## Customizing CKEditor Preset or Version

By default, the CKEditor 4 React integration (both `CKEditor` component and `useCKEditor` hook) loads the [standard-all preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the [CDN](https://cdn.ckeditor.com/) when creating the first editor. This behavior can be altered by using the `editorUrl` prop to point to the desired CKEditor script location:

```js
// Component
<CKEditor editorUrl="https://your-website.example/ckeditor/ckeditor.js" />

// Hook
const { editor } = useCKEditor( {
  ...props,
  editorUrl: "https://your-website.example/ckeditor/ckeditor.js"
} );
```

Please note that value of `editorUrl` must remain constant across all instances of editor.

## `CKEditor` component

## `useCKEditor` hook

## Utilities

## TypeScript support

## Library files

## Samples

## Migration from v1 to v2

In order to migrate...
