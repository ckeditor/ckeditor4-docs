<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Inserting Code Snippets

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.4</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_widget_installation">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

The optional [Code Snippet](http://ckeditor.com/addon/codesnippet) plugin allows you to insert rich code fragments and see a live preview with highlighted syntax. Its original implementation uses the [highlight.js](http://highlightjs.org) library, but the plugin exposes a convenient [interface](#!/api/CKEDITOR.plugins.codesnippet.highlighter) for hooking any other library, even a server-side one.

{@img codesnippet_01.png}

## Enabling Syntax Highlighting

If you are using the [classic editor](#!/guide/dev_framed), you do not need to perform any additional steps other than [adding](#!/guide/dev_plugins) the optional [Code Snippet](http://ckeditor.com/addon/codesnippet) plugin to your build to enable syntax highlighting inside CKEditor.

### Inline and div-based Editors

If you use the [inline](#!/guide/dev_inline) or [div-based](http://ckeditor.com/addon/divarea) editor, you will need to perform an additional step after installing the plugin, since the highlighter stylesheet will not be loaded automatically by the editor. You will thus need to link the stylesheet for the chosen `highlight.js` theme in the `<head>` section of your page. The following code will load the default theme:

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
	</head>

<p class="tip">
    You can preview themes in the Code Snippet sample that is added to the <code>samples</code> folder of each CKEditor build that includes the plugin. You can also browse them on the <a href="http://highlightjs.org/static/test.html">highlight.js demo page</a>.
</p>

### Target Page

To see the highlighter styles on the target page where CKEditor content is displayed, you will need to load the `highlight.js` script and theme's stylesheet on this page. You can either reuse a copy of `highlight.js` placed in the `ckeditor/plugins/codesnippet/lib/highlight` directory or download your own copy from the [highlight.js download page](http://highlightjs.org/download).

Attach it to the `<head>` section of your page. The following code will load the `highlight.js` library and the stylesheet for the default theme:

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
		<script src="ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
	</head>

Inititalize `highlight.js` on all `<pre><code> .. </code></pre>` elements with the following code:

	<script>hljs.initHighlightingOnLoad();</script>

<p class="tip">
    You might also want to initialize the highlighter only on selected elements. In this case you will need to use the <code>hljs.highlightBlock()</code> method on each DOM element containing the code to highlight. See the "Custom Initialization" section on the <a href="http://highlightjs.org/usage">highlight.js Usage</a> page for more information.</p>

After performing the steps described above, all the code snippets created with CKEditor will be highlighted.

## Changing Highlighter Theme

In [classic editor](#!/guide/dev_framed) use the CKEDITOR.config.codeSnippet_theme option. For example:

    config.codeSnippet_theme = 'school_book';

For a complete list of available themes see the Code Snippet sample that is added to the <code>samples</code> folder of each CKEditor build that includes the plugin or the [highlight.js's demo page](http://highlightjs.org/static/test.html).

{@img codesnippet_05.png}

In [inline](#!/guide/dev_inline) or [div-based](http://ckeditor.com/addon/divarea) editor and on the target page that displays content created with CKEditor you can switch between themes by loading the different theme's stylesheets. See the [Enabling Syntax Highlighting](#!/guide/dev_codesnippet-section-enabling-syntax-highlighting) section for more information.

## Changing Supported Languages

You can customize the list of languages with syntax highlighting support by setting the CKEDITOR.config.codeSnippet_languages option.

The following example will reduce the languages list to JavaScript and PHP only.

	config.codeSnippet_languages = {
		javascript: 'JavaScript',
		php: 'PHP'
	};

{@img codesnippet_06.png}

## Hooking a Custom Syntax Highlighter

For more information on how to implement a custom highlighter check the [Code Snippet Highlighter API](#!/api/CKEDITOR.plugins.codesnippet.highlighter) documentation.

## Server-side Highlighter

The Code Snippet plugin interface was designed with extensibility in mind. As a sample implementation the [GeSHi](http://qbnz.com/highlighter/) highlighter integration was created and is available as a separate [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin.

Full installation instructions can be found in the [Iserting Code Snippets Using GeSHi](#!/guide/dev_codesnippetgeshi) article.

## Internet Explorer 8 Support

Since **Internet Explorer 8** support was dropped in [highlight.js](http://highlightjs.org) 7.3 (see the [GitHub ticket](https://github.com/isagalaev/highlight.js/issues/280)), the default implementation of the Code Snippet plugin will not provide any higlighting in this browser version. To solve this problem use a custom highlighter.

## Code Snippets Demo 

See the [working "Inserting Code Snippets" sample](http://sdk.ckeditor.com/samples/codesnippet.html) that shows a few instances of the code snippet widgets as well as the syntax highlighter themes which are available in the default implementation.