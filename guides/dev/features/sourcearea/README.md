<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Source Code Editing

<p class="requirements">
	Features described in this article are provided through plugins that may not be included in the CKEditor preset available from the <a href="http://ckeditor.com/download">Download</a> site that you are using and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

CKEditor is a WYSIWYG editor, so it makes it easy for end users to work on HTML content without any knowledge of HTML whatsoever. More advanced users, however, sometimes want to access raw HTML source code for their content and CKEditor makes it possible by providing two dedicated plugins: [Source Editing Area](http://ckeditor.com/addon/sourcearea) and [Source Dialog](http://ckeditor.com/addon/sourcedialog).

Both plugins introduce the <img src="guides/dev_sourcearea/sourcearea_03.png" alt="Source" title="Source"> toolbar button. There are a few differences between them, though.

The **Source Editing Area** plugin:

* Provides source code editing in the source editing area that replaces the WYSIWYG view within the editor interface.
* Is only available for an editor with [fixed user interface](#!/guide/dev_uitypes-section-fixed-user-interface) (which is the default UI for [classic](#!/guide/dev_framed), `iframe`-based editor).
* Is included by default in the Standard and Full installation packages. If you are using these packages, you do not need to perform any configuration steps in order to use this feature, although you need to remember that it is only available in editor instances with fixed UI.

The image below presents the source editing area open in a classic editor instance.

{@img sourcearea_01.png}

The **Source Dialog** plugin:

* Provides source code editing in the Source dialog window.
* Is available for editors with all [user interface types](#!/guide/dev_uitypes), so it works both for [classic](#!/guide/dev_framed), `iframe`-based editor, and [inline](#!/guide/dev_inline) editor.
* Is an optional plugin that you need to [add to your CKEditor build](#!/guide/dev_plugins).

If you want to use it in an inline editor instance (which by default uses floating user interface), add the following to your configuration:

	config.extraPlugins = 'sourcedialog';

<p class="tip">If you are using <a href="#!/guide/dev_toolbar-section-%22item-by-item%22-configuration">an "item by item" toolbar configuration</a>, note that the button name for the source dialog is <code>Source<b>d</b>ialog</code>.</p>

If, on the other hand, you want to replace the default source editing area with the source dialog for classic editor with fixed user interface, use the following settings:

	config.extraPlugins = 'sourcedialog';
	config.removePlugins = 'sourcearea';

The image below presents the Source dialog window open from an inline editor instance with floating UI.

{@img sourcearea_02.png}

## Other Data Formats

If another plugin generates CKEditor output data format other than HTML, like for example the [BBCode Output Format](#!/guide/dev_bbcode) plugin, the source editing area will display editor content in that format.

## Configuring Source Code Format

At the moment the only aspect of the source code view that you can configure is the `tab-size` CSS property of the source editing area. Use the CKEDITOR.config.sourceAreaTabSize option to set the width of the tab character. Enter an integer
to denote the number of spaces that the tab will contain.

	config.sourceAreaTabSize = 8;

Please note this is an experimental CSS property which may not be supported in all web browsers.

## Source Code Editing Demo

See the [working "Source Code Editing" sample](http://sdk.ckeditor.com/samples/sourcearea.html) that showcases both source editing plugins combined with classic and inline editor instances.

## Related Features

Refer to the following resources for more information about related features:

* The [Output Formatting](#!/guide/dev_output_format) feature gives developers full control over what the HTML code produced by the editor will look like.
* The [Full Page Editing with Document Properties Plugin](#!/guide/dev_fullpage) article explains how to use CKEditor to work on a complete HTML page (from `<html>` to `</html>`) and to setup some document metadata.