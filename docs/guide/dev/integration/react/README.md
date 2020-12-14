---
category: integration
order: 40
url: guide/dev_react
menu-title: React Integration
meta-title-short: React Integration
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 WYSIWYG Editor React Integration

<info-box info="">
	This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-react"><code>ckeditor4-react</code> npm package</a>.
</info-box>

CKEditor 4 offers a native React integration through the CKEditor 4 React component. It provides deep integration of CKEditor 4 and React that lets you use the native features of the WYSIWYG editor inside a React component. The CKEditor 4 React component is compatible with React versions 16.0+.

## Basic Usage

In order to create an editor instance in React, install the `ckeditor4-react` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-react
```

After installing, the CKEditor 4 React component can be imported in your JavaScript code:

```js
import CKEditor from 'ckeditor4-react';
```

An example `App` component featuring `CKEditor` would look like the following:

```jsx
import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h2>Using CKEditor 4 in React</h2>
				<CKEditor
					data="<p>Hello from CKEditor 4!</p>"
				/>
			</div>
		);
	}
}

export default App;
```

The `data` property used in the example above is responsible for setting the WYSIWYG editor's data.

## Customizing CKEditor Preset or Version

By default, the CKEditor 4 React component loads the [standard preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the [CDN](https://cdn.ckeditor.com/) when creating the first editor. This behavior can be altered by changing the value of the `CKEditor.editorUrl` variable to point to the desired CKEditor script location:

```js
CKEditor.editorUrl = 'https://your-website.example/ckeditor/ckeditor.js';
```

Note that the variable must be assigned **before the first component is initialized**.

Alternatively, you can load CKEditor before loading the CKEditor 4 React component. In this case the component will use the already loaded CKEditor:

```html
<script src="custom-ckeditor.js"></script>
<script src="node_modules/react/react.production.min.js"></script>
<script src="node_modules/react-dom/react-dom.production.min.js"></script>
<script src="node_modules/ckeditor4-react/dist/ckeditor.js"></script>
<script src="app.js"></script>
```

## Event Handlers

The CKEditor 4 React component allows you to bind any event handler to the editor with properties that start with `on`. The `on` is followed by the name of the event with the first letter capitalized, for example, an event handler for the {@linkapi CKEDITOR.editor.change `change` event} would be written as `onChange`:

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	onChange={evt => console.log( evt )}
/>
```

There are also two events handled as component properties: [onBeforeLoad](#onbeforeload) and [onNamespaceLoaded](#onnamespaceloaded).

## Data Binding

Wrapping the CKEditor 4 React component in another component allows to create a two-way binding between the editor's data and the content of external elements. This way updating the editor will update the elements and vice versa:

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

class TwoWayBinding extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data: '<p>React is really <em>nice</em>!</p>'
		};

		this.handleChange = this.handleChange.bind( this );
		this.onEditorChange = this.onEditorChange.bind( this );
	}

	onEditorChange( evt ) {
		this.setState( {
			data: evt.editor.getData()
		} );
	}

	handleChange( changeEvent ) {
		this.setState( {
			data: changeEvent.target.value
		} );
	}

	render() {
		return (
			<div>
				<CKEditor
					data={this.state.data}
					onChange={this.onEditorChange} />
					<label>
						Change value:
						<textarea defaultValue={this.state.data} onChange={this.handleChange} />
					</label>
					<EditorPreview data={this.state.data} />
			</div>
		);
	}
}

class EditorPreview extends Component {
	render() {
		return (
			<div className="editor-preview">
				<h2>Rendered content</h2>
				<div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
			</div>
		);
	}
}

EditorPreview.defaultProps = {
	data: ''
};

EditorPreview.propTypes = {
	data: PropTypes.string
};

export default TwoWayBinding;
```
## Editor Instance

In most cases there is no need to break the encapsulation provided by the CKEditor 4 React component as the editor configuration and event handlers can be configured with the component's properties. However, if you need access to the {@linkapi CKEDITOR.editor} object, you can use the `editor` property of the component's instance:

```js
component.editor.getData();
```

Please note that this property is initialised asynchronously, after mounting the component.

## Component Properties

### `config`

`Object`

Custom configuration can be passed to the editor with the `config` property of the CKEditor 4 React component. The following example shows {@link features/toolbar/README how to change the contents of the toolbar}:

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	config={ {
		toolbar: [ [ 'Bold' ] ]
	} }
/>
```

{@linkapi CKEDITOR.config All configuration} options can be changed this way.

Defaults to `{}`.

### `data`

`String`

Data to be used to initially fill editor content. It's passed to {@linkapi CKEDITOR.editor#setData} method with no additional arguments.

For example usage, look at [basic usage](#basic-usage) paragraph.

Defaults to `''`.

### `name`

`String`

If provided - became editor HTML element `id` and `name` properties.

```jsx
<CKEditor
	name="myeditor"
/>
```

Then in another place, it's possible to refer editor instance as:

```js
const editor = CKEDITOR.instances.myeditor;
```

Defaults to `undefined`.

### `readOnly`

`Boolean`

Set the {@link features/readonly/README read-only mode}:

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	readOnly={true}
/>
```

This property takes precedence over the {@linkapi CKEDITOR.config#readOnly `config.readOnly`} setting.

Defaults to `false`.

### `style`

`Object`

Style rules set that will be applied to {@linkapi CKEDITOR.editor#container editor container} with {@linkapi CKEDITOR.dom.element#setStyles}.

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	style={{
		'margin-top': '100px',
		'border': '5px solid red'
	}}
/>
```

Require [type](#type) to be `classic`.

Defaults to `undefined`.

### `type`

`'classic'` | `'inline'`

By default, the CKEditor 4 React component creates a {@link guide/dev/framed/README classic editor}. To create an {@link guide/dev/inline/README inline editor}, add the `type` property with the value of `inline` to the `<CKEditor />` tag:

```jsx
<CKEditor
	data="<p>Some initial data</p>"
	type="inline"
/>
```

You can also explicitly set the `type` property to `classic` to create the classic editor:

```jsx
<CKEditor
	data="<p>Some initial data</p>"
	type="classic"
/>
```

Every other value of the `type` property will be treated as `classic`.

For more details, look at {@link guide/dev/ckeditor_js_load/README Loading CKEditor Script article}.

Defaults to `'classic'`.

### `onBeforeLoad`

`Function`

Callback function with single argument: `CKEDITOR` namespace. It is invoked **each time new editor instance is loaded**, but `CKEDITOR` object always refers to the same namespace.

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	onBeforeLoad={ namespace => console.log( namespace ) }
/>
```

Look at [onNamespaceLoaded](#onnamespaceloaded) to compare behaviours.

### `onNamespaceLoaded`

`Function`

Callback function with single argument: `CKEDITOR` namespace. **Invoked single time after namespace loaded, regardless amount of editor instances**.

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	onNamespaceLoaded={ CKEDITOR => {
			// Add external `placeholder` plugin which will be available for each
			// editor instance on the page.
			CKEDITOR.plugins.addExternal( 'placeholder', '/path/to/the/placeholder/plugin', 'plugin.js' );
		}
	}
/>
```

## CKEditor 4 React Integration Demo

See the {@linkexample react working "CKEditor 4 React Integration" sample} that showcases the most important features of the integration, including choosing the editor type, configuration and events, or setting up two-way data binding.
