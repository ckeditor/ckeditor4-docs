---
category: api-usage
order: 60
url: features/delayed_creation
menu-title: Delayed editor creation
meta-title-short: Delayed editor creation
---

<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Delayed editor creation

<info-box info="">This feature have been introduced in CKEditor 4 version 4.17.0 and is off by default. It can be enabled via a dedicated {@linkapi CKEDITOR.config#cfg-delayIfDetached config option}.</info-box>

Delayed editor creation starts when you invoke casual {@linkapi CKEDITOR#method-replace `replace()`} or {@linkapi CKEDITOR#method-inline `inline()`} methods, but the editor is not created immediately. The instance creation is postponed and could be resumed automatically or on-demand. Please take a look at the details in the [following section](#ways-to-delay-editor-creation). Also, deferred instantiation is only possible when the target element is detached from the DOM during creation verification and {@linkapi CKEDITOR.config#cfg-delayIfDetached config option}.

This feature was introduced to solve a bunch of issues related to initializing CKEditor 4 in modals, dialogs, pop-ups, and other hidable UI elements. Please take a look at the [Practical example section](#practical-example) for more details.

## When to use delayed creation

<info-box info="">In the examples below, the {@linkapi CKEDITOR#method-replace `replace()` method} is used to create editor, but this feature works with {@linkapi CKEDITOR#method-inline `inline()` method} as well.</info-box>

When you create an editor instance on a detached element you may find that the editor was created but the console displays an error, for example:

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
	editorTargetElement = CKEDITOR.document.getById( 'editor' );

// Detach parent of target element from the DOM.
editorContainerParent.removeChild( editorContainer );

// Create editor.
var editor = CKEDITOR.replace( editorTargetElement );
```

Please notice that we try to create an editor on a provided reference to the element. It is valid, but the element is no longer present in the DOM. And since editor initialization traverses the DOM and extracts information from the parent document of provided element - it is not possible when the target element is detached (it does not have a parent in such cases). Such an initialization attempt will result in an error.

In the previous sample, the editor could also be initialized by providing an `id` to editor element:

```js
var editor = CKEDITOR.replace( 'editor' );
```

However, this time the editor will not be created, and the {@link guide/dev/deep_dive/errors/README#editor-incorrect-element editor-incorrect-element error} will be thrown. In this case, the code is looking for an element with a given `id` in the document - which simply is not there, because it was detached earlier.

## Practical example

Let's assume we have:
- a target element and it is not visible for the user (is detached),
- button, which makes the element visible (attaches it to the DOM),
- the editor creation was called with the `detachIfDelay` option enabled.

And then the user clicks the button, so the element becomes visible again (it is attached to DOM). The pros and cons of using each approach are listed below.

### Interval approach

- Easy to use, does not require any additional configuration.
- The script will run until the button is clicked for the first time. In the worst case, the button may not be clicked at all, but the entire page is affected by the background script.
- The last interval check may happen milliseconds before the user clicks the button. The default timeout is small enough, that there will be no flickering effect. But still, you do not have control over user actions.
- The interval checks might be adjusted with the {@linkapi CKEDITOR.config#delayIfDetached_interval delayIfDetached_interval option}. However, if you make it shorter - performance might be affected. If you lengthen the interval - the delay might start to be visible.

### Callback approach

- Requires additional configuration and a good understanding of when the editor should be initialized.
- Creation function can be used at any time which offers greater flexibility.
- Because of invocation on demand, we need to wait only for creation time. No additional delays or unnecessary checks. However, additional logic needs to be implemented and bound to every place that could show the editor.

## Ways to delay editor creation

### Using interval

Enabling the {@linkapi CKEDITOR.config#cfg-delayIfDetached delayIfDetached} config option, results in the editor element being checked in given time intervals. Checks are performed every given amount of time (which can be changed via {@linkapi CKEDITOR.config#cfg-delayIfDetached_interval delayIfDetached_interval}). Whenever a target element is found to be attached to the DOM - the editor instance is then created. For more advanced usage refer to the [`callback` approach](#using-callback) below.

### Using callback

To have more control over when editor instance will be initialized the {@linkapi CKEDITOR.config#cfg-delayIfDetached_callback delayIfDetached_callback} config option is provided. The `function` provided here, will be invoked with a single argument. When the `callback` function is provided, interval checks are no longer executed. The argument of a `callback` function is another function that should be invoked to finish editor creation. Also, the received callback may be stored and used right after the target element is attached to DOM. The advantage here is that it gives full control over the time that the actual creation is performed.

## Cancel delayed editor creation

<info-box info=''>This feature is only available when the {@linkapi CKEDITOR.config#cfg-delayIfDetached delayIfDetached} is enabled and the editor is [initialized via interval method](#using-interval).</info-box>

The delayed editor creation via interval method starts the native `setInterval` function in the background. Since the `4.19.0` version, methods: {@linkapi CKEDITOR#method-replace `replace`}, {@linkapi CKEDITOR#method-inline `inline`} and {@linkapi CKEDITOR#method-appendTo `appendTo`} - returns the cancellation callback allowing to stop that interval:

```js
var cancelCreation = CKEDITOR.replace( targetElement, {
	delayIfDetached: true,
} );

// setInterval is running.

cancelCreation();

// Interval is cleared. The editor won't be initialized anymore.
```

It is recommended to use this function to prevent potential memory leaks. Use it if you know that the editor host element will never be attached to the DOM. As an example, execute cancel handle in your component cleanup logic (e.g. `onDestroy` lifecycle methods in popular frontend frameworks).

## Getting editor reference

There might be cases when you create an editor and assign it to a variable. It is a common example in the entire documentation. Please note, that the best practice is to grab and use editor instance after the {@linkapi CKEDITOR#instanceReady instance ready event}. The return value is different based on what approach was applied:

### The default behavior

Might return the editor instance, but also `null` under certain circumstances (e.g. given element is unavailable).

```js
var editor = CKEDITOR.replace( targetElement );
```

### Interval approach

Editor creation might return `null` or the cancellation callback - but not the editor instance.

```js
var cancellationCallback = CKEDITOR.replace( targetElement, {
	delayIfDetached: true,
} );

// Whenever editor finish the initialization - it is available in instances list:
var editor = CKEDITOR.instances[ 'editorName' ];
```

### Callback approach

Editor creation might return only `null`. You can get instance the same way as in [interval approach](#interval-approach) or inside the provided callback:

```js
function delayedCallback( createEditor ) {
	// createEditor() returns editor instance
	var editor = createEditor();
}

var editor = CKEDITOR.replace( targetElement, {
	delayIfDetached: true,
	delayIfDetached_callback: delayedCallback,
} );
```
