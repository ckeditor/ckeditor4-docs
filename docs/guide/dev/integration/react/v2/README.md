---
category: react-integration
order: 40
url: guide/dev_react_v2
menu-title: v2
meta-title-short: v2
---

<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 React Integration - v2

<info-box info="">
	This feature is provided through the <a href="https://www.npmjs.com/package/ckeditor4-react"><code>ckeditor4-react</code> npm package</a>.
</info-box>

CKEditor 4 offers a React integration through library described below. By providing a deep integration of CKEditor 4 and React we let you use the native features of the WYSIWYG editor inside your React app. This package is compatible with React version 16.8 or higher.

## Basic Usage

In order to create an editor instance in React, install the `ckeditor4-react` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-react
```

Note that `react` is a peer dependency and `ckeditor4` is an **optional** peer dependency.

This package exposes a high-level `CKEditor` component and a low-level `useCKEditor` hook. For simpler use cases `CKEditor` component should be a go-to solution. For advanced cases consider using `useCKEditor` hook.

An example React app featuring `CKEditor` component would look like the following:

```js
import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div className="App">
			<h2>Using CKEditor 4 in React</h2>
			<CKEditor
				initData={<p>Hello from CKEditor 4!</p>}
				onInstanceReady={ () => {
					alert( 'Editor is ready!' );
				} }
			/>
		</div>
	);
}

export default App;
```

## Customizing CKEditor Preset or Version

By default, the CKEditor 4 React integration loads the [standard-all preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the [CDN](https://cdn.ckeditor.com/) when creating the first editor. This behavior can be altered by using the `editorUrl` prop to point to the desired CKEditor script location:

```js
// Hook
const { editor } = useCKEditor( {
	...props,
	editorUrl: 'https://your-website.example/ckeditor/ckeditor.js'
} );

// Component
const component = (
	<CKEditor
		{...props}
		editorUrl="https://your-website.example/ckeditor/ckeditor.js"
	/>
);
```

Value of `editorUrl` must remain constant across all instances of editor.

## CKEditor component

The `CKEditor` component is a wrapper around low-level `useCKEditor` hook.

### API

The component's API exposes initial configuration options such as `config`, `editorUrl`, or `initData` as well as editor's event handlers. If you find `CKEditor` component's capabilities insufficient, consider using a more flexible `useCKEditor` hook.

| Prop             | Type                  | Default                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------- | --------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config           | object                | `{}`                                     | Config object passed to editor's constructor.<br> See config details {@linkapi CKEDITOR.config here}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| debug            | bool                  | `undefined`                              | Toggles debugging mode. Use it to log info related to editor events.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| editorUrl        | string                | link to [CDN](https://cdn.ckeditor.com/) | Url to CKEditor script.<br> See [Customizing CKEditor Preset or Version](#customizing-ckeditor-preset-or-version).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| initData         | node                  | `undefined`                              | Editor's content will be populated with `initData` once it's initialized.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| name             | string                | `undefined`                              | A unique identifier of editor instance.<br> See details {@linkapi CKEDITOR.editor#property-name here}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `on${EventName}` | func                  | `undefined`                              | Handlers for events specified under [events](../api/CKEDITOR_editor.html#events) section are accepted as props in the form `on${EventName}`, e.g. to handle `instanceReady` event, use `onInstanceReady` property. Each event handler has {@linkapi CKEDITOR.eventInfo event info} passed as an argument. In addition to native editor events, component supports custom events as well, e.g. `customEvent` is handled with `onCustomEvent` property.<br> Two more events are provided by the React integration: `namespaceLoaded` and `beforeLoad`. The first one is fired only once, when the `CKEDITOR` global namespace is loaded while the latter is fired right before any instance of editor is created. Both handlers receive `CKEDITOR` object as argument. |
| readOnly         | bool                  | `undefined`                              | Starts editor in read-only mode. Equivalent of adding `{ readOnly: true }` to config but takes precedence over it.<br> Also allows to toggle editor's `read-only` mode on runtime.<br> See details {@linkapi CKEDITOR.config#cfg-readOnly here}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| style            | object                | `undefined`                              | Sets editor container's styles. Styles can be also modified on runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type             | `classic` \| `inline` | `classic`                                | Initializes editor in either `classic` or `inline` mode.<br> See details for classic type {@linkapi CKEDITOR#method-replace here} and for inline type {@linkapi CKEDITOR#method-inline here}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

```js
const component = (
	<CKEditor
		config={configObject}
		debug={true}
		editorUrl="https://your-website.example/ckeditor/ckeditor.js"
		initData={<p>Hello from CKEditor 4!</p>}
		name="my-ckeditor"
		onNamespaceLoaded={ CKEDITOR => {
			// Handles `namespaceLoaded` event which is fired once the CKEDITOR namespace is loaded.
			// This event is emitted only once.
		} }
		onBeforeLoad={ CKEDITOR => {
			// Handles `beforeLoad` event which is fired before an editor instance is created.
		} }
		onInstanceReady={ ( { editor } ) => {
			// Handles native `instanceReady` event.
		} }
		onFocus={ ( { editor } ) => {
			// Handles native `focus` event.
		} }
		onCustomEvent={ ( { editor } ) => {
			// Handles custom `customEvent` event.
		} }
		{...otherEventHandlers}
		readOnly={false}
		style={ { borderColor: 'blue' } }
		type="classic"
	/>
);
```

## useCKEditor hook

The `useCKEditor` hook constitutes the core of CKEditor 4 React integration. It can be used to cover more advanced use cases or build more specialized hooks and components. As a matter of fact, `CKEditor` component is built on top of `useCKEditor` hook.

### API

Props:

| Prop          | Type                  | Default                                  | Description                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config        | object                | `{}`                                     | Config object passed to editor's constructor.<br> See config details {@linkapi CKEDITOR.config here}.                                                                                                                                                                                                                                             |
| debug         | bool                  | `undefined`                              | Toggles debugging mode. Use it to log info related to editor events.                                                                                                                                                                                                                                                                                                                          |
| dispatchEvent | func                  | `undefined`                              | Dispatches editor events.<br> Pass a custom function or `dispatch` from `useReducer`. Event type and payload will be passed as part of the first argument: `({ type, payload }) => { ... }`. Event name is provided as `type` and its value is prefixed with `__CKE__` in order to facilitate integration with `useReducer`. Use `CKEditorEventAction` helper to access prefixed event names. |
| editorUrl     | string                | link to [CDN](https://cdn.ckeditor.com/) | See [Customizing CKEditor Preset or Version](#customizing-ckeditor-preset-or-version).                                                                                                                                                                                                                                                                                                        |
| element       | object                | `undefined`                              | Required. Reference to underlying to DOM element.                                                                                                                                                                                                                                                                                                                                              |
| type          | `classic` \| `inline` | `classic`                                | Initializes editor in either `classic` or `inline` mode.<br> See details for classic type {@linkapi CKEDITOR#method-replace here} and for inline type {@linkapi CKEDITOR#method-inline here}.                                                                                                         |
| subscribeTo   | array                 | `undefined`                              | List of editor [events](../api/CKEDITOR_editor.html#events) to subscribe to, e.g. `[ 'focus', 'blur' ]`. Accepts custom editor events. In addition, `namespaceLoaded` and `beforeLoad` can be passed as well.<br> Only specified events will be dispatched through `dispatchEvent` function.<br> If omitted, all events will be dispatched.                       |

Result:

| Prop    | Type                                             | Default     | Description                                                                                                                                                                                                                     |
| ------- | ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| editor  | object                                           | `undefined` | Editor instance. Defaults to `undefined` (before editor is initialized).<br> See editor instance details {@linkapi CKEDITOR.editor here}.                                           |
| status  | `unloaded` \| `loaded` \| `ready` \| `destroyed` | `undefined` | Current status of editor. Equivalent of `editor.status`.<br> See status details {@linkapi CKEDITOR.editor#property-status here}.                                                    |
| error   | bool                                             | `false`     | Indicates that an error occurred during editor creation.<br> This is a non-recoverable state. It indicates that something wrong happened during instantiation of editor, e.g. incorrect `editorUrl` or `element` were provided. |
| loading | bool                                             | `false`     | Indicates that CKEditor script is being loaded from a remote url.                                                                                                                                                               |

```js
const { editor, status, error, loading } = useCKEditor( {
	config: configObject,
	debug: true,
	dispatchEvent: ( { type, payload } ) => {
		if ( type === CKEditorEventAction.instanceReady ) {
			alert( 'Editor is ready!' );
		}
	},
	editorUrl: 'https://your-website.example/ckeditor/ckeditor.js',
	element: elementObject,
	type: 'classic',
	subscribeTo: [ 'instanceReady' ]
} );
```

### dispatchEvent explained

By providing `dispatchEvent` function, the `useCKEditor` hook's API unlocks more powerful patterns than `CKEditor` component has to offer.

For instance, pass `dispatch` from `useReducer` in order to listen to editor events and derive state of your components as needed.

In the example below, `reducer` is used to calculate next state of the component.

```js
import React from 'react';
import { CKEditorEventAction, useCKEditor } from 'ckeditor4-react';

function Editor( { dispatchEvent, initData } ) {
	// Use `useState` rather than `useRef` in order to trigger re-render.
	const [ element, setElement ] = React.useState();

	const { status } = useCKEditor( {
		element,
		dispatchEvent,
		subscribeTo: [ 'blur', 'change', 'focus' ]
	} );

	return (
		<div
			ref={setElement}
			style={status !== 'ready' ? { visibility: 'hidden' } : undefined}
		>
			{initData}
		</div>
	);
}

function Feedback() {
	// `dispatch` can be passed directly to `useCKEditor` hook.
	const [
		{ canSendFeedback, data, isUserEditing },
		dispatch
	] = React.useReducer( reducer, {
		canSendFeedback: false,
		data: undefined,
		isUserEditing: false
	} );

	const handleClick = () => {
		alert( `Feedback has been submitted successfully:\n${ data }` );
	};

	return (
		<div>
			<Editor
				dispatchEvent={dispatch}
				initData={<p>Let us hear your feedback!</p>}
			/>
			<button disabled={!canSendFeedback} onClick={handleClick}>
				Send
			</button>
			{isUserEditing && <div>We're happy to hear your feedback!</div>}
		</div>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case CKEditorEventAction.change:
			const data = action.payload.editor.getData().trim();
			return {
				...state,
				canSendFeedback: !!data,
				data
			};
		case CKEditorEventAction.focus:
			return {
				...state,
				isUserEditing: true
			};
		case CKEditorEventAction.blur:
			return {
				...state,
				isUserEditing: false
			};
	}
}

export default Feedback;
```

For more examples see [repo](https://github.com/ckeditor/ckeditor4-react/tree/stable/samples).

## Editor initialization

Due to the nature of React functional components (including [hooks rules](https://reactjs.org/docs/hooks-rules.html)) some props are memoized under the hood. React integration ensures referential stability of the following props: `config`, `debug`, `type`, `editorUrl`, `dispatchEvent`, `subscribeTo`, and all event handlers (`on${EventName}`). Passing new values of these props across renders will have no impact on already created instances of `CKEditor` component or `useCKEditor` hook. A new component instance must be created in order to override memoized values. This can be achieved by leveraging React's `key` prop.

## Utilities

The library exposes few utilities such as `CKEditorEventAction` dictionary and `registerEditorEventHandler` function.

### CKEditorEventAction

Object that maps editor event names to their prefixed equivalents, e.g. `instanceReady` becomes `__CKE__instanceReady`. It's useful when using `useCKEditor` in combination with `useReducer`.

```js
function reducer( state, action ) {
	switch ( action.type ) {
		case CKEditorEventAction.change:
		// calculate new state
		case CKEditorEventAction.blur:
		// calculate new state
	}
}
```

See `useCKEditor` hook [docs](#useckeditor-hook) for a full example.

### registerEditorEventHandler

By default all event handlers registered with the help of `CKEditor` component and `useCKEditor` hook get default priority. With the help of `registerEditorEventHandler` function higher priorities can be assigned or `listenerData` can be attached.

`registerEditorEventHandler` function can also be used to register new handlers dynamically, e.g. when a prop changes.

Returns a cleanup callback to facilitate usage within `useEffect`.

| Prop         | Type   | Default     | Description                                                                                                                                                   |
| ------------ | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| debug        | bool   | `undefined` | Toggles debugging mode. Use it to log info related to editor events.                                                                                          |
| editor       | object | --          | Required. Instance of editor.                                                                                                                                 |
| evtName      | string | --          | Required. Name of the event for which the handler will be registered, e.g. `instanceReady`.                                                                     |
| handler      | func   | --          | Required. Handler function to register.<br> See more [details](../api/CKEDITOR_editor.html#events).                   |
| listenerData | any    | `undefined` | Data that will be passed to handler as `listenerData`.<br> See more {@linkapi CKEDITOR.editor#method-on details}. |
| priority     | number | `undefined` | Listener priority. Lower values have higher priority.<br> See more {@linkapi CKEDITOR.editor#method-on details}.  |

Example usage:

```js
import React from 'react';
import {
	useCKEditor,
	CKEditorEventAction,
	registerEditorEventHandler
} from 'ckeditor4-react';

function Editor( { someProp } ) {
	const [ element, setElement ] = React.useState();

	const { editor } = useCKEditor( {
		element,
		// `dispatchEvent` is memoized, so initial value of `someProp` will be always used.
		dispatchEvent: ( { type } ) => {
			if ( type === CKEditorEventAction.focus ) {
				console.log(
					`Will be called with initial value of ${ someProp }.`
				);
			}
		},
		subscribeTo: [ 'focus' ]
	} );

	React.useEffect( () => {
		if ( editor ) {
			// Registers new handler with high priority whenever value of `someProp` changes.
			const cleanup = registerEditorEventHandler( {
				editor,
				evtName: 'focus',
				handler: () => {
					console.log(
						`Will be called with current value of ${ someProp } before regular event handlers.`
					);
				},
				priority: 0
			} );
			return cleanup;
		}
	}, [ editor, someProp ] );

	return <div ref={setElement} />;
}

export default Editor;
```

### prefixEventName

Prefixes event name with `__CKE__`. Useful for prefixing custom events in `reducer`.

```js
import { prefixEventName } from 'ckeditor4-react';

function reducer( state, action ) {
	switch ( action.type ) {
		case prefixEventName( 'myCustomEvent' ):
		// calculate new state
	}
}
```

### stripPrefix

Removes prefix from event name.

```js
import { stripPrefix } from 'ckeditor4-react';

const evtName = stripPrefix( CKEditorEventAction.focus );

console.log( evtName === 'focus' ); // true
```

## TypeScript support

React integration provides TypeScript definitions for all its interfaces. Please note that this library **does not** provide types for `CKEDITOR` namespace. Therefore, `CKEDITOR` object (as well as instances of `editor`, etc.) has `any` type.

Only TypeScript 3.5+ is supported.

Type argument must be provided in order to use custom events.

Usage with `CKEditor` component:

```js
import * as React from 'react';
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react';

function Editor() {
	return (
		<CKEditor<{
			onCustomEvent: CKEditorEventHandler<'customEvent'>;
		}>
			onCustomEvent={( { name } ) => {
				console.log( name ); // 'customEvent'
			}}
		/>
	);
}

export default Editor;
```

Usage with `useCKEditor` hook:

```js
import * as React from 'react';
import { useCKEditor, prefixEventName } from 'ckeditor4-react';

function Editor() {
	const [ element, setElement ] = React.useState<HTMLDivElement | null>( null );

	useCKEditor<'customEvent' | 'anotherCustomEvent'>( {
		element,
		dispatchEvent: ( { type } ) => {
			if ( type === prefixEventName( 'customEvent' ) ) {
				console.log( type ); // '__CKE__customEvent'
			} else {
				console.log( type ); // '__CKE__anotherCustomEvent'
			}
		},
		subscribeTo: [ 'customEvent', 'anotherCustomEvent' ]
	} );

	return <div ref={setElement} />;
}

export default Editor;
```

## Migration from v1 to v2

The previous version of this {@link guide/dev/integration/react/v1/README library} provided `CKEditor` component with an interface almost identical to the current one.

Most notable difference is that `data` prop was replaced by `initData` prop. Previously, passing a new value of `data` prop would trigger a call to `editor.setData` under the hood. In v2 data can be set only once, during editor instantiation (hence `initData`). The rationale behind this change is that `data` prop created false illusion of being the only source of truth for editor's data while in fact the editor's state is most of the time controlled by the editor itself.

In order to change editor's data with v2 `CKEditor` component, use `editor.setData` imperatively within an event handler. On a side note, remember that any advanced use-case can be achieved with `useCKEditor` hook as it gives you access to current `editor` instance within main body of `render` function.

Below is an example of previous usage of `data` prop and then a counter-example of v2 approach that combines `initData` and an event handler.

Old v1 usage:

```js
/* !!! Deprected !!! */
/* !!!    v1     !!! */

import React from 'react';
import CKEditor from 'ckeditor4-react';

const getArticle = id => {
	return new Promise( resolve => {
		setTimeout( () => {
			resolve( `<p>Here is my article with id ${ id }...</p>` );
		}, 5000 );
	} );
};

function Article( { id } ) {
	// You might be mislead by thinking that `data` is the only source of truth for editor's data.
	// In fact editor's data as returned by `editor.getData()` will be usually different than `data`.
	const [ data, setData ] = React.useState( 'Hello from CKEditor 4!' );

	// Will be triggered whenever `id` of article changes.
	React.useEffect( () => {
		getArticle( id ).then( article => {
			setData( article );
		} );
	}, [ id ] );

	return <CKEditor data={data} />;
}

export default Article;
```

Current v2 usage:

```js
/* !!! Current !!! */
/* !!!   v2    !!! */

import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const getArticle = id => {
	return new Promise( resolve => {
		setTimeout( () => {
			resolve( `<p>Here is my article with id ${ id }...</p>` );
		}, 5000 );
	} );
};

function Article( { id } ) {
	const handleInstanceReady = ( { editor } ) => {
		// Will be triggered only once, when editor is ready for interaction.
		getArticle( id ).then( article => {
			editor.setData( article );
		} );
	};

	return (
		<CKEditor
			initData="Hello from CKEditor 4!"
			onInstanceReady={handleInstanceReady}
		/>
	);
}

export default Article;
```

Other notable differences are:

-   `editorUrl` is now passed as a prop,
-   library exposes `useCKEditor` [hook](#useckeditor-hook) that can be used instead of `CKEditor` component to cover more advanced use-cases,
-	library requires polyfill for `Promise` in order to work in older environments (e.g. Internet Explorer 11)

## CKEditor 4 React Integration Demo

See the {@linkexample react working "CKEditor 4 React Integration" sample} that showcases the most important features of the integration, including choosing the editor type, configuration and events, or lifting state up.
