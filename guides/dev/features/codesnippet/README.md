# Code Snippets in CKEditor

In CKEditor 4.4 we introduced [Code Snippet](http://ckeditor.com/addon/codesnippet) plugin, which essentially allows you to insert code fragments and see a live preview with highlighted syntax.

Its original implementation uses the [highlight.js](http://highlightjs.org) library, but the plugin exposes convenient [interface](#!/api/CKEDITOR.plugins.codesnippet.highlighter) for hooking any other library, even a server-side one.

## Enabling syntax highlighting

When you are using the [classic editor](#!/guide/dev_framed) you do not need to perform any additional steps other than installing the [Code Snippet](http://ckeditor.com/addon/codesnippet) plugin to enable syntax highlighting inside editor.

### [Inline](#!/guide/dev_inline) and [div-based](http://ckeditor.com/addon/divarea) editors

When using [inline](#!/guide/dev_inline) or [div-based](http://ckeditor.com/addon/divarea) editor highlighter stylesheet is not automatically loaded by the editor. You can do that simply by linking a stylesheet for chosen highlight.js theme in page's `<head>` section. The following code will load the default theme:

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
	</head>

**Note:** You can preview themes in the codesnippet plugin sample shipped with CKEditor package. You can also browse them on [highlight.js's demo page](http://highlightjs.org/static/test.html).

### Final page

First of all you will need to load the `highlight.js` script and theme's stylesheet to your page. You can either reuse a copy of `highlight.js` placed in `ckeditor/plugins/codesnippet/lib/highlight` directory or download your own copy from [highlight.js download page](http://highlightjs.org/download).

Attach it to the `<head>` section of your page. The following code will load the highlight.js library and stylesheet for the default theme:

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
		<script src="ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
	</head>

Initiate highlight.js on all `pre code` elements with the following code:

	<script>hljs.initHighlightingOnLoad();</script>

<p class="tip">You might also want to init highlighter only on some elements &ndash; in this case you will need to use <code>hljs.highlightBlock()</code> method on each <code>&lt;block&gt;</code> element. See Custom Initialization section in [highlight.js usage](http://highlightjs.org/usage) page.</p>

All the code snippets created with CKEditor should be highlighted.

## Changing highlighter theme

When using the [classic editor](#!/guide/dev_framed) use the [`config.codeSnippet_theme`](#!/api/CKEDITOR.config-cfg-codeSnippet_theme) option. For a list of available values see Code Snippet plugin sample shipped with CKEditor package or [highlight.js's demo page](http://highlightjs.org/static/test.html).

When using [inline](#!/guide/dev_inline) or [div-based](http://ckeditor.com/addon/divarea) editor and on the final page you can switch between themes by loading different theme's stylesheets. See the [Enabling syntax highlighting](#!/guide/dev_codesnippet-section-enabling-syntax-highlighting) section.

## Changing languages list

You can customize available languages list by setting the [`config.codeSnippet_languages`](#!/api/CKEDITOR.config-cfg-codeSnippet_languages) option.

Following example will reduce languages list down to JavaScript and PHP.

	config.codeSnippet_languages = {
		javascript: 'JavaScript',
		php: 'PHP'
	};

{@img limitedLanguages.png Languages list is reduced down to two languages}

## Hooking custom syntax highlighter

For more informations on how to implement custom highlighter check the [Code Snippet Highlighter API docs](#!/api/CKEDITOR.plugins.codesnippet.highlighter).

## Server-side highlighter

We designed Code Snippet plugin interface in the way that it can be easily extended, even with asynchronous calls. As a sample implementation we created [GeSHi](http://qbnz.com/highlighter/) integration, in a [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin.

Installation instructions can be found in [Code Snippet GeSHi Guide](#!/guide/dev_codesnippetgeshi).

## Internet Explorer 8 support

Because of **Internet Explorer 8** support was dropped in [highlight.js](http://highlightjs.org) `7.3` (see [github ticket](https://github.com/isagalaev/highlight.js/issues/280)) it will not provide any higlighting with default implementation. To solve this problem use custom highlighter.
