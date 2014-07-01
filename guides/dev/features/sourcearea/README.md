# Source Code Editing

<p class="requirements">
	Features described in this article are provided through plugins that may not be included in the CKEditor preset available from the <a href="http://ckeditor.com/download">Download</a> site that you are using and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

CKEditor is a WYSIWYG editor, so it makes it easy for the end users to work on HTML content without any knowledge of HTML whatsoever. More advanced users, however, sometimes want to access raw HTML source code for their content and CKEditor makes it possible by providing two dedicated plugins: [Source Editing Area](http://ckeditor.com/addon/sourcearea) and [Source Dialog](http://ckeditor.com/addon/sourcedialog).

Both plugins introduce the <img src="guides/dev_sourcearea/sourcearea_03.png" alt="Source"> toolbar button. There are a few differences between them, though.

The **Source Editing Area** plugin:

* Provides source code editing in the source editing area that replaces the WYSIWYG view within the editor interface.
* Is only available for the [classic](#!/guide/dev_framed), `iframe`-based editor.
* Is included by default in the Standard and Full installation packages. If you are using these packages, you do not need to perform any configuration steps in order to use this feature, although you need to remember that it is only available in classic editor instances.

The image below presents the source editing area open in a classic editor instance.

{@img sourcearea_01.png}

The **Source Dialog** plugin:

* Provides source code editing in the Source dialog window.
* Is available for both [classic](#!/guide/dev_framed), `iframe`-based editor, and [inline](#!/guide/dev_inline) editor.
* Is an optional plugin that you need to [add to your CKEditor build](#!/guide/dev_plugins).

If you want to use it in an inline editor instance, add the following to your configuration:

	config.extraPlugins = 'sourcedialog';
	
If, on the other hand, you want to replace the default source editing area with the source dialog for classic editor, use the following settings:

	config.extraPlugins = 'sourcedialog';
	config.removePlugins = 'sourcearea';

The image below presents the Source dialog window open from an inline editor instance.

{@img sourcearea_02.png}

## Configuring Source Code Format

At the moment the only aspect of the source code view that you can configure is the `tab-size` CSS property of the source editing area. Use the CKEDITOR.config.sourceAreaTabSize option to set the width of the tab character. Enter an integer 
to denote the number of spaces that the tab will contain.

	config.sourceAreaTabSize = 8;
	
Please note this is an experimental CSS property which may not be supported in all web browsers.

## Source Code Editing Demo 

See the [working "Source Code Editing" sample](http://sdk.ckeditor.com/samples/sourcearea.html) that showcases both source editing plugins combined with classic and inline editor instances.