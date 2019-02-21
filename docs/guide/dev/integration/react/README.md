---
category: integration
order: 50
url: guide/dev_react
menu-title: React Integration
meta-title-short: React Integration
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# React Integration

<info-box info=""> This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-react"><code>ckeditor4-react</code> npm package</a>.
</info-box>

CKEditor offers native React integration through `CKEditor` React component. It provides deep integration of CKEditor and React that lets you use the native features of CKEditor inside React component. The `CKEditor` React component is compatible with React versions 16.0+.

## Basic Usage

In order to create editor instance in React, install `ckeditor4-react` npm package as a dependency of your project:

```bash
npm install --save ckeditor4-react
```

After installing, `CKEditor` React component can be imported in JS code:

```javascript
import CKEditor from 'ckeditor4-react';
```

Example `App` component featuring `CKEditor` would look like the following:

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

The `data` property used in the above example is responsible for setting the editor's data.

## Customizing CKEditor Preset or Version

By default `CKEditor` React component loads standard preset of the latest CKEditor release from <a href="https://cdn.ckeditor.com/">CDN</a> while creating the first editor. This behavior can be altered by changing the value of `CKEditor.editorUrl` variable to point to desired CKEditor location:

```javascript
CKEditor.editorUrl = 'https://your-website.example/ckeditor/ckeditor.js';
```

Note that variable has to be assigned **before first component is initialized**.

Alternatively you can load CKEditor before loading `CKEditor` React component. In that case the component will use the already loaded CKEditor:

```html
<script src="custom-ckeditor.js"></script>
<script src="node_modules/react/react.production.min.js"></script>
<script src="node_modules/react-dom/react-dom.production.min.js"></script>
<script src="node_modules/ckeditor4-react/dist/ckeditor.js"></script>
<script src="app.js"></script>
```

## Choosing Editor Type

By default `CKEditor` React component creates {@link guide/dev/framed/README classic editor}. To create {@link guide/dev/inline/README inline editor} `type` property with value of `inline` must be added:

```jsx
<CKEditor
	data="<p>Some initial data</p>"
	type="inline"
/>
```

You can also explicitly set `type` property to `classic` to create the classic editor:

```jsx
<CKEditor
	data="<p>Some initial data</p>"
	type="classic"
/>
```

Every other value of `type` property will be treated as `classic`.

### Changing Editor Configuration

Custom configuration can be passed to the editor via `config` property of `CKEditor` React component. The following example shows {@link guide/dev/features/toolbar/README how to change the contents of the toolbar}:

```jsx
<CKEditor
	data="<p>Editor' content</p>"
	config={ {
		toolbar: [ [ 'Bold' ] ]
	} }
/>
```

{@linkapi CKEDITOR.config All configuration} options can be changed this way.

There is also additional way to set the {@link guide/dev/features/readonly/README read-only mode} via `readOnly` property:

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	readOnly={true}
/>
```

This property takes precedence over {@linkapi CKEDITOR.config#readOnly `config.readOnly`} setting.

## Event Handlers

`CKEditor` React component allows to bind any event handler to the editor via properties that starts with `on`. The `on` is followed by the name of the event with capitalized first letter, e.g. event handler for {@linkapi CKEDITOR.editor.change `change` event} would be written as `onChange`:

```jsx
<CKEditor
	data="<p>Editor's content</p>"
	onChange={evt => console.log( evt )}
/>
```

## Data Binding

Wrapping `CKEditor` React component in another component allows to create two-way binding between editor's data and content of the external elements. This way updating the editor will update the elements and vice versa:

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
						Change val:
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
				<h2>Rendered content:</h2>
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

In most cases there is no need to break the encapsulation provided by `CKEditor` React component as editor's configuration and events handlers are configurable via component's properties. However If you need access to the {@linkapi CKEDITOR.editor } object, you can use the `editor` property of the component's instance:

```javascript
component.editor.getData();
```

Please note that this property is initialised asynchronously, after mounting the component.
