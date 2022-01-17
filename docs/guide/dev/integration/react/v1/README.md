---
category: react-integration
order: 30
url: guide/dev_react_v1
menu-title: v1
meta-title-short: v1
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 React Integration - v1

<info-box warning="">
	**There is a newer version of React Integration available!** This version will be receiving important fixes only. We strongly encourage everyone to migrate to {@link guide/dev/integration/react/v2/README#migration-from-v1-to-v2 v2}.
</info-box>

<info-box info="">
	This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-react"><code>ckeditor4-react</code> npm package</a>.
</info-box>

CKEditor 4 offers a native React integration through the CKEditor 4 React component. It provides a deep integration of CKEditor 4 and React that lets you use the native features of the WYSIWYG editor inside a React component. The CKEditor 4 React component is compatible with React v16.0.x and higher. However, for React 16.8 or higher we strongly advise to use {@link guide/dev/integration/react/v2/README CKEditor 4 React Integration - v2}

## Basic Usage

In order to create an editor instance in React, install the `ckeditor4-react` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-react@1
```

After installing, the CKEditor 4 React component can be imported in your JavaScript code:

```js
import CKEditor from 'ckeditor4-react';
```

An example `App` component featuring `CKEditor` would look like the following:

```js
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

By default, the CKEditor 4 React component loads the [standard-all preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the [CDN](https://cdn.ckeditor.com/) when creating the first editor. This behavior can be altered by changing the value of the `CKEditor.editorUrl` variable to point to the desired CKEditor script location:

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

```html
<CKEditor
	data="<p>Editor's content</p>"
	onChange={evt => console.log( evt )}
/>
```

There are also two events not present in CKEditor 4 but available in CKEditor 4 React component by default: [onBeforeLoad](#onbeforeload) and [onNamespaceLoaded](#onnamespaceloaded).

## Data Binding

Wrapping the CKEditor 4 React component in another component allows to create a two-way binding between the editor's data and the content of external elements. This way updating the editor will update the elements and vice versa:

```js
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

```html
<CKEditor
	data="<p>Editor's content</p>"
	config={ {
		toolbar: [ [ 'Bold' ] ]
	} }
/>
```

All {@linkapi CKEDITOR.config configuration options} can be changed this way.

Defaults to `{}`.

### `data`

`String`

Data to be used to initially fill editor content. It's passed to {@linkapi CKEDITOR.editor#setData} method with no additional arguments.

For example usage, refer to [Basic Usage](#basic-usage) section above.

Defaults to `''`.

### `name`

`String`

Provides value for `id` and `name` properties of editor's HTML element.

```html
<CKEditor
	name="myeditor"
/>
```

Then it is possible to refer to editor instance like this:

```js
const editor = CKEDITOR.instances.myeditor;
```

The editor element is also accessible via the [component](#editor-instance) itself.

### `readOnly`

`Boolean`

Sets the {@link features/readonly/README read-only mode}:

```html
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

```html
<CKEditor
	data="<p>Editor's content</p>"
	style={{
		'margin-top': '100px',
		'border': '5px solid red'
	}}
/>
```

Requires component [type](#type) property to be `classic`.

### `type`

`'classic'` | `'inline'`

By default, the CKEditor 4 React component creates {@link guide/dev/framed/README classic editor}. To create an {@link guide/dev/inline/README inline editor}, add the `type` property with the value of `inline` to the `<CKEditor />` tag:

```html
<CKEditor
	data="<p>Some initial data</p>"
	type="inline"
/>
```

You can also explicitly set the `type` property to `classic` to create the classic editor:

```html
<CKEditor
	data="<p>Some initial data</p>"
	type="classic"
/>
```

Every other value of the `type` property will be treated as `classic`.

For more details, look at the {@link guide/dev/ckeditor_js_load/README Loading CKEditor Script article}.

Defaults to `'classic'`.

### `onBeforeLoad`

`Function`

Callback function with single argument: `CKEDITOR` namespace. It is invoked **each time new editor instance is loaded**, but `CKEDITOR` object always refers to the same namespace.

**Note**: To modify `CKEDITOR` namespace it is recommended to use [onNamespaceLoaded](#onnamespaceloaded) event.

Simple usage example:

```html
<CKEditor
	data="<p>First editor.</p>"
	onBeforeLoad={ CKEDITOR => {
			console.log( 'First editor loaded!' );
		}
	}
/>

<CKEditor
	data="<p>Second editor.</p>"
	onBeforeLoad={ CKEDITOR => {
			console.log( 'Second editor loaded!' );
		}
	}
/>
```

<info-box warning>
	Example which shows incorrect usage - it attempts to load the same plugin two times adding it to the same namespace:
</info-box>

```html
<CKEditor
	name="editorOne"
	data="<p>Editor's content</p>"
	onBeforeLoad={ CKEDITOR => {
			// Add external `placeholder` plugin which will be available for each
			// editor instance on the page.
			CKEDITOR.plugins.addExternal( 'placeholder', '/path/to/the/placeholder/plugin', 'plugin.js' );
		}
	}
/>

<CKEditor
	name="editorTwo"
	data="<p>Editor's content</p>"
	onBeforeLoad={ CKEDITOR => {
			// Namespace was already loaded, but this callback will be called anyway.
			// Unnecessary adding the same plugin to the namespace.
			CKEDITOR.plugins.addExternal( 'placeholder', '/path/to/the/placeholder/plugin', 'plugin.js' );
		}
	}
/>
```


Look at [onNamespaceLoaded](#onnamespaceloaded) property to compare behaviors.

### `onNamespaceLoaded`

`Function`

Callback function with a single argument: `CKEDITOR` namespace. **It is invoked exactly once regardless the number of editor instances. It is called after `CKEDITOR` namespace is loaded and before any editor instances are initialized**.

This property should be used if you need to modify the `CKEDITOR` object, e.g. add an external plugin:

```html
<CKEditor
	name="editorOne"
	data="<p>Editor's content</p>"
	onNamespaceLoaded={ CKEDITOR => {
			// Add external `placeholder` plugin which will be available for each
			// editor instance on the page.
			CKEDITOR.plugins.addExternal( 'placeholder', '/path/to/the/placeholder/plugin', 'plugin.js' );
		}
	}
/>

<CKEditor
	name="editorTwo"
	data="<p>Editor's content</p>"
	onNamespaceLoaded={ CKEDITOR => {
			// If namespace was already loaded, this callback will be never called!
			// There will be only one attempt to add external plugin.
			CKEDITOR.plugins.addExternal( 'placeholder', '/path/to/the/placeholder/plugin', 'plugin.js' );
		}
	}
/>
```

Look at [onBeforeLoad](#onbeforeload) property to compare behaviors.
