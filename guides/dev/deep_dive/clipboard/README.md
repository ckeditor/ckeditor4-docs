<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Clipboard

One of the CKEditor features is a clipboard support, what means that the editor handle all of the pasted and dropped content. This feature is provided by the [Clipboard plugin](http://ckeditor.com/addon/clipboard) and is complex, so here is the guild to let you deeper understand how CKEditor works under the hood. If you only need to check how these features look like, see the [drop and paste feature overview](#!/guide/dev_drop_paste).

## Why do we need a custom clipboard?

The main problem is that there is no complete documentation how browser should implement pasting and dropping into the `contenteditable` element. If the HTML, pasted into the paragraph, should copy only HTML structure, like part of the browsers do, or copy CSS style sheet and paste it as inline styles, like other browsers do? If I paste two paragraphs into the list should they became two list items or two paragraphs of the same item? Unfortunately when it comes to the clipboard browsers behavior varied and it is not only about the content paste into the editor but also about the API.

The second reason why the custom clipboard is useful is that thanks to it we are able to implement additional features like [content filtering](#!/guide/dev_acf) or [uploading pasted files](#!/guide/dev_drop_paste).

## Paste event

{@link CKEDITOR.editor.paste Paste event} is the entry point for all pasted and, since 4.5 version, dropped content. This means this event is fired every time some content is dropped or pasted, does not matter if it was copied or dragged from another application, website, another editor or copy and paste or drag and drop was done internally inside the editor. {@link CKEDITOR.editor.paste Paste event} will be fired and it will be the reason of inserting content into the editor.

For example if you want to replace all old British swears like "Zooterkins" and "Gadzooks" to stars in the pasted content, you could do it this way:

	editor.on( 'paste', function( evt ) {
		evt.data.dataValue = evt.data.dataValue.replace( 'Zooterkins', 'Z********s' ).replace( 'Gadzooks', 'G******s' );
	} );

Note that `dataValue` is a simple string with the HTML what means that it may need to be parsed for the more complex changes and stringified back later.

CKEditor do its input data transformations (like clean-up, type recognition, formating document form word, files uploading) the same way, using the paste listeners.

The `evt.data.dataValue` is the most important property, this is the HTML which will be passed to the {@link editor#insertHtml} method in the last `paste` listener. But {@link CKEDITOR.editor.paste paste event} contains more useful properties like `evt.data.method` (`drop` or `paste`) or `evt.data.type`.

The `evt.data.type` property may be confusing. If you pasted text into the paragraph it should get the paragraph formating. So if the paragraph was red and bold the text should be red and bold too:

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

In many cases everything what editor get is a string data (see the "Paste bin" section below), and it is not possible to recognize data type and CKEditor have to guess based on the content, but it is not allays possible. This recognition is also done in the `paste` lister, with the priority 6, so listeners with the smaller priority may have `type: auto` what means that type is not yet recognized. Because of the backward compatibility the default type is `html`, this is the reason why sometime pasted content is recognized as `html` even if it was plain text. This can be changed using {@link CKEDITOR.config#clipboard_defaultContentType}.

## DataTransfer

Another useful property of the paste event is the {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} property. Since version 4.5 CKEitor clipboard use [clipboard API](http://www.w3.org/TR/clipboard-apis/) whenever it is possible. Thanks to it you have an access to:

 * data in the various types, like `text/html`, `text/plain`, `application/json` or `application/rtf`.
 * dropped or pasted [files](http://www.w3.org/TR/FileAPI/), so they can be read or uploaded.

Limited browser capabilities related to clipboard support required implementing a rich {@link CKEDITOR.plugins.clipboard#dataTransfer facade} for this feature which partially works as a polyfill. It allows to achieve results which are not possible normally. For instance, it is possible to {@link CKEDITOR.plugins.clipboard.dataTransfer#setData set} and {@link CKEDITOR.plugins.clipboard.dataTransfer#getData get} various data types (while all versions of Internet Explorer [support only `Text` and `URL`](https://msdn.microsoft.com/en-us/library/ms536744(v=vs.85).aspx)) and to know what was a source of the data that was dropped.

If the browser support clipboard API it is also very simple to recognize pasted data type. If the `dataValue` is empty this means that the {@link CKEDITOR.editor.paste paste event} contains data in the {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} object ({@link CKEDITOR.editor.paste paste event} will not be fired with empty `dataValue` and {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer}). If in the `paste` event listener whit the priority `1` editor check if the `text/html` data are available in the {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} object and if so, copy this data to `dataValue` and set type to be `html`. If not it checks `text/plain`. If both types are empty it means that {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} contains files or data in some other format. If the `dataValue` property is not set in any listener {@link editor.insertHtml} will not be called.

If you want add support to same data format the paste event is the best place to do it. For example if you want to handle Rich Text Format and you created `rtfToHtml` converter then you can do:

	editor.on( 'paste', function( evt ) {
		var rtf = evt.data.dataTransfer.getData( 'application/rtf' );

		if( rtf ) {
			evt.data.dataValue = rtfToHtml( rtf );
		}
	} );

This is also the way how files are handled. To learn more about pasting and dropping files see [file handing guide](#!/guide/dev_files).

{@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} has also a method to check what was the {@link CKEDITOR.plugins.clipboard.dataTransfer#getTransferType transfer type}: if the data comes from the same editor, anther editor or external source. This recognition works perfectly fine for dragging and dropping, but for copping and pasting, because of browsers limitations, we are not able to recognize the source in every case, so we assume that it is {@link CKEDITOR#DATA_TRANSFER_EXTERNAL external} in cases we are not sure.

## Copy, Cut and Paste

CKEditor is doing its best to paste proper, filtered data when user paste content into the editor. CKEditor use hybrid solution to get data using clipboard API and the paste bin.

### Clipboard API

It would be perfect to get data using Clipboard API, so simple `paste` with [clipboardData](http://www.w3.org/TR/clipboard-apis/#widl-ClipboardEvent-clipboardData) would be enough. It would be good to try to get [clipboardData](http://www.w3.org/TR/clipboard-apis/#widl-ClipboardEvent-clipboardData) and use backup solution only if the clipboard API is not supported. Unfortunately, at the moment of writing this article we know about the cases on all browsers, expect Firefox, which was fixed recently, where data are pasted using native paste, but are not available through the browsers Clipboard API.
If data are available throw [clipboard API](http://www.w3.org/TR/clipboard-apis/) CKEditor fires {@link CKEDITOR.editor.paste paste event} with these data as a {@link CKEDITOR.plugins.clipboard.dataTransfer dataTransfer} and empty `dataValue`.
If it is not possible, CKEditor use paste bin.

### Paste bin

Paste bin is the CKEditor mechanism to capture native paste. The mechanism works the way described below.

 * CKEditor, at the moment before the paste, moves the selection the the special container.
 * Lets browser to do the native paste.
 * Gets the content of this container.
 * Removes container.
 * Fires {@link CKEDITOR.editor.paste paste event} with captured data as the `dataValue`.

It is vary tricky to prevent browser blinking and scrolling. Up to version 4.5 this was the main mechanism for pasting. Now this is backup solution when clipboard API is not supported properly.

### Cut and Copy

Since 4.5 version CKEditor has a custom cut and copy handling what means that it copy or cut selected HTML using {@link CKEDITOR.editor#getSelectedHtml} and {@link CKEDITOR.editor#extractSelectedHtml extractSelectedHtml} and put them to {@link CKEDITOR.plugins.clipboard.dataTransfer dataTransfer} object as `text/html` data. Using these methods we get the same on all browsers, focused on what used expected, content. To avoid the security alerts on Internet Explorer when you copy using keyboard shortcuts we do not use custom methods there and we let browser get or extract selected data.

## Drag and Drop

Since 4.5 version CKEditor handle manually dragging and dropping. CKEditor use native browser drag and drop mechanism and listen on `dragstart`, `dragend`, `dragover` and `drop` events on the editable area and fire editors events:

 * {@link CKEDITOR.editor#dragstart},
 * {@link CKEDITOR.editor#dragend},
 * {@link CKEDITOR.editor#drop}.

 Listeners for these events do the whole drag and drop, what means CKEditor get dragged content, find the range at the drop position and fire the {@link CKEDITOR.editor.paste paste event}. Note that this events does not need to be, based on native events. For example drag and drop of the block widgets use [lineutils](http://ckeditor.com/addon/lineutils) and listen on mouse events, but fire {@link CKEDITOR.editor#dragstart}, {@link CKEDITOR.editor#dragend} and {@link CKEDITOR.editor#drop} event so the drag and drop is handled by the same code.

Note that {@link CKEDITOR.editor#drop drop event} will fired {@link CKEDITOR.editor.paste paste event} which is the one which should be used for data transformation. Drag and drop event are designed for passing some information from the drag to drop or setting proper drop position.

An interesting example of this feature is how drag and drop of [widgets](#!/guide/dev_widgets) is implemented:

	editor.on( 'dragstart', function( evt ) {
		var target = evt.data.target;

		if ( WidgetRepository.isDomDragHandler( target ) ) {
			evt.data.dataTransfer.setData( 'cke/widget-id', widget.id );
		}
	} );

As you can see &ndash; when user drags a widget its id is stored in the data under the `cke/widget-id` type. This allows to find and handle that specific widget instance on {@link CKEDITOR.editor#paste drop}.

Another example can be found in the ["Drag and Drop Integration" sample](http://sdk.ckeditor.com/samples/draganddrop.html) where the  {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer facade} is used to store an object with contact details that are dragged into editor from outside of it.

	// When an item in the contact list is dragged, copy its data into drag and drop data transfer.
	// This data is later read by editor#paste listener.
	CKEDITOR.document.getById( 'contactList' ).on( 'dragstart', function( evt ) {
		// ...

		// Initialization of CKEditor's data transfer facade is a necessary step to extend and unify native browser capabilities.
		// Note: evt is and instance of CKEDITOR.dom.event, not a native event.
		CKEDITOR.plugins.clipboard.initDragDataTransfer( evt );

		var dataTransfer = evt.data.dataTransfer,
			target = evt.data.getTarget();

		// We pass an object with contact details. Based on it, the editor#paste listener
		// will create HTML to be inserted into editor.
		dataTransfer.setData( 'contact', CONTACTS[ target.data( 'contact' ) ] );
	} );

	// ...

	// Handle dropping a contact by transforming contact object into an HTML.
	// Note: all pasted and dropped content is handled in one event - editor#paste.
	editor.on( 'paste', function( evt ) {
		var contact = evt.data.dataTransfer.getData( 'contact' );
		if ( !contact ) {
			return;
		}

		evt.data.dataValue =
			'<span class="h-card">' +
				'<a href="mailto:' + contact.email + '" class="p-name u-email">' + contact.name + '</a>' +
				' ' +
				'<span class="p-tel">(' + contact.tel + ')</span>' +
			'</span>';
	} );