---
category: toolbar
order: 40
url: features/balloontoolbar
menu-title: Balloon Toolbar
meta-title-short: Balloon Toolbar
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Balloon Toolbar

<info-box info=""> This feature was introduced in <strong>CKEditor 4.8</strong>. It is provided through the <a href="https://ckeditor.com/cke4/addon/balloontoolbar">Balloon Toolbar</a> plugin that is not included in any CKEditor 4 preset available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

This plugin adds a possibility to display a toolbar, pointing at a particular element in the editor content.

{@img assets/img/balloon-toolbar.png}

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

{@img assets/img/balloon-toolbar.gif}

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

<info-box hint=""> Each context can have its priority adjusted further, so that it takes precedence over other contexts. For more information on that read the <a href="https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.plugins.balloontoolbar.contextDefinition-property-priority"><code>contextDefinition.priority</code></a> documentation.
</info-box>

## Creating Balloon Toolbar Without Contexts

It is possible to use low level API to control a Balloon Toolbar directly, in such case the balloon should be created using the <code>balloonToolbar</code> constructor directly. See [{@linkapi CKEDITOR.ui.balloonToolbar CKEDITOR.ui.balloonToolbar}](https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.ui.balloonToolbar) type docs for more details.

## Balloon Toolbar Demo

See the {@linkexample balloontoolbar "Balloon Toolbar" sample} that shows an example of Balloon Toolbar usage.
