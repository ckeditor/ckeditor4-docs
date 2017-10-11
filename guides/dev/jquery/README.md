<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# The jQuery Adapter

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.2</strong>. It is provided through the <code>adapters/jquery.js</code> script file which is included in all CKEditor packages available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site.
</p>

CKEditor offers native jQuery integration through its jQuery Adapter (a jQuery plugin basically). It provides deep integration of CKEditor and jQuery that lets you use the native features of jQuery when using CKEditor. The jQuery Adapter is compatible with jQuery versions 1.7+ and 2.0+.

Thanks to the jQuery Adapter every `textarea` element can be converted into a [classic editor](#!/guide/dev_framed), while  any other {@link CKEDITOR.dtd#$editable editable} element can be changed into an [inline editor](#!/guide/dev_inline).


## Creating Editor Instances

In order to create editor instances, load the jQuery script file, the CKEditor core script file as well as the jQuery Adapter file, in the following order:

	<script src="jquery.js"></script>
	<script src="ckeditor.js"></script>
	<script src="adapters/jquery.js"></script>

At this point you can transform elements into a rich text editor by using the {@link CKEDITOR_Adapters.jQuery#ckeditor ckeditor()} method.

	$( 'textarea.editor' ).ckeditor();

Note that you can also make use of the jQuery chaining.

	$( '.section-x' )
		.find( 'textarea.editor' )
			.ckeditor()
		.end()
		.find( 'a' )
			.addClass( 'mylink' )
		.end();

The {@link CKEDITOR_Adapters.jQuery#ckeditor ckeditor()} method is the main method of the jQuery Adapter. It accepts two optional parameters:

 * A callback function to be executed when the editor is ready.

		$( 'textarea' ).ckeditor( function( textarea ) {
		  // Callback function code.
		} );

 * Configuration options specific to the created editor instance.

		$( 'textarea' ).ckeditor( {
			uiColor: '#9AB8F3'
		} );

Mixed parameter order is allowed. The configuration options are passed through a simple object that contains properties, each one related to a specific editor setting.

	$('#jquery_ckeditor')
		.ckeditor( function() { /* Callback function code. */ }, { uiColor : '#9AB8F3' } )
		.ckeditor( callback2 );

Please note that the code presented above will not create two editors. On discovering that one editor is already being created, it will wait with the second callback. Each of the callback functions will be executed in the context of the {@link CKEDITOR.editor} object (so this will be the editor) and the DOM element object will be passed as a parameter.

The problem with the callback parameter appears when you apply the `ckeditor()` method on a collection:

	$('.editors')
		.ckeditor( function() {
			// This function will be called repeatedly (as many times as many elements have the 'editors' class).
		} );

If you want to apply some code after the last editor is created with a callback, you would need to create a counter to count the number of callback functions already called. To avoid this, the jQuery Adapter returns the {@link CKEDITOR_Adapters.jQuery#promise jQuery Promise object} which will be called after the last callback. With this Promise object you can use all of the jQuery helpers for asynchronous operations like `$.when()`:

	$.when( $( '.editors' ).ckeditor().promise ).then( function() {
		// Now all editors have already been created.
	} );

## Editor Instance

If you need access to the {@link CKEDITOR.editor} object, you can use the {@link CKEDITOR_Adapters.jQuery#editor editor} property:

	var editor = $('.jquery_ckeditor').ckeditor().editor;
	alert( editor.checkDirty() );

To preserve backward compatibility with the CKEditor 3.x adapter version, it is also possible to use the {@link CKEDITOR_Adapters.jQuery#ckeditorGet ckeditorGet()} method, but this way is deprecated.

## The .val() Method

Because setting and retrieving the editor data is a common operation, the jQuery Adapter also provides a dedicated {@link CKEDITOR_Adapters.jQuery#val val()} method that is an extension of the original [jQuery val()](http://api.jquery.com/val/) method. It works similarily to the jQuery version and gets the value of the first element in the set of matched elements or sets the value of every matched element. Additionally it allows you to get or set the contents of the classic editor.

	// Get the editor data.
	var data = $( 'textarea.editor' ).val();
	// Set the editor data.
	$( 'textarea.editor' ).val( 'My new content' );

Because {@link CKEDITOR.editor#method-setData setting data} in CKEditor is an asynchronous operation , `val( 'some data' )` will return a [jQuery Promise object](http://api.jquery.com/promise/) if any of the elements is an editor. You can use it with jQuery helpers:

	$.when( $( '#editor' ).val( 'foo' ) ).then( function() {
		// Now you are sure that the data is set.
	} );

This promise will be resolved when all `setData` methods are done.

	$.when( $( '.editors' ).val( 'foo' ) ).then( function() {
		// All of editors have set data.
	} );

Overwriting the `val()` function can be disabled by setting the {@link CKEDITOR.config#jqueryOverrideVal jqueryOverrideVal} configuration option to `false` before loading the adapter code.

This method works only for editors created from `<textarea>` elements. It will not work for inline editors.


## Submitting Data and the jQuery Form Plugin

The jQuery Adapter also adds some improvements for better integration with jQuery and the [jQuery Form Plugin](http://www.malsup.com/jquery/form/). The adapter code was tested with version 3.24 of the plugin.

First of all, the jQuery Adapter overwrites the CKEditor {@link CKEDITOR.editor#save save event}. If you use the adapter, each time the user presses the **Save** button on the editor toolbar, the [jQuery submit()](http://api.jquery.com/submit/) method will be called.

Moreover for `<textarea>` elements the editor will also automatically return its contents back to the form when it is submitted.

Thanks to these changes CKEditor automatically works with the official jQuery Form Plugin for Ajax-based forms. It does not require any action from the developer's side to support it.

For example you can write the following HTML code:

	<form>
		<textarea>Lorem ipsum</textarea>
		<input type="submit" value="Save">
	</form>

And some JavaScript code:

	$( 'textarea' ).ckeditor();

	//...

	$( 'form' ).ajaxSubmit( {
		beforeSubmit: function() {
			// The textarea is already updated now and has the same value as the editor, so you can validate it.
		}
	} );


## Event Handling

Although CKEditor uses its own event system, there are five events which are being exposed to the jQuery event system. All events use the common event namespace, which is simply called `ckeditor`.

The following events are available:

 * {@link CKEDITOR_Adapters.jQuery#instanceReady instanceReady.ckeditor} &ndash; Fired when the editor is created, but before any callback is passed to the `ckeditor()` method.
 * {@link CKEDITOR_Adapters.jQuery#destroy destroy.ckeditor} &ndash; Fired when the editor gets destroyed. It can be used, for example, to execute some cleanup code on the page.
 * {@link CKEDITOR_Adapters.jQuery#setData setData.ckeditor} &ndash; Fired when the data is set in the editor. This allows you to perform some additional data manipulation.
 * {@link CKEDITOR_Adapters.jQuery#dataReady dataReady.ckeditor} &ndash; Fired as an indicator of the editor data loading.
 * {@link CKEDITOR_Adapters.jQuery#getData getData.ckeditor} &ndash; Fired when the data is fetched from the editor. The current editor data is also passed in the arguments. For example:

		$( '.editor' ).ckeditor().on( 'getData.ckeditor', function( event, editor, data ) {
			// If you want to convert the data to upper case whenever you get a value.
			data.dataValue = data.dataValue.toUpperCase();
		} );

The editor instance is always passed as the first data argument for the listener. The `getData`, `dataReady`, and `setData` events are often used internally, so listening to them should be done with care.

If you apply an event on a collection, it will be connected with each editor in the collection.

Note that jQuery events bubble up through the DOM tree, so they can be listened to selectively in certain parts of the document.
