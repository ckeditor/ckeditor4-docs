---
category: working-with-document
order: 60
url: guide/dev_sourcearea
menu-title: Source Code Editing
meta-title-short: Source Code Editing
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Source Code Editing

<info-box info="">
    Features described in this article are provided through plugins that may not be included in the CKEditor preset available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site that you are using and may {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

CKEditor is a WYSIWYG editor, so it makes it easy for end users to work on HTML content without any knowledge of HTML whatsoever. More advanced users, however, sometimes want to access raw HTML source code for their content and CKEditor makes it possible by providing two dedicated plugins: [Source Editing Area](https://ckeditor.com/cke4/addon/sourcearea) and [Source Dialog](https://ckeditor.com/cke4/addon/sourcedialog).

Both plugins introduce the <img class="inline" src="%BASE_PATH%/assets/img/sourcearea_03.png" alt="Source" title="Source"> toolbar button. There are a few differences between them, though.

The **Source Editing Area** plugin:

* Provides source code editing in the source editing area that replaces the WYSIWYG view within the editor interface.
* Is only available for an editor with {@link guide/dev/features/uitypes/README#fixed-user-interface fixed user interface} (which is the default UI for {@link guide/dev/framed/README classic}, `iframe`-based editor).
* Is included by default in the Standard and Full installation packages. If you are using these packages, you do not need to perform any configuration steps in order to use this feature, although you need to remember that it is only available in editor instances with fixed UI.

The image below presents the source editing area open in a classic editor instance.

{@img assets/img/sourcearea_01.png}

The **Source Dialog** plugin:

* Provides source code editing in the Source dialog window.
* Is available for editors with all {@link guide/dev/features/uitypes/README user interface types}, so it works both for {@link guide/dev/framed/README classic}, `iframe`-based editor, and {@link guide/dev/inline/README inline} editor.
* Is an optional plugin that you need to {@link guide/dev/plugins/README add to your CKEditor build}.

If you want to use it in an inline editor instance (which by default uses floating user interface), add the following to your configuration:

	config.extraPlugins = 'sourcedialog';

<info-box hint="">If you are using the {@link guide/dev/features/toolbar/README#item-by-item-configuration "item by item" toolbar configuration}, note that the button name for the Source dialog is <code>Source<b>d</b>ialog</code>.</info-box>

If, on the other hand, you want to replace the default source editing area with the source dialog for classic editor with fixed user interface, use the following settings:

	config.extraPlugins = 'sourcedialog';
	config.removePlugins = 'sourcearea';

The image below presents the Source dialog window open from an inline editor instance with floating UI.

{@img assets/img/sourcearea_02.png}

## Other Data Formats

If another plugin generates CKEditor output data format other than HTML, like for example the {@link guide/dev/features/bbcode/README BBCode Output Format} plugin, the source editing area will display editor content in that format.

## Configuring Source Code Format

At the moment the only aspect of the source code view that you can configure is the `tab-size` CSS property of the source editing area. Use the {@linkapi CKEDITOR.config.sourceAreaTabSize CKEDITOR.config.sourceAreaTabSize} option to set the width of the tab character. Enter an integer
to denote the number of spaces that the tab will contain.

```js
config.sourceAreaTabSize = 8;
```

Please note this is an experimental CSS property which may not be supported in all web browsers.

## Source Code Editing Demo

See the {@linksdk sourcearea working "Source Code Editing" sample} that showcases both source editing plugins combined with classic and inline editor instances.

## Related Features

Refer to the following resources for more information about related features:

* The {@link guide/dev/features/output_format/README Output Formatting} feature gives developers full control over what the HTML code produced by the editor will look like.
* The {@link guide/dev/features/fullpage/README Full Page Editing with Document Properties Plugin} article explains how to use CKEditor to work on a complete HTML page (from `<html>` to `</html>`) and to setup some document metadata.
