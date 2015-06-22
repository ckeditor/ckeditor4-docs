<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

Adding File Browser to Dialog
=============================

CKEditor can be easily integrated with your own file browser thanks to the [File Browser](http://ckeditor.com/addon/filebrowser) plugin which is included in every preset by default.

To connect a file browser that is already compatible with CKEditor (like
[CKFinder](http://ckfinder.com)), follow the [File Browser (Uploader)](#!/guide/dev_file_browse_upload)
documentation.

Dialogs
-------

Please refer to the {@link CKEDITOR.dialog.definition Dialog definition API} for
general help on how to create a dialog box.

Filebrowser Plugin
------------------

The `filebrowser` plugin is built-in into CKEditor. It's only purpose is
to provide an API inside of CKEditor to easily integrate any external
file browser with it and to add file browser features to various
CKEditor components (usually to dialogs).

### Adding "Browse Server" button

To assign the filebrowser plugin to an element inside of a dialog box,
set the "filebrowser" property. For example in the `image` plugin source
there is:

	{
		type: 'button',
		hidden: true,
		id: 'browse',
		filebrowser: 'Link:txtUrl',
		label: editor.lang.common.browseServer,
		style: 'float:right',
	},

This button will be hidden by default (`hidden:true`). The filebrowser
plugin looks for all elements with the filebrowser attribute and unhides
them if appropriate configuration setting is available
([filebrowserBrowseUrl/filebrowserUploadUrl](#!/guide/dev_file_browse_upload-section-1)).

The action performed by the plugin depends on the element
type, for {@link CKEDITOR.dialog.definition.fileButton fileButton}
it is **QuickUpload**, for other elements the default action is
**Browse**. In the example above, the file browser will be launched (in
a popup) when button is clicked.

The `'Link:txtUrl'` value instructs the plugin to update an
element with id `txtUrl` inside of the `Link` tab when
`CKEDITOR.tools.callFunction( funcNum )` is called (see [Custom File
Browser](#!/guide/dev_file_browser_api)).

### Adding "Quick Upload" support

Again, to see how we can handle file uploads in our dialog box, we'll
use working example from CKEditor. In the `image` plugin there is a definition
of the `Upload` tab:

	{
		id: 'Upload',
		hidden: true,
		filebrowser: 'uploadButton',
		label: editor.lang.image.upload,
		elements: [
			{
				type: 'file',
				id: 'upload',
				label: editor.lang.image.btnUpload,
				style: 'height:40px',
				size: 38
			},
			{
				type: 'fileButton',
				id: 'uploadButton',
				filebrowser: 'info:txtUrl',
				label: editor.lang.image.btnUpload,
				'for': [ 'Upload', 'upload' ]
			}
		]
	},

This example is a little bit more complicated than the previous one,
because 1) we have here a definition of the whole tab 2) we need two
elements:
{@link CKEDITOR.dialog.definition.file file}
and
{@link CKEDITOR.dialog.definition.fileButton fileButton}
to upload a file.

In the example above, the id of a tab is `'Upload'`. It is hidden by
default (`hidden:true`). As already mentioned, the filebrowser plugin
looks for all elements with the filebrowser attribute and unhides them
if appropriate configuration setting is available. In this case, the tab will
be unhidden automatically if a filebrowser setting for `'uploadButton'`
(because of `filebrowser:'uploadButton'`) will be available (`filebrowserUploadUrl`).

The `file` element is simple and doesn't need to be explained, it is
just an input element that will store the name of a file that will be
uploaded.

The `fileButton` element is more interesting. The `'info:txtUrl'` value
instructs the filebrowser plugin to update an element with id `txtUrl`
inside of the `info` tab when `CKEDITOR.tools.callFunction( funcNum )` is
called (see [Custom File Browser](#!/guide/dev_file_browser_api)).
The `'for': [ 'Upload', 'upload'   ]` line is used to connect
fileButton with file element. It is an instruction for CKEditor to
upload a file using the `'file'` element with id `'upload'` (second
value) inside of the `'Upload'` tab (first value).

### Advanced configuration (Browsing)

It is possible to define your own function that will be called when file
is selected/uploaded.

	{
		type: 'button',
		hidden: true,
		id: 'id0',
		label: editor.lang.common.browseServer,
		filebrowser: {
			action: 'Browse',
			// target: 'tab1:id1',
			onSelect: function( fileUrl, data ) {
				alert( 'The selected file URL is "' + fileUrl + '"' );

				for ( var _info in data )
					alert( 'data[ "' + _info + '" ]' + ' = ' + data[ _info ] );

				var dialog = this.getDialog();
				dialog.getContentElement( 'tab1', 'id1' ).setValue( data[ 'fileUrl' ] );

				// Do not call the built-in onSelect command
				return false;
			}
		}
	}

In this example we're setting the action to 'Browse' to call the file
browser when button is clicked. `'target'` is not required, because
we'll update the target element in the custom `onSelect` function.

As explained in the [documentation](#!/guide/dev_file_browser_api),
we have called `CKEDITOR.tools.callFunction( funcNum, fileUrl, data );`
when user selected a file. The fileUrl and data arguments are passed to
our custom `onSelect` function and we can use it to update the target
element.

### Advanced configuration (Quick Uploads)

In a similar way like we configured the button to open the file browser,
we can configure the fileButton.

	{
		type: 'file',
		label: editor.lang.common.upload,
		labelLayout: 'vertical',
		id: 'id2'
	},
	{
		type: 'fileButton',
		label: editor.lang.common.uploadSubmit,
		id: 'id3',
		filebrowser: {
			action: 'QuickUpload',
			params: { type: 'Files', currentFolder: '/folder/' },
			target: 'tab1:id1',
			onSelect: function( fileUrl, errorMessage ) {
				alert( 'The url of uploaded file is: ' + fileUrl + '\nerrorMessage: ' + errorMessage );
				// Do not call the built-in onSelect command
				// return false;
			}
		},
		'for': [ 'tab1', 'id2' ]
	}

In the `filebrowser.params` attribute we can add additional arguments to
be passed in the query string to the external file browser.
`filebrowser.target` is the target element to be updated when file is
returned by the server connector (uploader) - we don't need it if we
define our own `onSelect` function (`filebrowser.onSelect`) and update
the target element in this function, just like we did in previous
example.
