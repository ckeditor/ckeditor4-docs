<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Uploading Dropped or Pasted Files

<p class="requirements">
	Uploading pasted and dragged images was introduced in <strong>CKEditor 4.5</strong>. It is provided through an optional
	<a href="https://ckeditor.com/cke4/addon/uploadimage">Upload Image</a> plugin that is not included in the CKEditor presets available from
	the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a>
	with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

Starting from CKEditor 4.5 it is possible to enable uploading pasted and dropped images. This article is about the editor-server configuration for pasted and dropped files since it uses a different API than the [File Browser](#!/guide/dev_file_browser_api) plugin. To get an overview about this feature, refer to the [Dropping and Pasting into Editor Content](#!/guide/dev_drop_paste) article.

## Basic Configuration

The CKEDITOR.config.uploadUrl setting contains the location of the script that handles file uploads of pasted and dragged files.

### Example &mdash; Setting Upload URL for Uploading Pasted and Dragged Content

The sample below shows basic configuration code that can be used to configure pasting and dragging images into CKEditor. Note that you also need to load a specific plugin to handle dropped files.

	config.extraPlugins = 'uploadimage';
	config.uploadUrl = '/uploader/upload.php';

<p class="tip">
	As a fallback solution, if CKEDITOR.config.uploadUrl is not set and CKEDITOR.config.filebrowserUploadUrl is provided for the File Browser plugin, the Upload Image plugin will try to use CKEDITOR.config.filebrowserUploadUrl instead and send the dragged and pasted images there.
</p>

It is also possible to set a specific URL for a specific upload plugin. For example if you want to use [Upload Image](https://ckeditor.com/cke4/addon/uploadimage), you can set CKEDITOR.config.imageUploadUrl which will be used instead of CKEDITOR.config.uploadUrl.

### Example &mdash; Setting Up Image Upload Plugin

	config.extraPlugins = 'uploadimage';
	config.imageUploadUrl = '/uploader/upload.php?type=Images';

To learn more about upload URL see the CKEDITOR.fileTools.getUploadUrl method.

## Communication between the Editor and the Server

To make uploading on drop or paste work you need a server-side application that will receive the uploaded file. This application is not a part of CKEditor. You need to make sure that both the editor and the server use the same API so they can communicate with each other. You can create the server-side API to fit the editor, change the way how the editor creates the requests and handles the responses to fit the existing server API or you can use a dedicated solution which will work out of the box. All three possibilities are described below.

### Server-Side Configuration

The [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) plugin uses a different API than the [File Browser](#!/guide/dev_file_browser_api) plugin and expects JSON responses.

#### Request

The default request for file uploads is a file as a form data with the 'upload' field.

#### Response: File Uploaded Successfully

When the file is uploaded successfully, a JSON response with the following entries is expected:

 * `uploaded` &ndash; Set to `1`.
 * `fileName` &ndash; The name of the uploaded file.
 * `url` &ndash; The URL to the uploaded file (URL-encoded).

**Example**

	{
		"uploaded": 1,
		"fileName": "foo.jpg",
		"url": "/files/foo.jpg"
	}

It is also possible to set an error message to indicate that the file upload was completed but some non-standard situation occurred.

**Example**

	{
		"uploaded": 1,
		"fileName": "foo(2).jpg",
		"url": "/files/foo(2).jpg",
		"error": {
			"message": "A file with the same name already exists. The uploaded file was renamed to \"foo(2).jpg\"."
		}
	}

#### Response: File Could Not Be Uploaded

When a file could not be uploaded, a JSON response with the following entries is expected:

 * `uploaded` &ndash; Set to `0`.
 * `error.message` &ndash; The error message to display to the user.

```
{
	"uploaded": 0,
	"error": {
		"message": "The file is too big."
	}
}
```

### Editor-Side Configuration

Alternatively to changing the server API you can change the editor API, so overwrite the way the editor builds requests and handles responses. You can do it using the CKEDITOR.editor.fileUploadRequest and CKEDITOR.editor.fileUploadResponse events.

#### Request

Using the CKEDITOR.editor.fileUploadRequest event you can change how the editor requests work.  If the event is not {@link CKEDITOR.eventInfo#stop stopped} or {@link CKEDITOR.eventInfo#cancel canceled}, the default request will be sent.

If you want to change this behavior you can add a custom listener with the default priority and {@link CKEDITOR.eventInfo#stop stop} the event which will prevent the default behavior. For example to send the data directly (without a form):

	editor.on( 'fileUploadRequest', function( evt ) {
		var xhr = evt.data.fileLoader.xhr;

		xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
		xhr.setRequestHeader( 'X-File-Name', this.fileName );
		xhr.setRequestHeader( 'X-File-Size', this.total );
		xhr.send( this.file );

		// Prevented the default behavior.
		evt.stop();
	} );

You can also add custom request headers or set flags for the default request. This is especially useful for enabling Cross-Origin requests. For more information about Cross-Origin Resource Sharing see [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS):

	editor.on( 'fileUploadRequest', function( evt ) {
		var xhr = evt.data.fileLoader.xhr;

		xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
		xhr.setRequestHeader( 'X-CUSTOM', 'HEADER' );
		xhr.withCredentials = true;
	} );

When you listen to the CKEDITOR.editor.fileUploadRequest event with the default priority you will get an `XHR` object which is opened as a `POST` asynchronous request. This happens in a listener with the priority of `5`, so if you want to also overwrite the open method in a request, you need to listen with a lower priority. For example to send a `PUT` request:

	editor.on( 'fileUploadRequest', function( evt ) {
		var fileLoader = evt.data.fileLoader,
			formData = new FormData(),
			xhr = fileLoader.xhr;

		xhr.open( 'PUT', fileLoader.uploadUrl, true );
		formData.append( 'upload', fileLoader.file, fileLoader.fileName );
		fileLoader.xhr.send( formData );

		// Prevented the default behavior.
		evt.stop();
	}, null, null, 4 ); // Listener with a priority 4 will be executed before priority 5.

Finally, you can also tell the {@link CKEDITOR.fileTools.fileLoader file loader} that the request was not sent so it will not change its {@link CKEDITOR.fileTools.fileLoader#status status}. To do this, you need to {@link CKEDITOR.eventInfo#cancel cancel} the event:

	editor.on( 'fileUploadRequest', function( evt ) {
		// ...

		// Cancel the event so that the file loader will not change its status.
		evt.cancel();
	} );

Starting from CKEditor 4.6, you can also pass additional data to the request using the `requestData` parameter of the CKEDITOR.editor.fileUploadRequest event. The data will be passed to all requests made by the {@link CKEDITOR.fileTools.fileLoader file loader}. If you need to add some data only to requests made by a specific upload widget, you should use CKEDITOR.fileTools.uploadWidgetDefinition.additionalRequestParameters.

To pass some data to the request, listen to the {@link CKEDITOR.editor#fileUploadRequest fileUploadRequest} event and add the data as a property of `evt.requestData`:

	editor.on( 'fileUploadRequest', function( evt ) {
		evt.requestData.foo = 'bar';
	} );

You can also pass additional files to the request, adding to `evt.requestData` an object with 2 keys:

* `name` &ndash; The name of the file.
* `file` &ndash; The file itself (as a `Blob` or `File` instance).

Example:

	editor.on( 'fileUploadRequest', function( evt ) {
		evt.requestData.otherFile = { name: 'file', file: myBlob };
	} );

Note that the default file to be uploaded is also a property of `evt.requestData` named `upload` and it can be overwritten when neccessary.

If the content of an image editor is pasted, it will be received as Base64 data and the file created from this data will need a name. In such cases the name is based on the MIME type. To change this behavior use the CKEDITOR.config.fileTools_defaultFileName option.

#### Response

If you want to handle the response manually, you need to add a listener to the CKEDITOR.editor.fileUploadResponse event and call the CKEDITOR.eventInfo.stop method to prevent the default behavior. The listener should set the URL to the file on the server and the file name; additionally, it can also set the message from the server. If the response is to the error message, and the upload failed, the event should be {@link CKEDITOR.eventInfo#cancel canceled}, so the file loader will change {@link CKEDITOR.fileTools.fileLoader#status its status} to `error`.

For example if the response is `fileUrl|optionalErrorMessage`:

	editor.on( 'fileUploadResponse', function( evt ) {
		// Prevent the default response handler.
		evt.stop();

		// Get XHR and response.
		var data = evt.data,
			xhr = data.fileLoader.xhr,
			response = xhr.responseText.split( '|' );

		if ( response[ 1 ] ) {
			// An error occurred during upload.
			data.message = response[ 1 ];
			evt.cancel();
		} else {
			data.url = response[ 0 ];
		}
	} );

### Integration with CKFinder

CKEditor can be easily integrated with [CKFinder](http://cksource.com/ckfinder), an advanced Ajax file manager. See [CKFinder Integration](#!/guide/dev_file_browse_upload-section-using-ckfinder) for more information.

<p class="requirements">
	Uploading dropped or pasted files will work for CKFinder 2.5+ and CKFinder 3.x.
</p>

#### Example &mdash; Custom uploadUrl for CKFinder

As mentioned above, if CKEDITOR.config.uploadUrl is not set, CKEDITOR.config.filebrowserUploadUrl is used by the [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) plugin. As a result, for CKFinder there is no need to specify CKEDITOR.config.uploadUrl separately.

If for any reason you need to do this, note that the path to the connector must include `responseType=json` in the query string to make CKFinder return a response in the proper JSON format.

	config.extraPlugins = 'uploadimage';
	config.uploadUrl = '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json';

## Dropping and Pasting Upload Demo

See the [working "Uploading Dropped and Pasted Images" sample](https://sdk.ckeditor.com/samples/fileupload.html#uploading-dropped-and-pasted-images) for an example of the Upload Image plugin integration with CKEditor and CKFinder.

## Further Reading

For more information on pasting, dropping and uploading files with CKEditor refer to the following articles:

* [File Manager Integration](#!/guide/dev_file_browse_upload)
* [Advanced File Manager Configuration](#!/guide/dev_file_manager_configuration)
* [CKFinder Integration](#!/guide/dev_ckfinder_integration)
* [File Browser API - Creating a Custom File Manager](#!/guide/dev_file_browser_api)
* [Adding the File Manager to Dialog Windows](#!/guide/dev_dialog_add_file_browser)
* [Dropping and Pasting into Editor Content](#!/guide/dev_drop_paste)
* [Clipboard Integration](#!/guide/dev_clipboard)
