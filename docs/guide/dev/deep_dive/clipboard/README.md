---
category: ckeditor-deep-dive
order: 100
url: guide/dev_clipboard
menu-title: Clipboard Integration
meta-title-short: Clipboard Integration
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Clipboard Integration

<info-box info="">
	This feature is provided through the <a href="https://ckeditor.com/cke4/addon/clipboard">Clipboard</a> plugin that is included in all CKEditor 4 presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site.
</info-box>

One of the most important CKEditor 4 features is the integration with the operating system's clipboard. The main role of this feature is to intercept any content that is being pasted, dropped, cut, copied or dragged from or to the editor. This allows to apply certain rules to this content, for instance with {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filter}.

This feature is provided by the Clipboard plugin and, because of incomplete, broken or totally missing native support for this type of operations across browsers, it is very complex. The aim of this article is to explain how CKEditor 4 integration with clipboard works under the hood. We recommend reading the {@link features/drop_paste/README Drop and Paste Feature Overview} article first.

## Why Is Custom Clipboard Integration Needed?

The main problem is that the developers want to have control over what can be pasted or dropped into the editor. Browser implementations of these mechanisms are highly inconsistent and in many cases are unacceptable (e.g. WebKit and Blink based browsers put a very messy HTML soup into the clipboard). Furthermore, a user can copy content from various sources like other websites, email clients, word processors, etc. This content is full of inline styles, unwanted styling elements or simply is not semantic and therefore it could break the editing experience in CKEditor (read more in the {@link guide/dev/acf/README Content Filtering} guide).

Therefore, filters must be implemented. But in order to do so, the content must be intercepted before it is inserted into the editor.

But this is only one of many reasons why having control over the clipboard is useful. It also allows to implement features like {@link features/drop_paste/README uploading pasted files}, customized integration that {@link guide/dev/deep_dive/widgets/README widgets} have and finally, allows what we love most, to have a highly unified behavior across all browsers.

The `contentEditable` attribute has no official specification yet, and features like what sort of content is put into the clipboard when the user copies some selected text will not be specified in the near future. Therefore, browsers vary when it comes to algorithms such as {@linkapi CKEDITOR.editor#getSelectedHtml "get selected HTML"} or {@linkapi CKEDITOR.editor#insertHtml "insert HTML into the selection"} that yield different, often very poor, results.

## The Paste Event

The {@linkapi CKEDITOR.editor#paste `paste` event} is the entry point for all pasted and, since CKEditor 4.5, also dropped content. This means that this event is fired every time some content is dropped or pasted. It does not matter if it was copied or dragged from another application, website, another editor or within a single editor. The {@linkapi CKEDITOR.editor#paste `paste` event} is fired and, unless canceled, the data that it contains will be inserted into the editor.

For example, if you want to replace all old British swears like "Zooterkins" and "Gadzooks" with stars in the pasted content, you could do it this way:

```js
editor.on( 'paste', function( evt ) {
	evt.data.dataValue = evt.data.dataValue
		.replace( /zooterkins/gi, 'z********s' )
		.replace( /gadzooks/gi, 'g******s' );

	// This code obviously will not preserve the case of the first and last letters.
	// Let it be an exercise for the reader ;).
} );
```

Note that `dataValue` is a JavaScript string with HTML which means that it may need to be parsed to achieve more complex changes and stringified back later.

```js
editor.on( 'paste', function( evt ) {
		// Create a standalone filter passing 'p' and 'b' elements.
	var filter = new {@linkapi CKEDITOR.filter CKEDITOR.filter}( 'p b' ),
		// Parse the HTML string to a pseudo-DOM structure.
		fragment = {@linkapi CKEDITOR.htmlParser.fragment.fromHtml CKEDITOR.htmlParser.fragment.fromHtml}( evt.data.dataValue ),
		writer = new {@linkapi CKEDITOR.htmlParser.basicWriter CKEDITOR.htmlParser.basicWriter}();

	filter.applyTo( fragment );
	fragment.writeHtml( writer );
	evt.data.dataValue = writer.getHtml();
} );
```

CKEditor 4 performs its input data transformations (like cleanup, type recognition, formating a document from Word or Google Docs, file upload) the same way, using paste listeners.

The `evt.data.dataValue` is the most important property as this is the HTML which will be passed to the {@linkapi CKEDITOR.editor#insertHtml} method in the last {@linkapi CKEDITOR.editor#paste `paste`} listener.

But the `paste` event contains more useful properties like `evt.data.method` (`'drop'` or `'paste'`) or `evt.data.type` (`'auto'`, `'html'` or `'text'`). Refer to the {@linkapi CKEDITOR.editor#paste} documentation to learn about all available properties.

### Content Type

The `evt.data.type` role is to tell the editor what the original type of the data being pasted was. It affects how this content is later handled upon insertion.

For instance, if you pasted a plain text into a paragraph, it should inherit that paragraph's formatting. So if the paragraph was red and bold, the text should be red and bold, too:

```html
<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

/* paste, dataValue: 'foo', type: 'text' */
<p><span style="color:#FF0000"><strong>Lorem foo ipsum</strong></span></p>
```

But if the content that was pasted was HTML, then the formatting that it originally had should be preserved, even though the `dataValue` may not contain any obvious HTML tags:

```html
<p><span style="color:#FF0000"><strong>Lorem ^ ipsum</strong></span></p>

/* paste, dataValue: 'foo', type: 'html' */

<p><span style="color:#FF0000"><strong>Lorem </strong></span>
foo
<span style="color:#FF0000"><strong> ipsum</strong></span></p>
```

Note that in both cases the pasted `dataValue` is an HTML string. If a plain text is pasted and the `type` is set to `'text'`, `dataValue` contains an "HTMLified" version of that plain text. It means that line breaks are replaced with `<br>`, double line breaks create separate paragraphs, etc.

### Content Type Recognition

In many cases everything that the editor gets from the clipboard is an HTML string (see the {@link guide/dev/deep_dive/clipboard/README#paste-bin Paste Bin} section below), so CKEditor 4 is not able to guess the type of the pasted content. For instance, when `dataValue` equals `'foo'`, then was it possibly copied from a website or from a text editor? At the time of writing this article it is only possible to recognize the real content type in Chrome, Firefox and Opera, so in other browsers the type depends on {@linkapi CKEDITOR.config#clipboard_defaultContentType } (hence, most of the time it is `'html'` regardless of what was pasted).

This recognition is also done in the {@linkapi CKEDITOR.editor#paste `paste` event} listener, with a priority of `6`, so listeners with higher priorities may see the `type == 'auto'` which means that the type is not yet recognized.

## Data Transfer

Another useful property of the `paste` event is the `evt.data.dataTransfer` property which is an instance of the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer } class. It was introduced in CKEditor 4.5 when CKEditor started using the [Clipboard API](http://www.w3.org/TR/clipboard-apis/) whenever it is possible. Thanks to this you have access to:

* Data of various types, like `text/html`, `text/plain`, `application/json` or `application/rtf`.
* Dropped or pasted [files](http://www.w3.org/TR/FileAPI/), so they can be read and uploaded.

Limited browser capabilities related to clipboard support required implementing a rich {@linkapi CKEDITOR.plugins.clipboard.dataTransfer facade} for this feature which partially works as a polyfill. It allows to achieve results which would otherwise not be possible. For instance, it is possible to {@linkapi CKEDITOR.plugins.clipboard.dataTransfer#setData set} and {@linkapi CKEDITOR.plugins.clipboard.dataTransfer#getData get} various data types (while all versions of Internet Explorer [support only `Text` and `URL`](http://bit.ly/1HrSxlJ)) and to know the source of the data that was dropped.

### Handling Various Data Types with Clipboard API

By default CKEditor 4 handles only `text/html` and `text/plain` data types. If Clipboard APIs are available, in a `paste` event listener with a priority of `1` the editor checks if the `text/html` data is available in the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer} object and if so, copies it to `dataValue` and sets the `type` to be `'html'`. If it is unavailable, the editor checks `text/plain` and does the same after "HTMLifying" it. If both types are empty, it means that `dataTransfer` contains files or data in some other format. If the `dataValue` property is not set in any listener, {@linkapi CKEDITOR.editor#insertHtml} will not be called.

If you want to add support for some data format, use the `paste` event listener. For example, if you want to handle Rich Text Format and you created the `rtfToHtml()` converter, you can do the following:

```js
editor.on( 'paste', function( evt ) {
	var rtf = evt.data.dataTransfer.getData( 'application/rtf' );

	if ( rtf ) {
		evt.data.dataValue = rtfToHtml( rtf );
	}
} );
```

This is also the way how files are handled.

<!--
To learn more about pasting and dropping files see the [file handling guide](#!/guide/dev_files).
-->

{@linkapi CKEDITOR.plugins.clipboard.dataTransfer} has also a method to check what the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer#getTransferType transfer type} was: if the data comes from the same editor, another editor or external source. This recognition works perfectly fine for dragging and dropping, but not for copying and pasting. Because of browser limitations, we are not able to recognize the source in every case, so we assume that it is {@linkapi CKEDITOR#DATA_TRANSFER_EXTERNAL external} in cases we are not sure.

## Copy, Cut and Paste

CKEditor 4 wants to intercept pasted data in every browser. Unfortunately, the Clipboard API is not yet available in all browsers, so CKEditor 4 uses a hybrid solution to get the data using the Clipboard API and a paste bin.

### Clipboard API

It would be perfect if getting data from clipboard when the Clipboard API was available was as simple as accessing the [`clipboardData`](http://www.w3.org/TR/clipboard-apis/#widl-ClipboardEvent-clipboardData) from the native `paste` event and using a backup solution if Clipboard API is not available. Unfortunately, at the moment of writing this article, we know about cases in most browsers where the data is pasted when allowing the browser to perform a native `paste`, but is not available through the browser Clipboard API.

If the data is available through the [Clipboard API](http://www.w3.org/TR/clipboard-apis/), CKEditor 4 fires the {@linkapi CKEDITOR.editor#paste `paste` event} with the data available in the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer} and an empty `dataValue`. If it is not possible, CKEditor 4 uses the paste bin.

### Paste Bin

A paste bin is a CKEditor 4 mechanism to capture native paste. The mechanism works in the following steps:

* When an attempt to paste the data is discovered, a moment before the paste really happens, CKEditor 4 moves the selection to a special hidden container called the "paste bin".
* Next, CKEditor 4 waits to let the browser do the native paste into that paste bin.
* After a short timeout CKEditor 4 gets the content of this container.
* Then, CKEditor 4 moves the selection back to the {@linkapi CKEDITOR.editable} and removes the paste bin.
* Finally, CKEditor 4 fires the `paste` event with captured data as the `dataValue`.

It is very tricky to prevent the browser from blinking and scrolling. Up to version 4.5 this was the main mechanism for pasting and many bugs were reported and needed our patches. Now this is a backup solution when the Clipboard API is not supported properly. It is used in Internet Explorer, Edge and Chrome for Android.

### Cut and Copy

Since version 4.5 CKEditor has a custom cut and copy handling mechanism, which means that it copies or cuts selected HTML using the {@linkapi CKEDITOR.editor#getSelectedHtml} and {@linkapi CKEDITOR.editor#extractSelectedHtml} methods and puts that data into the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer} object as `text/html`. By using these methods instead of letting the browser handle copy and cut natively, CKEditor 4 is able to handle these operations in the same way in all browsers, and to focus on what the user expected.

To avoid the security alerts in Internet Explorer when the user copies or cuts content using keyboard shortcuts, the editor does not use custom methods and lets the browser get or extract selected data.

## Drag and Drop

Since version 4.5 CKEditor handles dragging and dropping manually. CKEditor 4 uses the native browser drag and drop mechanism and listens for `dragstart`, `dragend`, `dragover` and `drop` events on the {@linkapi CKEDITOR.editable } area and fires the editor's events:

* {@linkapi CKEDITOR.editor#dragstart },
* {@linkapi CKEDITOR.editor#dragend },
* {@linkapi CKEDITOR.editor#drop }.

Listeners for these events perform the entire drag and drop operation, which means that CKEditor 4 puts dragged content into the {@linkapi CKEDITOR.plugins.clipboard.dataTransfer} object (if `dragstart` is inside it), gets dragged content, finds a range at the drop position and fires the `paste` event. Note that these events do not need to be based on native events. For example, the drag and drop of the block widgets uses [Line Utilities](https://ckeditor.com/cke4/addon/lineutils) and listens for mouse events, but fires the {@linkapi CKEDITOR.editor#dragstart }, {@linkapi CKEDITOR.editor#dragend } and {@linkapi CKEDITOR.editor#drop } events so the drag and drop is handled by the same code and hence can be processed in the same way.

Note that the {@linkapi CKEDITOR.editor#drop `drop` event} fires the {@linkapi CKEDITOR.editor#paste `paste` event} which is the one which should be used for data transformations such as filtering or uploading files.

An interesting example of this feature is how drag and drop of {@link guide/dev/deep_dive/widgets/README widgets} is implemented:

```js
editor.on( 'dragstart', function( evt ) {
	var target = evt.data.target;

	if ( WidgetRepository.isDomDragHandler( target ) ) {
		evt.data.dataTransfer.setData( 'cke/widget-id', widget.id );
	}
} );
```

As you can see, when the user drags a widget, its ID is stored in the data under the `cke/widget-id` type. This allows you to find and handle that specific widget instance on {@linkapi CKEDITOR.editor#drop drop}.

Another example can be found in the {@linkexample draganddrop "Drag and Drop Integration" sample} where the  {@linkapi CKEDITOR.plugins.clipboard.dataTransfer `dataTransfer` facade} is used to store an object with contact details that are dragged into the editor from outside of it.

```js
// When an item in the contact list is dragged, copy its data into drag and drop data transfer.
// This data is later read by the editor#paste listener in the hcard plugin defined above.
CKEDITOR.document.getById( 'contactList' ).on( 'dragstart', function( evt ) {
    // The target may be some element inside the draggable div (e.g. the image), so get the div.h-card.
    var target = evt.data.getTarget().getAscendant( 'div', true );

    // Initialization of CKEditor data transfer facade is a necessary step to extend and unify native
    // browser capabilities. For instance, Internet Explorer does not support any other data type than 'text' and 'URL'.
    // Note: evt is an instance of {@linkapi CKEDITOR.dom.event CKEDITOR.dom.event}, not a native event.
    CKEDITOR.plugins.clipboard.initDragDataTransfer( evt );

    var dataTransfer = evt.data.dataTransfer;

    // Pass an object with contact details. Based on it, the editor#paste listener in the hcard plugin
    // will create HTML to be inserted into the editor. We could set text/html here as well, but:
    // * It is a more elegant and logical solution that this logic is kept in the hcard plugin.
    // * We do not know now where the content will be dropped and the HTML to be inserted
    // might vary depending on the drop target.
    dataTransfer.setData( 'contact', CONTACTS[ target.data( 'contact' ) ] );

    // We need to set some normal data types to backup values for two reasons:
    // * In some browsers this is necessary to enable drag and drop into text in editor.
    // * The content may be dropped in another place than the editor.
    dataTransfer.setData( 'text/html', target.getText() );

    // You can still access and use the native dataTransfer - e.g. to set the drag image.
    // Note: IEs do not support this method... :(.
    if ( dataTransfer.$.setDragImage ) {
        dataTransfer.$.setDragImage( target.findOne( 'img' ).$, 0, 0 );
    }
} );

// ...

// Handle dropping a contact by transforming the contact object into HTML.
// Note: All pasted and dropped content is handled in one event - editor#paste.
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
```

## Further Reading

For more information on pasting, dropping and uploading files with CKEditor 4 refer to the following articles:

* {@link features/drop_paste/README Dropping and Pasting into Editor Content}
* {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files}
* {@link features/pastefromword/README Pasting Content from Microsoft Word}
* {@link features/pastefromgoogledocs/README Pasting Content from Google Docs}
* {@link guide/dev/acf/README Content Filtering (ACF)}
* {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filter}
