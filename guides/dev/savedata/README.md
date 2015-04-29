<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Getting and Saving Data in CKEditor

CKEditor helps you create content but it is the role of your website or application to deal with the data created in this way. Saving data is a server-side operation and you are free to implement the save functionality on your own, in any way you like. CKEditor is a pure JavaScript component and it does not offer anything more than JavaScript methods and events to access the data so that you could save it on the server.

The [CKEditor JavaScript API](#!/api) makes it easy to retrieve and control the data. Depending on your usage scenario, the data can either be submitted to your server along with the parent `<form>` element or be used in Ajax applications where editor instances are created and destroyed dynamically.

## Retrieving Data from CKEditor

Some applications need to handle all data on the client side, sending it to the server using their specific methods. This is what usually happens in [inline editing](#!/guide/dev_inline) &mdash; with the possibility to [create](#!/api/CKEDITOR-method-inline) and [destroy](#!/api/CKEDITOR.editor-method-destroy) CKEditor instances dynamically, CKEditor is a perfect match for Ajax applications. If this is the case, it is enough to use the JavaScript API methods to easily retrieve the editor instance data.

To retrieve the editor data, call the CKEDITOR.editor.getData method of the editor instance. For an editor instance with an ID of `editor1`, this would look like the following:

	<script>
		var data = CKEDITOR.instances.editor1.getData();

		// Your code to save "data", usually through Ajax.
	</script>

<p class="tip">
	If you do not save your data with a library that already encodes it by using the JavaScript <code>encodeURIComponent</code> method, but do it manually instead, you will have to remember to use <code>encodeURIComponent</code> to properly encode the data that is being sent.
</p>

Note that the ID of the original element that is replaced with CKEditor was passed to the {@link CKEDITOR#instances} object to make it possible to retrieve the editor instance.

## Saving Data in CKEditor Replacing a Textarea

When CKEditor functions as a replacement for a `<textarea>` element, the integration with the parent `<form>` element is automatic. CKEditor automatically updates the replaced `<textarea>` when the form is submitted, so there is no need to change any server-side code handling form submission after enabling CKEditor on an exisiting form element.

This means that when submitting a form containing an editor instance, its data will simply be posted to the server, using the `<textarea>` element name as the key to retrieve it.

For example, for the `<textarea>` element with an ID of `editor1`, as used in our [Quick Start Guide example](#!/guide/dev_installation-section-adding-ckeditor-to-your-page), you could create this PHP code:

	<?php
		$editor_data = $_POST[ 'editor1' ];
	?>

This method works for any CKEditor instance that replaces a `<textarea>` in a `<form>` element, both [classic](#!/guide/dev_framed-section-creating-a-classic-editor-with-a-textarea) and [inline](#!/guide/dev_inline-section-inline-editing-for-textarea).

<div class="tip">
	<p>Please note that the replaced <code>&lt;textarea&gt;</code> element is updated automatically by CKEditor straight before submission. If you need to access the <code>&lt;textarea&gt;</code> value programatically with JavaScript (e.g. in the <code>onsubmit</code> handler to validate the entered data), there is a chance that the <code>&lt;textarea&gt;</code> element would still store the original data. In order to update the value of replaced <code>&lt;textarea&gt;</code> use the <code><a href="#!/api/CKEDITOR.editor-method-updateElement">editor.updateElement()</a></code> method.</p>
	<p>In rare cases it may happen that the server or application configuration will reject submitted HTML content if it is not encoded first (e.g. ASP.NET <code>ValidateRequest</code>). In such case check the <a href="#!/api/CKEDITOR.config-cfg-htmlEncodeOutput">config.htmlEncodeOutput</a> option.</p>
	<p>If you need to get the actual data from CKEditor at any moment using JavaScript, use the <code><a href="#!/api/CKEDITOR.editor-method-getData">editor.getData()</a></code> method as described above.</p>
</div>

## Observing Changes in CKEditor

Whenever a change is made in the editor, CKEditor fires the [change](#!/api/CKEDITOR.editor-event-change) event. This makes additional features like auto-saving really easy to develop.

The following example shows how to listen to the `change` event and print the total number of bytes to the console:

	var editor = CKEDITOR.replace( 'editor1' );
	
	// The "change" event is fired whenever a change is made in the editor.
	editor.on( 'change', function( evt ) {
		// getData() returns CKEditor's HTML content.
		console.log( 'Total bytes: ' + evt.editor.getData().length );
	});

## The Save Plugin

A dedicated **[Save](http://ckeditor.com/addon/save)** plugin for CKEditor is available, too. It provides the <img class="inline" src="guides/dev_savedata/save_01.png" title="Save" alt="Save"> button, which fires the [save](#!/api/CKEDITOR.editor-event-save) event, but it currently works only for classic editor placed inside the `<form>` element.

## Getting and Saving Data Demos

The following samples are available for getting and saving data in CKEditor:

* The [Saving Data in CKEditor Replacing a Textarea](http://sdk.ckeditor.com/samples/savetextarea.html) sample shows how to save data for classic and inline editor replacing a `<textarea>` element.
* The [CKEditor in Ajax Applications](http://sdk.ckeditor.com/samples/saveajax.html) sample shows how to dynamically create and destroy the editor and how to use the [change](#!/api/CKEDITOR.editor-event-change) event.