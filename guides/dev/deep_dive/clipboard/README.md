<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Clipboard Integration

One of the most important CKEditor features is the integration with the operating system's clipboard. The main role of this feature is to intercept any content that is being pasted, dropped, cut, copied or dragged from or to the editor. This allows to apply certain rules to this content, for instance the [Advanced Content Filter](#!/guide/dev_advanced_content_filter).

This feature is provided by the [Clipboard plugin](http://ckeditor.com/addon/clipboard) and, because of incomplete, broken or totally missing native features, it is very complex. This is a guide to let you deeper understand how CKEditor's integration with clipboard works under the hood. We recommend reading the [Drop and Paste Feature Overview](#!/guide/dev_drop_paste) first.

## Why Do We Need a Custom Clipboard Integration?

The main problem is that we, the developers, want to have a control over what can be pasted or dropped into the editor. Browsers' implementations of these mechanisms are highly inconsistent and in many cases are unacceptable (e.g. Webkit and Blink based browsers put a very messy HTML soup into the clipboard). Furthermore, a user can copy a content from various sources like other websites, email clients, Word, etc. This content is full of inline styles, unwanted styling elements or simply is not semantical and therefore it could break the editing experience in CKEditor (read more in the [Content Filtering](#!/guide/dev_acf) guide).

Therefore, filters must be implemented. But in order to do so, the content must be intercepted before it is inserted into the editor.

But this is only one of many reasons why having control over the clipboard is useful. It also allows implementing features like [uploading pasted files](#!/guide/dev_drop_paste), customized integration that [widgets](#!/guide/dev_widgets) have and finally, allows what we love most, having a highly unified behavior amongst the browsers.

The `contentEditable` has no specification yet, and features like what content is put into the clipboard when user copies some selected text will not be specified in any near future. Therefore, browsers vary when it comes to algorithms such as {@link CKEDITOR.editor#getSelectedHtml "get selected HTML"} or {@link CKEDITOR.editor#method-insertHtml "insert HTML into selection"} yield different results which often are very poor.

## The Paste Event

The {@link CKEDITOR.editor#paste paste event} is the entry point for all pasted and, since CKEditor 4.5, also dropped content. This means that this event is fired every time some content is dropped or pasted. It does not matter if it was copied or dragged from another application, website, another editor or within a single editor. The {@link CKEDITOR.editor#paste paste event} is fired and, unless canceled, the data that it caries will be inserted into the editor.

For example, if you want to replace all old British swears like "Zooterkins" and "Gadzooks" to stars in the pasted content, you could do it this way:

	editor.on( 'paste', function( evt ) {
		evt.data.dataValue = evt.data.dataValue
			.replace( /zooterkins/gi, 'z********s' )
			.replace( /gadzooks/gi, 'g******s' );

		// This code obviously won't preserve the case of the first and last letters.
		// Let it be an exercise for the reader ;).
	} );

Note that `dataValue` is a JavaScript string with an HTML what means that it may need to be parsed for the more complex changes and stringified back later.

	editor.on( 'paste', function( evt ) {
			// Create standalone filter passing 'p' and 'b' elements.
		var filter = new CKEDITOR.filter( 'p b' ),
			// Parse HTML string to pseudo DOM structure.
			fragment = CKEDITOR.htmlParser.fragment.fromHtml( evt.data.dataValue ),
			writer = new CKEDITOR.htmlParser.basicWriter();

		filter.applyTo( fragment );
		fragment.writeHtml( writer );
		evt.data.dataValue = writer.getHtml();
	} );

CKEditor performs its input data transformations (like cleanup, type recognition, formating document form word, files uploading) the same way, using paste listeners.

The `evt.data.dataValue` is the most important property, this is the HTML which will be passed to the {@link CKEDITOR.editor#method-insertHtml} method in the last {@link CKEDITOR.editor#paste paste} listener.

But the {@link CKEDITOR.editor#paste paste event} contains more useful properties like `evt.data.method` (`'drop'` or `'paste'`) or `evt.data.type` (`'auto'`, `'html'` or `'text'`). Refer to the {@link CKEDITOR.editor#paste} documentation to learn about all available properties.

### Content Type

The `evt.data.type`'s role is to tell the editor what was the original type of the data being pasted. It affects how this content is later handled upon insertion.

For instance, if you pasted a plain text into a paragraph it should inherit that paragraph's formating. So if the paragraph was red and bold the text should be red and bold too:

	<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

	/* paste, dataValue: 'foo', type: 'text' */

	<p><span style="color:#FF0000"><strong>Lorem foo ipsum</strong></span></p>

But if the content that was pasted was an HTML, then the formatting that it originally had should be preserved, even though the `dataValue` may not contain any obvious HTML tags:

	<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

	/* paste, dataValue: 'foo', type: 'html' */

	<p><span style="color:#FF0000"><strong>Lorem </strong></span>
	foo
	<span style="color:#FF0000"><strong> ipsum</strong></span></p>

Note that in both cases pasted `dataValue` is an HTML string. If a plain text is pasted and `type` is set to `'text'`, then `dataValue` contains am "HTMLified" version of that plain text. It means that line breaks are replaced with `<br>`, double ones create separate paragraphs, etc.

### Content Type Recognition

In many cases everything what editor gets from the clipboard is an HTML string (see the "Paste bin" section below) so CKEditor is not able to guess what was the type of the pasted content. For instance, when `dataValue` equals `'foo'`, then was it copied from a website or from a text editor? At the time of writing this guide it is only possible to recognize the real type on Chrome, Firefox and Opera, so on other browsers the type depends on {@link CKEDITOR.config#clipboard_defaultContentType} (hence, most of the time it is `'html'` regardless of what was pasted).

This recognition is also done in the {@link CKEDITOR.editor#paste paste event} lister, with a priority 6, so listeners with higher priorities may see the `type == 'auto'` what means that the type is not yet recognized.

## Data Transfer

Another useful property of the paste event is the `evt.data.dataTransfer` property which is an instance of the {@link CKEDITOR.plugins.clipboard.dataTransfer} class. It was introduced in CKEditor 4.5 when CKEditor started using the [Clipboard API](http://www.w3.org/TR/clipboard-apis/) whenever it is possible. Thanks to this you have an access to:

* data in various types, like `text/html`, `text/plain`, `application/json` or `application/rtf`.
* dropped or pasted [files](http://www.w3.org/TR/FileAPI/), so they can be read and uploaded.

Limited browser capabilities related to clipboard support required implementing a rich {@link CKEDITOR.plugins.clipboard.dataTransfer facade} for this feature which partially works as a polyfill. It allows to achieve results which are not possible normally. For instance, it is possible to {@link CKEDITOR.plugins.clipboard.dataTransfer#setData set} and {@link CKEDITOR.plugins.clipboard.dataTransfer#getData get} various data types (while all versions of Internet Explorer [support only `Text` and `URL`](http://bit.ly/1HrSxlJ)) and to know what was a source of the data that was dropped.

### Handling Various Data Types with Clipboard API

By default CKEditor handles only `text/html` and `text/plain` data types. If clipboard APIs are available, in a `paste` event listener whit a priority `1` the editor checks if the `text/html` data is available in the {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} object and if so, copies it to `dataValue` and sets the `type` to be `'html'`. If not it checks `text/plain` and does the same after "HTMLifying" it. If both types are empty it means that {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} contains files or data in some other format. If the `dataValue` property is not set in any listener, then {@link CKEDITOR.editor#method-insertHtml} will not be called.

If you want add support for some data format, then use a `paste` event listener. For example, if you want to handle Rich Text Format and you created `rtfToHtml()` converter then you can do:

	editor.on( 'paste', function( evt ) {
		var rtf = evt.data.dataTransfer.getData( 'application/rtf' );

		if ( rtf ) {
			evt.data.dataValue = rtfToHtml( rtf );
		}
	} );

This is also the way how files are handled. To learn more about pasting and dropping files see [file handing guide](#!/guide/dev_files).

{@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} has also a method to check what was the {@link CKEDITOR.plugins.clipboard.dataTransfer#getTransferType transfer type}: if the data comes from the same editor, another editor or external source. This recognition works perfectly fine for dragging and dropping, but not for copping and pasting. Because of browsers limitations, we are not able to recognize the source in every case, so we assume that it is {@link CKEDITOR#DATA_TRANSFER_EXTERNAL external} in cases we are not sure.

## Copy, Cut and Paste

CKEditor wants to intercept pasted data on every browser. Unfortunately, the Clipboard API is not yet available in every browser (and guess what &ndash; on Safari for instance, this API is available but there is no `text/html` type available...), so CKEditor uses a hybrid solution to get data using clipboard API and a paste bin.

### Clipboard API

It would be perfect if getting data from clipboard when the Clipboard API was available was as simple as accessing the [`clipboardData`](http://www.w3.org/TR/clipboard-apis/#widl-ClipboardEvent-clipboardData) from a native `paste` event and using a backup solution if Clipboard API is not available. Unfortunately, at the moment of writing this article, we know about cases on most browsers, where data is pasted when allowing the browser to perform a native `paste`, but is not available through the browser Clipboard API.

If data is available through the [Clipboard API](http://www.w3.org/TR/clipboard-apis/) CKEditor fires the {@link CKEDITOR.editor#paste paste event} with these data available in the {@link CKEDITOR.plugins.clipboard.dataTransfer dataTransfer} and an empty `dataValue`.
If it is not possible, CKEditor uses a paste bin.

### Paste Bin

A paste bin is a CKEditor's mechanism to capture native paste. The mechanism works in the following steps:

* When an attempt to paste a data is discovered, a moment before the paste really happens, CKEditor moves the selection the a special, hidden container called the paste bin.
* Next, CKEditor waits to let the browser do the native paste into that paste bin.
* After a short timeout (well... Safari needs more time) CKEditor gets the content of this container.
* Then, CKEditor moves selection back to the {@link CKEDITOR.editable} and removes the paste bin.
* Finally, CKEditor fires the {@link CKEDITOR.editor#paste paste event} with captured data as the `dataValue`.

It is very tricky to prevent browser from blinking and scrolling. Up to version 4.5 this was the main mechanism for pasting and many bugs were reported and needed our patches. Now this is a backup solution when the Clipboard API is not supported properly. It is used in Internet Explorer,Chrome for Android and Safari.

### Cut and Copy

Since version 4.5 CKEditor has a custom cut and copy handling mechanisms what means that it copies or cuts selected HTML using the {@link CKEDITOR.editor#getSelectedHtml} and {@link CKEDITOR.editor#extractSelectedHtml} methods and put that data to {@link CKEDITOR.plugins.clipboard.dataTransfer dataTransfer} object as `text/html`. By using these methods instead of letting the browser handle copy and cut natively, CKEditor is able to handle these operations in the same way on all browsers, and to focus on what a user expected.

To avoid the security alerts in Internet Explorer when a user copies or cuts content using keyboard shortcuts the editor does not use custom methods and lets the browser get or extract selected data.

## Drag and Drop

Since 4.5 version CKEditor handle manually dragging and dropping. CKEditor use native browser drag and drop mechanism and listen on `dragstart`, `dragend`, `dragover` and `drop` events on the {@link CKEDITOR.editable} area and fires editor's events:

* {@link CKEDITOR.editor#dragstart},
* {@link CKEDITOR.editor#dragend},
* {@link CKEDITOR.editor#drop}.

Listeners for these events perform the entire drag and drop operation, what means that CKEditor puts dragged content into the {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer} (if `dragstart` is inside it), gets dragged content, finds a range at the drop position and fires the {@link CKEDITOR.editor#paste paste event}. Note that these events do not need to be based on native events. For example, the drag and drop of the block widgets uses [lineutils](http://ckeditor.com/addon/lineutils) and listens on mouse events, but fires the {@link CKEDITOR.editor#dragstart}, {@link CKEDITOR.editor#dragend} and {@link CKEDITOR.editor#drop} events so the drag and drop is handled by the same code and hence can be processed in the same way.

Note that the {@link CKEDITOR.editor#drop drop event} fires the {@link CKEDITOR.editor#paste paste event} which is the one which should be used for data transformation such as filtering or uploading files.

An interesting example of this feature is how drag and drop of [widgets](#!/guide/dev_widgets) is implemented:

	editor.on( 'dragstart', function( evt ) {
		var target = evt.data.target;

		if ( WidgetRepository.isDomDragHandler( target ) ) {
			evt.data.dataTransfer.setData( 'cke/widget-id', widget.id );
		}
	} );

As you can see &ndash; when a user drags a widget its id is stored in the data under the `cke/widget-id` type. This allows to find and handle that specific widget instance on {@link CKEDITOR.editor#drop drop}.

Another example can be found in the ["Drag and Drop Integration" sample](http://sdk.ckeditor.com/samples/draganddrop.html) where the  {@link CKEDITOR.plugins.clipboard.dataTransfer DataTransfer facade} is used to store an object with contact details that are dragged into editor from outside of it.

	// When an item in the contact list is dragged, copy its data into drag and drop data transfer.
	// This data is later read by editor#paste listener.
	CKEDITOR.document.getById( 'contactList' ).on( 'dragstart', function( evt ) {
		// Initialization of CKEditor's data transfer facade is a necessary step to
		// extend and unify native browser capabilities.
		// Note: evt is and instance of CKEDITOR.dom.event, not a native event.
		CKEDITOR.plugins.clipboard.initDragDataTransfer( evt );

		var dataTransfer = evt.data.dataTransfer,
			target = evt.data.getTarget();

		// We need to set some normal data types to a backup values for two reasons:
		// * on some browsers this is necessary to enable drag and drop into text in editor,
		// * the content may be dropped in other place than editor.
		dataTransfer.setData( 'text/html', target.getText() );

		// You can still access and use the native dataTransfer - e.g. to set a drag image.
		// Note: IEs do not support this method... :(.
		if ( dataTransfer.$.setDragImage ) {
			dataTransfer.$.setDragImage( target.findOne( 'img' ).$, 0, 0 );
		}
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