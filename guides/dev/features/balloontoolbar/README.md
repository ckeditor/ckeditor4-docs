<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Balloon Toolbar

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.8</strong>. It is provided through the <a href="https://ckeditor.com/cke4/addon/balloontoolbar">Balloon Toolbar</a> plugin that is not included in any CKEditor preset available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

This plugin adds a possibility to display a toolbar, pointing at a particular element in the editor content.

{@img balloon-toolbar.png}

## Toolbar Contexts

Sometimes certain buttons are relevant only for a particular content type. For instance "Open link" button is relevant only for links, list properties button is relevant only for lists, and so on.

To solve this particular problem we created Toolbar Context concept. It means that you can define multiple different toolbar contexts, each with a certain matching logic, but the editor will find the best match to use only one context at a time.

Adding a context is very simple, for example, the following code adds a context for a <a href="https://ckeditor.com/cke4/addon/image2">Enhanced Image</a> widget:

```js
editor.balloonToolbars.create ( {
	buttons: 'Link,Unlink,Image',
	widgets: 'image'
} );
```

{@img balloon-toolbar.gif}

For more information on creating contexts, see <a href="https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.plugins.balloontoolbar.contextManager-method-create"><code>contextManager.create</code></a> API docs.

### Context Matchers

Toolbar contexts have the following matchers:

1. CSS matching - `options.cssSelector` e.g. `options.cssSelector = 'a[href], img';`
1. Widgets matching - `options.widgets` e.g. `options.widgets = 'image,placeholder';`
	It is important to mention that this matcher is only checked against focused widget. In case if the selection is inside of an editable, this matcher no longer applies (but others do).
1. Callback - `options.refresh` e.g. `options.refresh = function( editor, path ) { return path.contains( 'em' ); };`

### Context Priorities

By default, matchers do not have the same priority.

The default priorities are as follows:

1. Callback,
1. Widgets matching,
1. CSS matching.

<div class="tip">
	Each context can have its priority adjusted further, so that it takes precedence over other contexts. For more information on that read the <a href="https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.plugins.balloontoolbar.contextDefinition-property-priority"><code>contextDefinition.priority</code></a> documentation.
</div>

## Creating Balloon Toolbar Without Contexts

It is possible to use low level API to control a Balloon Toolbar directly, in such case the balloon should be created using the <code>balloonToolbar</code> constructor directly. See [`CKEDITOR.ui.balloonToolbar`](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.ui.balloonToolbar) type docs for more details.

## Balloon Toolbar Demo

See the ["Balloon Toolbar" sample](https://sdk.ckeditor.com/samples/balloontoolbar.html) that shows an example of Balloon Toolbar usage.
