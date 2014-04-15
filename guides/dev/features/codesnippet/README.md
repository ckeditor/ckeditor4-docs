# Code Snippets in CKEditor

In CKEditor 4.4.0 we've introduced Code Snippet plugin, which essentially allows you to insert code fragments and see it as a widget with highlighted syntax.

Its original implementation uses the [highlight.js](http://highlightjs.org) library, but the plugin exposes convenient interface for hooking any other library, even a server-side.

## Adding syntax highlighting in inline / divarea mode? (styling)

While using editor in [inline](#!/guide/dev_inline) or divarea mode - styles are not preserved. In order to fully utilize highlighting feature, we need to include stylesheet manually.

You can do that simply by linking a `highlight.js` stylesheet in page's `head` section.

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
	</head>

**Note:** if you want to use diffrent skin insert other CSS file than the default one. You can preview themes in the codesnippet plugin sample.

## Changing highlighter theme

To use custom theme change the [`codeSnippet_theme`](#!/api/CKEDITOR.config-cfg-codeSnippet_theme) config property value. See Code Snippet plugin sample for a list of available values.

## How do I apply highlighting to my page?

First of all you will need to load the `highlight.js` script and styles to your page. You can either reuse a copy of `highlight.js` placed in `ckeditor/plugins/codesnippet/lib/highlight` direcotry or download your own copy from [highlight.js download page](http://highlightjs.org/download).

Attach it to the `head` section of your page, e.g.

	<head>
		...
		<link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
		<script src="ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
	</head>

Initiate `highlight.js` on all `pre code` elements with following code:

	<script>hljs.initHighlightingOnLoad();</script>

<p class="tip">You might also want to init highlighter only on some elements - in this case you'll need to use `hljs.highlightBlock()` method on each `<block>` element. See Custom Initialization section in [highlight.js usage](http://highlightjs.org/usage) page.</p>

And that's about it, when you run your page - all the code snippets created with CKEditor should be highlighted.

**Note:** if you want to use diffrent skin - include other CSS file than `default.css`. You can preview themes in the codesnippet plugin sample.

## Changing languages list

You can customize displayed languages list by setting a [config.codeSnippet_languages](#!/api/CKEDITOR.config-cfg-codeSnippet_languages) property.

Following example will reduce languages list down to JavaScript and PHP.

	config.codeSnippet_languages = {
		javascript: 'JavaScript',
		php: 'PHP'
	};

{@img limitedLanguages.png Languages list is reduced down to two languages}

## Hooking custom syntax highlighter

For more informations on how to implement custom highlighter check the [Code Snippet Highlighter API docs](#!/api/CKEDITOR.plugins.codesnippet.highlighter).

## Can I use server-side highligter

Yes, you can. We designed Code Snippet plugin interface in the way that it can be easily extended, even with asynchronous calls. As a sample implementation we created [GeSHi](http://qbnz.com/highlighter/) integration, in a [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin.

Installation instructions can be found in [Code Snippet GeSHi Guide](#!/guide/dev_codesnippetgeshi).

## How can I make codesnippet work with Internet Explorer 8?

Because of **Internet Explorer 8** support was dropped in [highlight.js](http://highlightjs.org) `7.3` (see [github ticket](https://github.com/isagalaev/highlight.js/issues/280)) it will not provide any higlighting with default implementation. To solve this problem use custom higlighter.
