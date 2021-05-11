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

CKEditor 4 offers a native React integration through the CKEditor 4 React component and hook. It provides deep integration of CKEditor 4 and React that lets you use the native features of the WYSIWYG editor inside your React app. Our package is compatible with React versions 16.8.6 and higher.

## Basic Usage

In order to create an editor instance in React, install the `ckeditor4-react` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-react
```

This package exposes a high-level `CKEditor` component and a low-level `useCKEditor` hook. For simpler use cases `CKEditor` component should be a go-to solution. For advanced cases consider using `useCKEditor` hook.

An example React app featuring `CKEditor` component would look like the following:

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

function App() {
	return (
		<div className="App">
			<h2>Using CKEditor 4 in React</h2>
			<CKEditor
				initData="<p>Hello from CKEditor 4!</p>"
				onInstanceReady={() => {
					alert("Editor is ready!");
				}}
			/>
		</div>
	);
}

export default App;
```

## Customizing CKEditor Preset or Version

By default, the CKEditor 4 React integration loads the [standard-all preset](https://ckeditor.com/cke4/presets-all) of the latest CKEditor 4 release from the [CDN](https://cdn.ckeditor.com/) when creating the first editor. This behavior can be altered by using the `editorUrl` prop to point to the desired CKEditor script location:

```js
// Component
<CKEditor
	{...props}
	editorUrl="https://your-website.example/ckeditor/ckeditor.js"
/>;

// Hook
const { editor } = useCKEditor({
	...props,
	editorUrl: "https://your-website.example/ckeditor/ckeditor.js"
});
```

Value of `editorUrl` must remain constant across all instances of editor.

## CKEditor component

The `CKEditor` component is a solution that should satisfy most use-cases. It's a wrapper around low-level `useCKEditor`.

### API

The component's API exposes initial configuration options such as `config`, `editorUrl`, or `initData` as well as editor's lifecycle events handlers. If you find `CKEditor` component's capabilities insufficient, consider using more flexible `useCKEditor` hook.

<info-box info="">
	Certain props will trigger re-initialization of editor instance if their values change. See [editor initialization](#editor-initialization) to get more details.
</info-box>

| Prop             | Type                  | Default         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | --------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config           | object                | `{}`            | Config object passed to editor's constructor.<br> See config details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| debug            | bool                  | `undefined`     | Toggles debugging mode which logs info related to editor events.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| editorUrl        | string                | link to CDN[^1] | Url to CKEditor release.<br> See [Customizing CKEditor Preset or Version](#customizing-ckeditor-preset-or-version).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| initData         | string                | `undefined`     | Initial data. It will be passed to editor once it's in `ready` state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| name             | string                | `undefined`     | A unique identifier of editor instance.<br> See details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-name).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `on${EventName}` | func                  | `undefined`     | Handlers for all events specified under [Events](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#events) section are accepted as props in the form `eventName` -> `on${ EventName }`, e.g. `instanceReady` -> `onInstanceReady`. Each event handler has [event info](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_eventInfo.html) passed as argument. <br> In addition to native events, two more events are provided by the React integration: `namespaceLoaded` and `beforeLoad`. The first one is fired only once, when the `CKEDITOR` global namespace is loaded and the latter one is fired right before any instance of editor is created. Both handlers get `CKEDITOR` object as argument. |
| readOnly         | bool                  | `undefined`     | Starts editor in read-only mode. Equivalent of adding `{ readOnly: true }` to config but takes precedence over it.<br> Also allows to toggle editor's `read-only` mode on runtime.<br> See details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-readOnly).                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| style            | object                | `undefined`     | Sets editor container's styles. Styles can be modified on runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| type             | 'classic' \| 'inline' | `classic`       | Initializes editor in either `classic` or `inline` mode.<br> See details for classic type [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace) and for inline type [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline).                                                                                                                                                                                                                                                                                                                                                                                                                                            |

[^1]: https://cdn.ckeditor.com/${ latestVersion }/standard-all/ckeditor.js

```js
<CKEditor
	config={configObject}
	debug={true}
	editorUrl="https://your-website.example/ckeditor/ckeditor.js"
	initData="<p>Hello from CKEditor 4!</p>"
	name="my-ckeditor"
	// CKEDITOR namespace-related events:
	onBeforeLoad={CKEDITOR => {}}
	onNamespaceLoaded={CKEDITOR => {}}
	// Few examples of editor event handlers:
	onLoaded={({ editor }) => {}}
	onInstanceReady={({ editor }) => {}}
	onFocus={({ editor }) => {}}
	readOnly={false}
	style={{ borderColor: "blue" }}
	type="classic"
/>
```

## useCKEditor hook

The `useCKEditor` hook constitutes the core of CKEditor 4 React integration. It can be used to cover more advanced use cases or build more specialized hooks and components. As a matter of fact, `CKEditor` component is built on top of `useCKEditor` hook.

### API

Props:

| Prop          | Type                  | Default         | Description                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config        | object                | `{}`            | Config object passed to editor's constructor.<br> See config details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html).                                                                                                                                                                                                                         |
| debug         | bool                  | `undefined`     | Toggles debugging mode which logs info related to editor events.                                                                                                                                                                                                                                                                                                          |
| dispatchEvent | func                  | `undefined`     | Dispatches editor events.<br> Pass a custom function or `dispatch` from `useReducer`. Event type and payload will be passed as arguments, e.g. `({ type, payload }) => { ... }`. Event name is provided as `type` and is prefixed with `__CKE__` in order to facilitate integration with `useReducer`. Use `CKEditorEventAction` object helper to access prefixed events. |
| editorUrl     | string                | link to CDN[^1] | See [Customizing CKEditor Preset or Version](#customizing-ckeditor-preset-or-version).                                                                                                                                                                                                                                                                                    |
| element       | object                | `undefined`     | Ref to underlying to DOM element. This prop must be passed to trigger creation of editor instance.                                                                                                                                                                                                                                                                        |
| type          | 'classic' \| 'inline' | `classic`       | Initializes editor in either `classic` or `inline` mode.<br> See details for classic type [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace) and for inline type [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline).                                                                                     |
| subscribeTo   | array                 | `undefined`     | List of editor [events](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#events) to subscribe to, e.g. `[ 'focus', 'blur' ]`. Only these events will be dispatched through `dispatchEvent` function. If omitted, all events will be dispatched.                                                                                                        |

Result:

| Prop    | Type                                             | Default     | Description                                                                                                                                                                                                                     |
| ------- | ------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| editor  | object                                           | `undefined` | Editor instance. Defaults to `undefined` (before editor is initialized). <br> See config details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html).                                                   |
| status  | 'unloaded' \| 'loaded' \| 'ready' \| 'destroyed' | `undefined` | Current status of editor. Equivalent of `editor.status`.<br> See status details [here](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-status).                                                    |
| error   | bool                                             | `false`     | Indicates that an error occurred during editor creation.<br> This is a non-recoverable state. It indicates that something wrong happened during instantiation of editor, e.g. incorrect `editorUrl` or `element` were provided. |
| loading | bool                                             | `false`     | Indicates that CKEditor is being loaded from remote url.                                                                                                                                                                        |

```js
const { editor, status, error, loading } = useCKEditor({
	config: configObject,
	debug: true,
	dispatchEvent: ({ type, payload }) => {
		// Event name is prefixed in order to facilitate integration with custom `useReducer`
		if (type === "__CKE__instanceReady") {
			alert("Editor is ready!");
		}
	},
	editorUrl: "https://your-website.example/ckeditor/ckeditor.js",
	element: elementObject,
	type: "classic",
	subscribeTo: ["instanceReady"]
});
```

### `dispatchEvent` explained

By providing `dispatchEvent` function, the `useCKEditor` hook's API unlocks more powerful patterns than `CKEditor` component has to offer.

For instance, pass `dispatch` from `useReducer` to use editor's events and derive state of your component as needed. Note that reducer function of `useReducer` hook is not a suitable place to perform side-effects.

In the example below, `dispatchEvent` is used to calculate derived state and `useEffect` is used to imperatively use editor's methods to perform side-effects.

```js
import React from "react";
import { CKEditorEventAction, useCKEditor } from "ckeditor4-react";

const initialData = `<p>Let us hear your feedback!</p>`;

function CKEditorCmp({ dispatchEvent }) {
	// Use `useState` rather than `useRef` in order to trigger re-render.
	const [element, setElement] = useState();

	const { editor, status } = useCKEditor({
		element,
		dispatchEvent,
		subscribeTo: ["blur", "change", "focus"]
	});

	// Use `useEffect` to perform side-effects, e.g. imperatively invoke editor's methods.
	React.useEffect(() => {
		if (status === "ready") {
			editor.setData(template);
		}
	}, [editor, status, template]);

	return <div ref={setElement} />;
}

function Feedback() {
	const [
		{ canSendFeedback, data, isUserEditing },
		// `dispatch` can be passed directly to `useCKEditor` hook
		dispatch
	] = React.useReducer(reducer, {
		canSendFeedback: false,
		data: undefined,
		isUserEditing: false
	});

	const handleClick = () => {
		alert("Feedback has been submitted successfully!");
	};

	return (
		<div>
			<CKEditorCmp dispatchEvent={dispatch} />
			<button disabled={!canSendFeedback} onClick={handleClick}>
				Send
			</button>
			{isUserEditing && <div>We're happy to hear your feedback!</div>}
		</div>
	);
}

function reducer(state, action) {
	switch (action.type) {
		case CKEditorEventAction.change:
			const data = action.payload.editor.getData();
			return {
				...state,
				canSendFeedback: data && data !== initialData,
				data
			};
		case CKEditorEventAction.focus:
			return {
				...state,
				isUserEditing: state.data && state.data !== initialData
			};
		case CKEditorEventAction.blur:
			return {
				...state,
				isUserEditing: false
			};
		default:
			return state;
	}
}

export default Feedback;
```

For more examples see samples in [repo](https://github.com/ckeditor/ckeditor4-react/tree/master/samples).

## Editor initialization

In order to provide an easy way to re-initialize editor instances and due to the nature of React functional components (including [hooks rules](https://reactjs.org/docs/hooks-rules.html)) some props must ensure referential stability across renders.

Props that need care in this regard are listed below:

| Prop      | Description                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| config    | Config prop is responsible for customizing editor instance. Any time a new instance of config object is passed as a prop, a new editor instance will be created and the old one discarded.<br> Accepted by both `CKEditor` component and `useCKEditor` hook. |
| editorUrl | This prop is passed as a string so it does not require any memoization techniques. Make sure that its value stays stable across multiple components / hooks. <br> Accepted by both `CKEditor` component and `useCKEditor` hook.                              |
| type      | Starts editor either in `inline` or `classic` mode. <br> Accepted by both `CKEditor` component and `useCKEditor` hook.                                                                                                                                       |
| element   | Reference to DOM element.<br> Accepted by `useCKEditor` hook.                                                                                                                                                                                                |

<info-box info="">
	Event handlers passed to `CKEditor` component don't require any memoization techniques. We ensure referential equality across renders under the hood. As a side effect, only first passed instance of a handler will be used throughout the lifecycle of the component.
</info-box>

Below are few techniques that can be employed to ensure that referential equality is in place and unnecessary renders are prevented.

### Move variables out of React scope

Objects that remain constant throughout React app's lifecycle can be moved outside of React render function:

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

const config = {
	width: 800
};

function MyCKEditor() {
	return (
		<CKEditor config={config} initData="<p>Hello from CKEditor 4!</p>" />
	);
}

export default MyCKEditor;
```

### Combine `useState` and `useEffect`

Hooks `useState` and `useEffect` can be combined to ensure referential equality and at the same time provide ability to dynamically change value on demand.

In the example below, prop `width` is passed from parent component. Any time its value changes, a new editor instance is created and the old one discarded.

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

function MyCKEditor({ width }) {
	const [config, setConfig] = React.useState({ width });

	React.useEffect(() => {
		setConfig(config => (config.width !== width ? { width } : config));
	}, [width]);

	return (
		<CKEditor config={config} initData="<p>Hello from CKEditor 4!</p>" />
	);
}

export default MyCKEditor;
```

### Beware of `useMemo`

Be careful of using `useMemo` as a measure of ensuring referential equality. As per React [docs](https://reactjs.org/docs/hooks-reference.html#usememo):

> You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.

React may choose to "forget" previously memoized value which may lead to unwanted side-effects. For instance, if `useMemo` is used to memoize editor's config object, an editor instance might be randomly re-created at some point during your app's runtime. On a side note, these considerations apply to `useCallback` hook as well.

Below is an **incorrect** example:

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

/**
 * !!! Avoid using `useMemo` when creating `config` objects !!!
 *
 * Instead use combination of `useState` and `useEffect` hooks (see above).
 *
 */
function IncorrectExample({ width }) {
	/**
	 * If React chooses to "forget" value at some point, a new instance of config object will be provided and as a result editor instance will be re-created.
	 */
	const config = React.useMemo(
		() => ({
			width
		}),
		[width]
	);

	return (
		<CKEditor config={config} initData="<p>Hello from CKEditor 4!</p>" />
	);
}

export default IncorrectExample;
```

## Specialize your components

React encourages developers to use [component composition](https://reactjs.org/docs/composition-vs-inheritance.html). One of such patterns is known as specialization. If you use `CKEditor` component or `useCKEditor` hook in multiple places of your codebase, it might be worthwhile to move common logic to a separate component:

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

const config = {
	width: 800
};

// Use `MyCKEditor` across your app rather than `CKEditor`.
function MyCKEditor({ onInstanceReady }) {
	const { trackUserActivity } = useLogging();

	const handleInstanceReady = payload => {
		if (onInstanceReady) {
			onInstanceReady(payload);
		}

		// Perform some common side-effects, e.g. track user activity.
		trackUserActivity({ type: "editor_initialized" });
	};

	return (
		<CKEditor
			config={config}
			onInstanceReady={handleInstanceReady}
			editorUrl="https://your-website.example/ckeditor/ckeditor.js"
			type="inline"
		/>
	);
}

export default MyCKEditor;
```

## Utilities

Except for `CKEditor` component and `useCKEditor` hook, this library exposes `CKEditorEventAction` object and `registerEditorEventHandler` function.

### `CKEditorEventAction`

Object that maps editor event names to their prefixed equivalents, e.g. `instanceReady` -> `__CKE__instanceReady`. It's useful in combination with `useCKEditor` and `useReducer`.

```js
function reducer(state, action) {
	switch (action.type) {
		case CKEditorEventAction.change:
		// return new state
		case CKEditorEventAction.blur:
		// return new state
	}
}
```

See `useCKEditor` hook [docs](#useckeditor-hook) for a full example.

### `registerEditorEventHandler`

By default all event handlers registered with the help of `CKEditor` component and `useCKEditor` hooks get default priority. With the help of `registerEditorEventHandler` function higher priorities can be assigned or `listenerData` can be passed.

It should be used as an escape hatch rather than a go-to solution.

| Prop         | Type   | Default     | Description                                                                                                                                                   |
| ------------ | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| debug        | bool   | `undefined` | Toggles debugging mode which logs to console info related to editor events.                                                                                   |
| editor       | object | `undefined` | Instance of editor.                                                                                                                                           |
| evtName      | string | `undefined` | Name of the event for which the handler will be register, e.g. `instanceReady`.                                                                               |
| handler      | func   | `undefined` | Handler function to register.<br> See more [details](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#events).                             |
| listenerData | any    | `undefined` | Data that will be passed to handler as `listenerData`.<br> See more [details](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-on). |
| priority     | number | `undefined` | Listener priority. Lower values have higher priority.<br> See more [details](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-on).  |

Example usage:

```js
import React from "react";
import { CKEditor } from "ckeditor4-react";

function CKEditorCmp({ dispatchEvent, someProp }) {
	const [element, setElement] = useState();

	const { editor, status } = useCKEditor({
		element
	});

	useEffect(() => {
		return registerEditorEventHandler({
			editor,
			evtName: "focus",
			handler: ({ editor }) => {
				console.log(
					`Will be called with ${someProp} before regular event handlers.`
				);
			},
			priority: 0
		});
	}, [editor, someProp]);

	return <div ref={setElement} />;
}

export default CKEditorCmp;
```

## TypeScript support

React integration provides TypeScript definitions for all its interfaces. Please note that this library **does not** provide types for `CKEDITOR` namespace. Therefore, `CKEDITOR` object (as well as instances of `editor`, etc.) has `any` type.

## Migration from v1 to v2

The previous version of this {@link guide/dev/integration/react/v1/README library} provided `CKEditor` component with an interface almost identical to the current one.

Most notable difference is that `data` prop was replaced by `initData` prop. Previously, any new value of `data` prop triggered call to `editor.setData` under the hood. Currently, setting data is possible once, when the editor becomes `ready`. The rationale behind this change is that `data` prop created false illusion of being the only source of truth for editor's data. However, the editor's state is most of the time controlled by the editor instance itself.

In order to change editor's data with v2 `CKEditor` component, use `editor.setData` imperatively within event handler. On a side note, remember that any advanced use-case can be achieved with `useCKEditor` hook as it gives you access to current `editor` instance within main body of `render` function.

Below is an example of previous usage of `data` prop and then a counter-example of v2 approach that combines `initData` and an event handler.

```js
/* !!! Deprected !!! */
/* !!!    v1     !!! */

import React from "react";
import CKEditor from "ckeditor4-react";
import { useApi } from "../some-api-module";

function Article({ id }) {
	const { getArticle } = useApi();
	// You might be mislead by thinking that `data` is the only source of truth for editor's data.
	// In fact, at any time, editor's data as returned by `editor.getData()` will be most likely different than `data`.
	const [data, setData] = React.useState("<p>Hello from CKEditor 4!</p>");

	React.useEffect(() => {
		// Will be triggered whenever `id` of article changes.
		getArticle(id).then(article => {
			setData(article);
		});
	}, [id]);

	return <CKEditor data={data} />;
}

export default Article;
```

```js
/* !!! Current !!! */
/* !!!   v2    !!! */

import React from "react";
import { CKEditor } from "ckeditor4-react";
import { useApi } from "../some-api-module";

function Article({ id }) {
	const { getArticle } = useApi();

	const handleInstanceReady = ({ editor }) => {
		// Will be triggered once, when editor is ready for interaction.
		getArticle(id).then(article => {
			editor.setData(article);
		});
	};

	return (
		<CKEditor
			initData="Hello from CKEditor 4!</p>"
			onInstanceReady={handleInstanceReady}
		/>
	);
}

export default Article;
```

Other notable differences are:

1. `editorUrl` is now passed as a prop. See [here](#specialize-your-components) for a guide on component specialization.
2. Passing new instances of `config` will trigger re-initialization of editor instance. See [editor initialization](#editor-initialization) to get more details.
3. Passing new value of `type` will trigger re-initialization of editor instance. See [editor initialization](#editor-initialization) to get more details.
