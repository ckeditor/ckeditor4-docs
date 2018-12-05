---
category: inserting-content
order: 120
url: guide/dev_codesnippet
menu-title: Code Snippets
meta-title-short: Code Snippets
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Inserting Code Snippets

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.4</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Code Snippet](https://ckeditor.com/cke4/addon/codesnippet) plugin allows you to insert rich code fragments and see a live preview with highlighted syntax. Its original implementation uses the [highlight.js](http://highlightjs.org) library, but the plugin exposes a convenient {@linkapi CKEDITOR.plugins.codesnippet.highlighter interface} for hooking any other library, even a server-side one.

{@img assets/img/codesnippet_01.png}

## Enabling Syntax Highlighting

If you are using the {@link guide/dev/framed/README classic editor}, you do not need to perform any additional steps other than {@link guide/dev/plugins/README adding} the optional [Code Snippet](https://ckeditor.com/cke4/addon/codesnippet) plugin to your build to enable syntax highlighting inside CKEditor.

### Inline and div-based Editors

If you use the {@link guide/dev/inline/README inline} or [div-based](https://ckeditor.com/cke4/addon/divarea) editor, you will need to perform an additional step after installing the plugin, since the highlighter stylesheet will not be loaded automatically by the editor. You will thus need to link the stylesheet for the chosen `highlight.js` theme in the `<head>` section of your page. The following code will load the default theme:

``` html
<head>
    ...
    <link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
</head>
```

<info-box hint="">
    You can preview themes in the {@linksdk codesnippet "Inserting Code Snippets" sample}. You can also browse them on the <a href="http://highlightjs.org/static/test.html">highlight.js demo page</a>.
</info-box>

### Target Page

To see the highlighter styles on the target page where CKEditor content is displayed, you will need to load the `highlight.js` script and theme's stylesheet on this page. You can either reuse a copy of `highlight.js` placed in the `ckeditor/plugins/codesnippet/lib/highlight` directory or download your own copy from the [highlight.js download page](http://highlightjs.org/download).

Attach it to the `<head>` section of your page. The following code will load the `highlight.js` library and the stylesheet for the default theme:

``` html
<head>
    ...
    <link href="ckeditor/plugins/codesnippet/lib/highlight/styles/default.css" rel="stylesheet">
    <script src="ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
</head>
```

Inititalize `highlight.js` on all `<pre><code> .. </code></pre>` elements with the following code:

``` html
<script>hljs.initHighlightingOnLoad();</script>
```

<info-box hint="">
    You might also want to initialize the highlighter only on selected elements. In this case you will need to use the <code>hljs.highlightBlock()</code> method on each DOM element containing the code to highlight. See the "Custom Initialization" section on the <a href="http://highlightjs.org/usage">highlight.js Usage</a> page for more information.</info-box>

After performing the steps described above, all the code snippets created with CKEditor will be highlighted.

## Changing Highlighter Theme

In {@link guide/dev/framed/README classic editor} use the {@linkapi CKEDITOR.config.codeSnippet_theme CKEDITOR.config.codeSnippet_theme} option. For example:

    config.codeSnippet_theme = 'school_book';

For a complete list of available themes see the {@linksdk codesnippet Inserting Code Snippets sample} or the [highlight.js's demo page](http://highlightjs.org/static/test.html).

{@img assets/img/codesnippet_05.png}

In {@link guide/dev/inline/README inline} or [div-based](https://ckeditor.com/cke4/addon/divarea) editor and on the target page that displays content created with CKEditor you can switch between themes by loading the different theme's stylesheets. See the {@link guide/dev/features/codesnippet/README#enabling-syntax-highlighting Enabling Syntax Highlighting} section for more information.

## Changing Supported Languages

You can customize the list of languages with syntax highlighting support by setting the {@linkapi CKEDITOR.config.codeSnippet_languages CKEDITOR.config.codeSnippet_languages} option.

The following example will reduce the languages list to JavaScript and PHP only.

```js
config.codeSnippet_languages = {
    javascript: 'JavaScript',
    php: 'PHP'
};
```

{@img assets/img/codesnippet_06.png}

## Hooking a Custom Syntax Highlighter

For more information on how to implement a custom highlighter check the {@linkapi CKEDITOR.plugins.codesnippet.highlighter Code Snippet Highlighter API} documentation.

## Server-side Highlighter

The Code Snippet plugin interface was designed with extensibility in mind. As a sample implementation the [GeSHi](http://qbnz.com/highlighter/) highlighter integration was created and is available as a separate [Code Snippet GeSHi](https://ckeditor.com/cke4/addon/codesnippetgeshi) plugin.

Full installation instructions can be found in the {@link guide/dev/features/codesnippetgeshi/README Iserting Code Snippets Using GeSHi} article.

## Internet Explorer 8 Support

Since **Internet Explorer 8** support was dropped in [highlight.js](http://highlightjs.org) 7.3 (see the [GitHub ticket](https://github.com/isagalaev/highlight.js/issues/280)), the default implementation of the Code Snippet plugin will not provide any higlighting in this browser version. To solve this problem use a custom highlighter.

## Code Snippets Demo

See the {@linksdk codesnippet working "Inserting Code Snippets" sample} that shows a few instances of the code snippet widgets as well as the syntax highlighter themes which are available in the default implementation.
