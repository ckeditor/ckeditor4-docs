<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Loading CKEditor Script

CKEditor is a JavaScript application. To load it, you need to include a single file reference in your page. If you [installed](#!/guide/dev_installation) CKEditor in the `ckeditor` directory in the root of your website, you need to insert the following code fragment into the `<head>` section of your page:

	<head>
		...
		<script src="/ckeditor/ckeditor.js"></script>
	</head>

When this file is loaded, the [CKEditor JavaScript API](#!/api) is ready to be used.

When adding CKEditor to your web pages, use the original file name (`ckeditor.js`). If you want to use a different file name, or even merge the CKEditor script into another JavaScript file, refer to the [Specifying the Editor Path](#!/guide/dev_basepath) article first.

## Creating Editor Instances

Now that the CKEditor JavaScript API is available on the page, you can use it to create editor instances. There are two different options available in order to achieve this. In order to examine both usage scenarios, choose the preferred option below to get more information.

### Classic Editing
[Classic editing](#!/guide/dev_framed) is the most common way to use CKEditor, when the editor is usually represented by a toolbar and an editing area placed in a specific position on the page. Sometimes it is also called "framed editing", because in this scenario the editor creates a temporary `<iframe>` element for itself.

[See the demo here](http://sdk.ckeditor.com/samples/classic.html). Read all about this editor type in the [Classic Editing](#!/guide/dev_framed) article.

{@img classic_example.png Classic editor example}

### Inline Editing
[Inline editing](#!/guide/dev_inline) is an innovative feature that can be used for content which needs to look like the final page, giving you a true <abbr title="What You See Is What You Get">WYSIWYG</abbr> experience. Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute. The editor toolbar appears automatically for these elements, floating on the page.

[See the demo here](http://sdk.ckeditor.com/samples/inline.html). Read all about this editor type in the [Inline Editing](#!/guide/dev_inline) article.

{@img inline_example.png Inline editor example}
