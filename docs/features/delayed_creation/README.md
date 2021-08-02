---
category: api-usage
order: 60
url: features/delayed_creation
menu-title: Delayed editor creation
meta-title-short: Delayed editor creation
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Delayed editor creation

<info-box info="">This feature have been introduced in CKEditor 4 version 4.17.0 and by default is off. It can be enabled via dedicated [config option](../api/CKEDITOR_config.html#cfg-delayIfDetached).</info-box>

Delaying editor creation prevents editor instance from being created and initialized when target element is detached from the DOM. Such mechanism was introduced to solve a group of specific issues related to initializing CKEditor 4 in modals, dialogs, pop-ups and other hidable UI elements. Please take a look at the [Practical example section](#practical-example) for more details.

## Ways to delay editor creation

### Using interval

The [delayIfDetached](../api/CKEDITOR_config.html#cfg-delayIfDetached) config option, which is disabled by default, results in editor element being checked in given time intervals. Checks are performed every given amount of time (which can be changed via [delayIfDetached_interval](../api/CKEDITOR_config.html#cfg-delayIfDetached_interval)). Whenever a target element is found to be attached to the DOM - the editor instance is then created. For more advanced usage refer to the [`callback` approach](#using-callback) below.

### Using callback

To have more control over when editor instance will be initialized the [delayIfDetached_callback](../api/CKEDITOR_config.html#cfg-delayIfDetached_callback) config option is provided. The `function` provided here, will be invoked with a single argument. When `callback` function is provided, interval checks are no longer executed. The argument of a `callback` function is another function that should be invoked to finish editor creation. Also, received callback may be stored and used right after the target element is attached to DOM. The advantage here is that it gives full control over the time that the actual creation is performed.

## When to use delayed creation

<info-box info="">In the examples below, the [`replace()` method](../api/CKEDITOR.html#method-replace) is used to create editor, but this feature works with [`inline()` method](../api/CKEDITOR.html#method-inline) as well.</info-box>

When you create editor instance on detached element you may find that the editor was created but the console displays an error, for example:

```plain
TypeError: Cannot read property 'unselectable' of null
```

Let's take a look at the sample setup:

```html
<div id="editorContainer">
	<div id="editor">
		<p>Lorem ipsum dolor sit amet.</p>
	</div>
</div>
```

```js
// Grab references to DOM elements.
var editorContainer = document.getElementById( 'editorContainer' ),
	editorContainerParent = editorContainer.parentNode,
	editorTargetElement = CKEDITOR.document.getById('editor');

// Detach parent of target element from the DOM.
editorContainerParent.removeChild( editorContainer );

// Create editor.
var editor = CKEDITOR.replace( editorTargetElement );
```

Please notice, that we try to create editor on provided reference to the element. It is valid, but the element is no longer present in the DOM. And since editor initialization traverses the DOM and extracts information from the parent document of provided element it is not possible when target element is detached (it does not have parent in such cases). Such initialization attempt will result with an error.

In the previous sample, editor could be initialized also by providing id to a editor element:

```js
var editor = CKEDITOR.replace( 'editor' );
```

However, this time the editor won't be created and the [editor-incorrect-element error](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#editor-incorrect-element) error will be thrown. In this case, the code is looking for an element with given `id` in the document - which simply is not there, because it was detached earlier.

## Practical example

Lets assume we have:
- a target element and it is not visible for the user (is detached),
- button, which makes the element visible (attaches it to the DOM),
- the editor creation was called with `detachIfDelay` option enabled.

And then the user clicks the button, so the element becomes visible again (is attached to DOM). The pros and cons of using each approach are listed below.

### Interval approach

- Easy to use, doesn't require additional configuration.
- The script will run until the button is clicked for the first time. In the worst case, the button may not be clicked at all, but the entire page is affected by the background script.
- The last interval check may happen milliseconds before user clicks the button. The default timeout is small enough, that there will be no flickering effect, but still there will be slight delay before editor creation starts.

### Callback approach

- Requires additional configuration and good understanding when editor should be initialized.
- Creation function can be used at any time which gives grater flexibility..
- Because of invocation on demand, we need to wait only for creation time. No additional delays or unnecessary checks. However, additional logic needs to be implemented and binded to every place that could show the editor.

## Getting editor reference

There might be cases when you create editor and assign it to a variable. It is a common example in the entire documentation:

```js
var editor = CKEDITOR.replace( targetElement );
```

With this feature enabled and detached target element the variable value will not contain editor instance  (regardless of interval or callback method).

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
