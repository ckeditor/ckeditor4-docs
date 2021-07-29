---
category: api-usage
order: 60
url: features/delayed_creation
menu-title: Delayed creation
meta-title-short: Delayed creation
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Delayed editor creation

<info-box info="">This feature was introduced in 4.17.0 and by default is off. It requires [enabling config option](../api/CKEDITOR_config.html#cfg-delayIfDetached) to work.</info-box>

<info-box info="">In the examples we used `replace` method to create editor, but this feature works with `inline` method as well.</info-box>

It prevents editor creation when target element is detached from the DOM. We introduce it, because of experiencing a group of issues. Please take a look at the [troubleshooting section](#troubleshooting) for more details. Those situations may happened when CKEditor4 is used with popular frameworks and placed for example in modal window.

## Two ways to delay creation

### Interval approach

The [delayIfDetached](../api/CKEDITOR_config.html#cfg-delayIfDetached) config option which is disabled by default results in editor element being checked in given intervals. Checks are performed every given amount of time (which can be changed via [delayIfDetached_interval](../api/CKEDITOR_config.html#cfg-delayIfDetached_interval)). Whenever a target element is found to be attached to the DOM - the editor instance is then created. For more advanced usage refer to the `callback` config option described below.

### Callback approach

To have more control over when editor instance will be initialized the [delayIfDetached_callback](../api/CKEDITOR_config.html#cfg-delayIfDetached_callback) config option is provided. The `function` provided here, will be invoked with a single argument instead of interval checks. This argument is a function that should be invoked to finish editor creation. Also, received callback may be stored and used right after the target element is attached to DOM. The advantage here is that it gives full control over the time that the actual creation is performed.

## Troubleshooting

When you create an editor on detached element with the default settings, you may find that the editor was created but the console displays an error:

```
TypeError: Cannot read property 'unselectable' of null
```

Let's look at the sample setup:

```html
<div id="editorContainer">
	<div id="editor">
		<p>Lorem ipsum dolor sit amet.</p>
	</div>
</div>
```

```js
// Grab references to DOM elements
var editorContainer = document.getElementById( 'editorContainer' ),
	editorContainerParent = editorContainer.parentNode,
	editorTargetElement = CKEDITOR.document.getById('editor');

// Detach parent of target element from the DOM
	editorContainerParent.removeChild( editorContainer );

// Create editor
	var editor = CKEDITOR.replace( editorTargetElement );
```

Please notice, that we try to create editor on provided reference to the element. It is valid, but the element is no longer in the DOM.

You may also try the same sample, but with:

```js
	var editor = CKEDITOR.replace( 'editor' );
```

This time the editor won't be created, and the console displays an [editor-incorrect-element error](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#editor-incorrect-element). In this case, we are looking for an element with given `id` in the document - which simply is not there, becuase it was detached.

In the first case (with element reference) we already have it. However, our other logics try to find a few information from the parent document of provided element reference. Since the element is outside - we simply cannot find them.

## Practical usecase example

Let's have:
- a target element and it is not visible for the user (is detached),
- button, which makes the element visible (attach it to the DOM),
- the editor creation was called with `detachIfDelay` option enabled.

User clicks the button, so the element is visible again.

### Interval approach

- The script may run for so long until the button is used for the first time. In the worst case, the button may not be clicked at all, but the entire page is affected by the background script.

- The last interval check may happen milliseconds before user clicks. The default timeout is small enough, that there will be no flickering effect. But still, we need to wait that interval time and then the creation time.

### Callback approach

- We may store the received creation function.
- Bind to the button onclick and invoke the stored function there.
- Because of invocation on demand, we need to wait only for creation time. No additional delays or unnecessary checks. However, additional logic needs to be implemented and binded to every place that could show the editor.

## Editor reference

There might be a case when you create editor and asign it to a variable. It is a common example in the entire documentation:
```js
var editor = CKEDITOR.replace( targetElement );
```
With this feature enabled and detached target element the variable value will not contain editor instance. Regardless interval or callback method is usage.

```js
var editor = CKEDITOR.replace( targetElement, {
	delayIfDetached: true
} );
console.log( editor ); // -> null
```

You can get an instance in different ways, depending on used options: 

### Interval approach
```js
var editor = CKEDITOR.instances[ 'editorName' ];
```
### Callback approach

You can get instance the same way as in [interval approach](#interval-approach-3) or inside the provided callback:
```js
function delayedCallback( createEditor ) {
	// createEditor() returns editor instance
	var editor = createEditor();
}
var editor = CKEDITOR.replace( targetElement, {
	delayIfDetached: true,
	delayIfDetached_callback: delayedCallback
} );
```
