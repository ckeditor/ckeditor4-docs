# jQuery Adapter
CKEditor offers native jQuery integration through its jQuery Adapter (a jQuery plugin basically). It provides deep integration of CKEditor into jQuery, using its native features.

Using adapter every `textarea` element can be converted to frame editor and any other {@link CKEDITOR.dtd#$editable supported tag} can be converted into inline editor.

## Creating Editor Instances
In order to create editor instances, load the usual CKEditor core script file as well as the jQuery Adapter file, in the following order:

	<script src="jquery.js"></script>
	<script src="ckeditor.js"></script>
	<script src="adapters/jquery.js"></script>

At this point you can transform elements into a rich text editor by using the  {@link adapters.jQuery#ckeditor ckeditor()} method.

	$( 'textarea.editor' ).ckeditor();

Note that you can also make use of the jQuery chaining.

	$( '.section-x' )
		.find( 'textarea.editor' )
			.ckeditor()
		.end()
		.find( 'a' )
			.addClass( 'mylink' )
		.end();

The {@link adapters.jQuery#ckeditor ckeditor()} method is the main method of the jQuery adapter. It accepts two optional parameters:

 - A callback function to be executed when the editor is ready.

		$( 'textarea' ).ckeditor( function( textarea ) {
		  // callback function code
		} );

 - Configuration options specific to the created editor instance.

		$( 'textarea' ).ckeditor( {
			uiColor: '#9AB8F3'
		} );

Mixed parameter order is allowed. The configuration options are passed through a simple object that contains properties, each one related to a specific editor setting.

	$('.jquery_ckeditor')
	    .ckeditor( function() { /* callback code */ }, { skin : 'office2003' } )
	    .ckeditor( callback2 );

The code presented above will not create two editors. On discovering that one editor is already being created, it will wait with the second callback. Each of the callback functions will be executed in the context of the CKEDITOR.editor object (so this will be the editor) and the DOM element object will be passed as parameter.

## Editor Instance

If you need access to {@link CKEDITOR.editor} object you can use the {@link adapters.jQuery#editor editor} property:

	var editor = $('.jquery_ckeditor').ckeditor().editor;
	alert( editor.checkDirty() );

To keep the backward compatibility it is also possible to use {@link adapters.jQuery#ckeditorGet ckeditorGet()} method, but this way is deprecated.

##.val() method

Because setting and retrieving the editor data is a common operation, the jQuery Adapter also provides a dedicated {@link adapters.jQuery#val val()} method that is an extension of the original [jQuery val()](http://api.jquery.com/val/) method. This method works similar to the jQuery version, but additionally it allows to get and set the framed editor contents.

	// Get the editor data.
	var data = $( 'textarea.editor' ).val();
	// Set the editor data.
	$( 'textarea.editor' ).val( 'my new content' );

Because {@link CKEDITOR.editor#method-setData setting data} in CKEditor is asynchronous operation `.val( 'some data' )` will return [jQuery promise](http://api.jquery.com/promise/). You can use it with jQuery helpers:

	$.when( $( '#editor' ).val( 'foo' ) ).then( function() {
		//Now you are sure that data are set.
	} );

Overwriting `val` function can be disabled by setting {@link CKEDITOR.config#jqueryOverrideVal jqueryOverrideVal} to false before loading the adapter code.

This method works only for editors created from `textarea`. It will not work for inline editors.

## Submit and jQuery Form

jQuery adapter add also some improvements for better integration with jQuery and [jQuery Form Plugin](http://www.malsup.com/jquery/form/).

First of all jQuery adapter overwrites {@link CKEDITOR.editor#save save event}. If you use adapter when user press save button on toolbar [jQuery submit](http://api.jquery.com/submit/) method will be called.

Moreover for `<textarea>` elements the editor will also automatically return its content back to the form when it is submitted.

Thanks to this changes CKEditor automatically works with the official jQuery Form Plugin for AJAX based forms. It does not require any action from the developer's side to support it.

## Event handling
Although CKEditor uses its own event system, there are five events which are being exposed to the jQuery event system. All events use the event namespace, which is simply named `.ckeditor`.

The following events are available:

 - {@link adapters.jQuery#instanceReady instanceReady.ckeditor} - fired when the editor is created, but before any callback is being passed to the ckeditor() method,
 - {@link adapters.jQuery#setData setData.ckeditor} - fired when data is set in the editor allowing additional manipulation,
 - {@link adapters.jQuery#dataReady dataReady.ckeditor} - fired as an indicator of the editor data loading,
 - {@link adapters.jQuery#getData getData.ckeditor} - fired when data is fetched from the editor. The current editor data is also passed in the arguments,
 - {@link adapters.jQuery#destroy destroy.ckeditor} - fired when the editor gets destroyed. It can be used, for example, to execute some cleanup code on the page.

The editor instance is always passed as the first data argument for the listener. getData, dataReady and setData are often used internally, so listening to them should be done with care.

jQuery events do bubble up through the DOM, so they can be listened to selectively in certain parts of the document.
