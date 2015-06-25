<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Clipboard

One of the CKEditor features is a clipboard support, what means that the editor handle all of the pasted and dropped content. This feature is provided by the [Clipboard plugin](http://ckeditor.com/addon/clipboard) and is complex, so here is the guild to let you deeper understand how CKEditor works under the hood. If you only need to check check how these features look, see the [drop and paste feature overview](#!/guide/dev_drop_paste).

## Why do we need a custom clipboard?

The main problem is that there is no complete documentation how browser should implement pasting and dropping into the `contenteditable` element. If the HTML pasted into the paragraph should copy only HTML structure, like part of the browsers do, or copy CSS stylesheet and paste it as inline styles, like other browsers do? If I paste two paragraphs into the list should they became two list items or two paragraphs of the same item? Unfortunately when it comes to the clipboard browsers behavior varied and it is not only about the content paste into the editor but also the API.

The second reason why the custom clipboard is useful is that thanks to it we are able to implement additional features like [content filtering](#!/guide/dev_acf) or [uploading pasted files](#!/guide/dev_drop_paste).

## Paste event

{@link CKEDITOR.editor.paste Paste event} is the entry point for all pasted and, since 4.5 version, dropped content. This means this event is fired every time some content is dropped or pasted, does not matter if the it was copied or dragged from another application, website, another editor or copy and paste or drag and drop was done internally inside the editor. {@link CKEDITOR.editor.paste Paste event} will be fired and it will be the reason of inserting content into the editor.

For example if you want to replace all old British swears like "Zooterkins" and "Gadzooks" to stars it the pasted content, you could do it this way:

	editor.on( 'paste', function( evt ) {
		evt.data.dataValue = evt.data.dataValue.replace( 'Zooterkins', 'Z********s' ).replace( 'Gadzooks', 'G******s' );
	} );

Note that `dataValue` is a simple string with the HTML what means that it may need to be parsed for the more complex changes and stringified back lated.

CKEditor do its input data transformations (like clean-up, type recognition, formating document form word, files uploading) the same way, using the paste listener.

The `evt.data.dataValue` is the most important property, this is the HTML which will be past to the {@link editor#insertHtml} method in the last `paste` listener. But paste event contains more useful properties like `evt.data.method` (`drop` or `paste`) or `evt.data.type`.

The `evt.data.type` property may be confusing. If you pasted text into to paragraph it should get the paragraph formating. So if the paragraph was red and bold the text should be red and bold too:

	<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

	/* paste, dataValue: 'foo', type: 'text' */

	<p><span style="color:#FF0000"><strong>Lorem foo ipsum</strong></span></p>

But if the type was HTML it meas that the the formating should be kept, so:

	<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

	/* paste, dataValue: 'foo', type: 'html' */

	<p><span style="color:#FF0000"><strong>Lorem </strong></span>
	foo
	<span style="color:#FF0000"><strong> ipsum</strong></span></p>

Note that in both cases pasted `dataValue` may be an HTML, for example `text` data may contains `<br>` line breaks.

In many cases everything what editor get is a string data (see the "Paste bin" section below), and it is not possible to recognize data type and CKEditor have to guess based on the content, but it is not allays possible. This recognition is also done in the `paste` lister with the priority 6, so listeners with the smaller priority may have type `auto` what means that type is not yet recognized. Because of the backward compatibility the default type is `html`, this is the reason why sometime pasted content is recognized as `html` even if it was plain text. This can be changed using {@link CKEDITOR.config#clipboard_defaultContentType}.

## DataTransfer

Another useful property of the paste event is the `DataTransfer` property. Since version 4.5 CKEitor clipboard use [clipboard API](http://www.w3.org/TR/clipboard-apis/) whenever it is possible. Thanks to it you have an access to:

 * data in the various types, like `text/html`, `text/plain`, `application/json` or `application/rtf`.
 * dropped or pasted [files](http://www.w3.org/TR/FileAPI/), so they can be read or uploaded.

CKEditor use {@link CKEDITOR.plugins.clipboard#dataTransfer dataTransfer facade} to hide implementation differences between browsers. Thanks to this facade you can {@link CKEDITOR.plugins.clipboard.dataTransfer#setData set} and {@link CKEDITOR.plugins.clipboard.dataTransfer#getData get} data of any type. See the example of the dataTransfer facade usage in the SDK.

**TODO:** link to the DataTransfer SDK sample

If the browser support clipboard API it is also very simple to recognize pasted data type. If the `dataValue` is empty this means that the `paste` event contains data in the `dataTransfer` object (paste event will not be fire with empty `dataValue` and `dataTransfer`). If in the `paste` event whit the priority `1` editor check if the `text/html` data are available in the `dataTransfer` object and if so, copy this data to `dataValue` and set type to be `html`. If not it checks `text/plain`. If both types are empty it means that `dataTransfer` contains files or data in some other format. If the `dataValue` property is not set in any listener {@link editor.insertHtml} will not be called.

If you want add support to same data format the paste even is the best place to do it. For example if you want to handle Rich Text Format and you created `rtfToHtml` converter then you can do:

	editor.on( 'paste', function( evt ) {
		var rtf = evt.data.dataTransfer.getData( 'application/rtf' );

		if( rtf ) {
			evt.data.dataValue = rtfToHtml( rtf );
		}
	} );

This is also the why how files are handled. To learn more about pasting and dropping files see [file handing guide](#!/guide/dev_files).

## Copy, Cut and Paste

### Paste bin

### Clipboard API

## Drag and Drop

**TODO:** Dragstart, Dragend, Drop events

