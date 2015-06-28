<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Uploading Dropped or Pasted Files

<p class="requirements">
	Uploading pasted and dragged images was introduced in <strong>CKEditor 4.5</strong>. It is provided through an optional
	<a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugin that is not included in the CKEditor presets available from
	the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a>
	with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

Starting from CKEditor 4.5 it is possible to enable uploading pasted and dropped images. This section is about editor-server configuration for pasted and dropped files since it use different API than the [File Browser](#!/guide/dev_file_browse_api) plugin. To get an overview about this feature see [Dropping and pasting](#!/guide/dev_drop_paste) section. To have a deeper understanding how files are handled see [files deep-dive](#!/guide/dev_files).

## Basic Configuration

The {@link CKEDITOR.config#uploadUrl uploadUrl} setting contains the location of a script that handles file uploads of pasted and dragged images.

**Example** &mdash; Setting Upload URL for Uploading Pasted and Dragged Content

The sample below shows basic configuration code that can be used to configure pasting and dragging images into CKEditor. Note that you also need to load specific plugin to handle dropped files.

	config.extraPlugins = 'uploadimage';
	config.uploadUrl = '/uploader/upload.php';

<p class="tip">As a fallback solution if <code>uploadUrl</code> is not set and <code>filebrowserUploadUrl</code> is provided for the <strong>File Browser</strong> plugin,
then the Upload Image plugin will try to use <code>filebrowserUploadUrl</code> instead and send there dragged and pasted images.</p>

It is also possible to set the specific URL for the specific plugin. For example if you want to use [Upload Image](http://ckeditor.com/addon/uploadimage) you can set `config.uploadImagedUrl` which will be used instead of {@link CKEDITOR.config#uploadUrl uploadUrl}.

**Example** &mdash; Setting Up Image upload plugin

	config.extraPlugins = 'uploadimage';
	config.imageUploadUrl = '/uploader/upload.php?type=Images';

To learn more about upload URL see {@link CKEDITOR.fileTools#getUploadUrl getUploadUrl}.

## Communication

To make uploading on drop or paste work you need also a server side application witch will receive uploaded file. This application is not a part of the CKEditor. You need to make sure that both editor and server use the same API so they can communicate with each other. You can create server site API to fit to editor, change the way how editor create request and handle response so they will fit existing server API or you can use the dedicated solution which will work out of the box. All three possibilities are describe below.

### Server Side Configuration

The [Upload Image](http://ckeditor.com/addon/uploadimage) plugin is using different API than the [File Browser](#!/guide/dev_file_browse_api) plugin and expects JSON responses.

#### Request

The default request for file uploads is a file as a form data with the 'upload' field.

#### Response: File Uploaded Successfully

When file is uploaded successfully then JSON response with the following entries is expected:

 * `uploaded` &ndash; Set to `1`.
 * `fileName` &ndash; Name of uploaded file.
 * `url` &ndash; URL to a uploaded file (URL-encoded).

**Example**

	{
		"uploaded": 1,
		"fileName": "foo.jpg",
		"url": "/files/foo.jpg"
	}

It is also possible to set the error message to indicate that the file upload was completed but some non-standard situation occurred.

**Example**

	{
		"uploaded": 1,
		"fileName": "foo(2).jpg",
		"url": "/files/foo(2).jpg",
		"error": {
			"message": "A file with the same name is already available. The uploaded file was renamed to \"foo(2).jpg\"."
		}
	}

#### Response: File could not be uploaded

When file could not be uploaded then JSON response with the following entries is expected:

 * `uploaded` &ndash; Set to `0`.
 * `error.message` &ndash; The error message to display to the user.

```
{
	"uploaded": 0,
	"error": {
		"message": "File is too big."
	}
}
```

### Editor Side Configuration

Alternatively to changing server API you can change the editors API, so overwrite the way editor build requests and handle responses. You can do it using {@link CKEDITOR.editor#fileUploadRequest} and {@link CKEDITOR.editor#fileUploadResponse} events.

#### Request

Using {@link CKEDITOR.editor#fileUploadRequest} event you can change how editor request works.  If the event is not {@link CKEDITOR.eventInfo#stop stopped} or {@link CKEDITOR.eventInfo#cancel canceled}, the default request will be sent.

If you want to change this behavior you can add a custom listener with the default priority and {@link CKEDITOR.eventInfo#stop stop} the event which will prevent the default behavior. For example to send the data directly (without a form):

	editor.on( 'fileUploadRequest', function( evt ) {
		var xhr = evt.data.fileLoader.xhr;

		xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
		xhr.setRequestHeader( 'X-File-Name', this.fileName );
		xhr.setRequestHeader( 'X-File-Size', this.total );
		xhr.send( this.file );

		// Prevented default behavior.
		evt.stop();
	} );

You can also add custom request headers or set flags for the default request. This is especially useful for enabling Cross-Origin requests. For more information about Cross-Origin Resource Sharing see [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS):

	editor.on( 'fileUploadRequest', function( evt ) {
		var xhr = evt.data.fileLoader.xhr;

		xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
		xhr.setRequestHeader( 'X-CUSTOM', 'HEADER' );
		xhr.withCredentials = true;
	} );

When you listen to the {@link CKEDITOR.editor#fileUploadRequest} event with the default priority you will get an `XHR` object which is opened as a `POST` asynchronous request. This happens in a listener with the priority of `5`, so if you want to also overwrite the open method in a request, you need to listen with a lower priority. For example to send a `PUT` request:

	editor.on( 'fileUploadRequest', function( evt ) {
		var fileLoader = evt.data.fileLoader,
			formData = new FormData(),
			xhr = fileLoader.xhr;

		xhr.open( 'PUT', fileLoader.uploadUrl, true );
		formData.append( 'upload', fileLoader.file, fileLoader.fileName );
		fileLoader.xhr.send( formData );

		// Prevented default behavior.
		evt.stop();
	}, null, null, 4 ); // Listener with priority 4 will be executed before priority 5.

Finally, you can also tell the {@link CKEDITOR.fileTools.fileLoader file loader} that the request was not sent so it will not change its {@link CKEDITOR.fileTools.fileLoader#status status}. To do this, you need to {@link CKEDITOR.eventInfo#cancel cancel} the event:

	editor.on( 'fileUploadRequest', function( evt ) {
		// ...

		// Cancel the event so that the file loader will not change its status.
		evt.cancel();
	} );

#### Response

If you want to handle the response manually, you need to add a listener to {@link CKEDITOR.editor#fileUploadResponse} event and call {@link CKEDITOR.eventInfo#stop} to prevent the default behavior. The listener should set the URL to the file on the server and the file name; additionally, it can also set the message from the server. If the response is to the error message, and the upload failed, then the event should be {@link CKEDITOR.eventInfo#cancel canceled}, so the file loader will change {@link CKEDITOR.fileTools.fileLoader#status its status} to `error`.

For example if the response is `fileUrl|optionalErrorMessage`:

	editor.on( 'fileUploadResponse', function( evt ) {
		// Prevent the default response handler.
		evt.stop();

		// Ger XHR and response.
		var data = evt.data,
			xhr = data.fileLoader.xhr,
			response = xhr.responseText.split( '|' );

		if ( response[ 1 ] ) {
			// Error occurred during upload.
			data.message = response[ 1 ];
			evt.cancel();
		} else {
			data.url = response[ 0 ];
		}
	} );

### Using with CKFinder

CKEditor may easily be integrated with [CKFinder](http://cksource.com/ckfinder), an advanced Ajax file manager.
See [CKFinder Integration](#!/guide/dev_file_browse_upload-section-using-ckfinder) for more information.

**Example** &mdash; Custom <code>uploadUrl</code> for CKFinder

As mentioned in *Basic Configuration* if {@link CKEDITOR.config#uploadUrl uploadUrl} is not set then `filebrowserUploadUrl` is used by the <a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugin.
Thus for CKFinder there is no need to specify {@link CKEDITOR.config#uploadUrl uploadUrl} separately.

If for any reason you have to do this, then please note that the path to the connector must include `responseType=json` in the query string
 so that CKFinder returned the proper response.

	config.extraPlugins = 'uploadimage';
	config.uploadUrl = '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json';
