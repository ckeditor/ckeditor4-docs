<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Browser API

CKEditor can be easily integrated with your own file browser thanks to the [File Browser](http://ckeditor.com/addon/filebrowser) plugin which is included in every preset by default.

To connect a file browser that is already compatible with CKEditor (like
[CKFinder](http://ckfinder.com)), follow the [File Browser (Uploader)](#!/guide/dev_file_browse_upload)
documentation.

Interaction Between CKEditor and File Browser
---------------------------------------------

CKEditor automatically sends some additional arguments to the file
browser:

- {@link CKEDITOR.editor#name CKEditor} – name of the CKEditor instance,
- {@link CKEDITOR.editor#langCode langCode} – CKEditor language (`en` for English),
- `CKEditorFuncNum` – anonymous function reference number used to pass the URL of
a file to CKEditor (a random number).

For example:

	CKEditor=editor1&CKEditorFuncNum=1&langCode=en

### Example 1

Suppose that CKEditor was created using the following JavaScript call:

	CKEDITOR.replace( 'editor2', {
		filebrowserBrowseUrl: '/browser/browse.php?type=Images',
		filebrowserUploadUrl: '/uploader/upload.php?type=Files'
	});

In order to browse files, CKEditor will call:

    /browser/browse.php?type=Images&CKEditor=editor2&CKEditorFuncNum=2&langCode=de

The call includes the following elements:

- `/browser/browse.php?type=Images` – the value of the
	`filebrowserBrowseUrl` parameter,
- `&CKEditor=editor2&CKEditorFuncNum=2&langCode=de` – the information
	added by CKEditor:
	- `CKEditor=editor2` – the name of a CKEditor instance
		(`editor2`),
	- `CKEditorFuncNum=2` – the reference number of an anonymous
		function that should be used in the
		{@link CKEDITOR.tools#callFunction callFunction},
	- `langCode=de` – language code (in this case: German). This
		parameter can be used to send localized error messages.

Passing the URL of the Selected File
------------------------------------

To send back the file URL from an external file browser, call
{@link CKEDITOR.tools#callFunction} and pass `CKEditorFuncNum` as the first
argument:

    window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl [, data] );

If `data` (the third argument) is a string, it will be displayed by
CKEditor. This parameter is usually used to display an error message if
a problem occurs during the file upload.

### Example 2

The following example shows how to send the URL from a file browser
using JavaScript code:

	// Helper function to get parameters from the query string.
	function getUrlParam( paramName ) {
		var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' ) ;
		var match = window.location.search.match(reParam) ;

		return ( match && match.length > 1 ) ? match[ 1 ] : null ;
	}
	var funcNum = getUrlParam( 'CKEditorFuncNum' );
	var fileUrl = '/path/to/file.txt';
	window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );

### Example 3

The following code shows how to send back the URL of an uploaded file
from the PHP connector:

	<?php
		// Required: anonymous function reference number as explained above.
		$funcNum = $_GET['CKEditorFuncNum'] ;
		// Optional: instance name (might be used to load a specific configuration file or anything else).
		$CKEditor = $_GET['CKEditor'] ;
		// Optional: might be used to provide localized messages.
		$langCode = $_GET['langCode'] ;

		// Check the $_FILES array and save the file. Assign the correct path to a variable ($url).
		$url = '/path/to/uploaded/file.ext';
		// Usually you will only assign something here if the file could not be uploaded.
		$message = ;

		echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
	?>

### Example 4

If `data` is a function, it will be executed in the scope of the button
that called the file browser. It means that the server connector can
have direct access CKEditor and the dialog window to which the button
belongs.

Suppose that apart from passing the `fileUrl` value that is assigned to
an appropriate field automatically based on the dialog window definition
you also want to set the `alt` attribute, if the file browser was opened
in the **Image Properties** dialog window. In order to do this, pass an
anonymous function as a third argument:

	window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl, function() {
		// Get the reference to a dialog window.
		var element,
			dialog = this.getDialog();
		// Check if this is the Image dialog window.
		if ( dialog.getName() == 'image' ) {
			// Get the reference to a text field that holds the "alt" attribute.
			element = dialog.getContentElement( 'info', 'txtAlt' );
			// Assign the new value.
			if ( element )
				element.setValue( 'alt text' );
		}
		...
		// Return false to stop further execution - in such case CKEditor will ignore the second argument (fileUrl)
		// and the onSelect function assigned to a button that called the file browser (if defined).
		[return false;]
	});
