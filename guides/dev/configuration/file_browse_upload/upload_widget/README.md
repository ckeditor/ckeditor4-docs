<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Uploading Pasted and Dropped Images

Starting from CKEditor 4.5 it is possible to enable uploading pasted and dropped images.

<p class="requirements">
	Uploading pasted and dragged images was introduced in <strong>CKEditor 4.5</strong>. It is provided through an optional 
	<a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugin that is not included in the CKEditor presets available from 
	the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> 
	with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

## Basic Configuration

The {@link CKEDITOR.config#uploadUrl uploadUrl} setting contains the location of a script that handles file uploads of pasted and dragged images. 

### Example 1 &mdash; Setting Upload URL for Uploading Pasted and Dragged Images

The sample below shows basic configuration code that can be used to configure pasting and dragging images into CKEditor. 

	CKEDITOR.replace( 'editor1', {
		uploadUrl: '/uploader/upload.php'
	} );

<p class="tip">As a fallback solution if <code>uploadUrl</code> is not set and <code>filebrowserUploadUrl</code> is provided for the <strong>File Browser</strong> plugin, 
then the Upload Image plugin will try to use <code>filebrowserUploadUrl</code> instead and send there dragged and pasted images.</p>

## Server Communication

The <a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugin is using different API than the [File Browser](#!/guide/dev_file_browse_api) plugin
and expects JSON responses.

### File uploaded successfully

When file is uploaded successfully then JSON response with the following entries is expected:

 * `uploaded` &ndash; Set to `1`.
 * `fileName` &ndash; Name of uploaded file.
 * `url` &ndash; URL to a uploaded file (URL-encoded).

**Example 1**

	{
		"uploaded": 1,
		"fileName": "foo.jpg",
		"url": "/files/foo.jpg"
	}

It is also possible to set the error message to indicate that the file upload was completed but some non-standard situation occurred. 

**Example 2**

	{
		"uploaded": 1,
		"fileName": "foo(2).jpg",
		"url": "/files/foo(2).jpg",
		"error": {
			"message": "A file with the same name is already available. The uploaded file was renamed to \"foo(2).jpg\"."
		}
	}

### File could not be uploaded 

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

## Using with CKFinder

CKEditor may easily be integrated with [CKFinder](http://cksource.com/ckfinder), an advanced Ajax file manager.
See [CKFinder Integration](#!/guide/dev_file_browse_upload-section-using-ckfinder) for more information.

### Example 2 &mdash; Custom <code>uploadUrl</code> for CKFinder

As mentioned in *Basic Configuration* if `uploadUrl` is not set then `filebrowserUploadUrl` is used by the <a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugin. 
Thus for CKFinder there is no need to specify `uploadUrl` separately. 

If for any reason you have to do this, then please note that the path to the connector must include `responseType=json` in the query string
 so that CKFinder returned the proper response.

	CKEDITOR.replace( 'editor1', {
		uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
	} );
