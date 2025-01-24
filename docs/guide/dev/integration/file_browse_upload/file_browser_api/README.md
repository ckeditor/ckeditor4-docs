---
category: file-manager
order: 80
url: guide/dev_file_browser_api
menu-title: File Browser API
meta-title-short: File Browser API
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Browser API - Creating a Custom File Manager

<info-box info="">
	CKEditor 4 can be easily integrated with an external file manager (file browser/uploader) thanks to the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin which by default is included in the {@linkexample standardpreset Standard} and {@linkexample fullpreset Full} presets.
</info-box>

<info-box info="">
	Since <strong>CKEditor 4.9</strong> all file uploads, including those initiated by the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin, expect a JSON response (like <a href="https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_upload.html#response-file-uploaded-successfully">this one</a>). If you do not intend to provide one, you should use an appropriate configuration option:

        config.filebrowserUploadMethod = 'form';
</info-box>

To connect a file browser/uploader that is already compatible with CKEditor 4, refer to the {@link guide/dev/integration/file_browse_upload/README File Manager Integration} article. If you want to integrate with [CKFinder](https://ckeditor.com/ckfinder/), check the {@link guide/dev/integration/file_browse_upload/ckfinder_integration/README CKFinder Integration} article.

## Interaction between CKEditor 4 and File Manager

CKEditor 4 automatically sends some additional arguments to the file manager:

* {@linkapi CKEDITOR.editor#name `CKEditor`} &ndash; The name of the CKEditor instance.
* {@linkapi CKEDITOR.editor#langCode `langCode`} &ndash; CKEditor language (`en` for English).
* `CKEditorFuncNum` &ndash; Anonymous function reference number used to pass the URL of a file to CKEditor (a random number).

For example:

```
CKEditor=editor1&CKEditorFuncNum=1&langCode=en
```

### Example 1

Suppose that CKEditor 4 was created using the following JavaScript call:

```js
CKEDITOR.replace( 'editor2', {
	filebrowserBrowseUrl: '/browser/browse.php?type=Files',
	filebrowserUploadUrl: '/uploader/upload.php?type=Files'
});
```

**Note:** As mentioned before, since **CKEditor 4.9.0** you may also need to add the {@linkapi CKEDITOR.config#filebrowserUploadMethod `filebrowserUploadMethod: 'form'`} configuration option.

In order to browse files, CKEditor 4 will call:

```
/browser/browse.php?type=Files&CKEditor=editor2&CKEditorFuncNum=2&langCode=de
```

The call includes the following elements:

* `/browser/browse.php?type=Files` &ndash; The value of the `filebrowserBrowseUrl` parameter.
* `&CKEditor=editor2&CKEditorFuncNum=2&langCode=de` &ndash; The information added by CKEditor:
	* `CKEditor=editor2` &ndash; The name of the CKEditor instance (`editor2`).
	* `CKEditorFuncNum=2` &ndash; The reference number of an anonymous
		function that should be used in the {@linkapi CKEDITOR.tools#callFunction `callFunction()`} method.
	* `langCode=de` &ndash; The language code (in this case: `de` for German). This
		parameter can be used to send localized error messages.

## Passing the URL of the Selected File

To send back the file URL from an external file manager, call {@linkapi CKEDITOR.tools#callFunction `callFunction()`} and pass `CKEditorFuncNum` as the first argument:

```js
window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl [, data] );
```

If `data` (the third argument) is a string, it will be displayed by CKEditor 4. This parameter is usually used to display an error message if a problem occurs during the file upload.

### Example 2

The following example shows how to send the URL from a file manager using JavaScript code (save it as `browse.php`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example: Browsing Files</title>
    <script>
        // Helper function to get parameters from the query string.
        function getUrlParam( paramName ) {
            var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
            var match = window.location.search.match( reParam );

            return ( match && match.length > 1 ) ? match[1] : null;
        }
        // Simulate user action of selecting a file to be returned to CKEditor.
        function returnFileUrl() {

            var funcNum = getUrlParam( 'CKEditorFuncNum' );
            var fileUrl = '/path/to/file.txt';
            window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );
            window.close();
        }
    </script>
</head>
<body>
    <button onclick="returnFileUrl()">Select File</button>
</body>
</html>
```

### Example 3

If `data` is a function, it will be executed in the scope of the button that called the file manager. It means that the server connector can have direct access to CKEditor 4 and the dialog window to which the button belongs.

Suppose that apart from passing the `fileUrl` value that is assigned to an appropriate field automatically based on the dialog window definition you also want to set the `alt` attribute, if the file manager was opened in the **Image Properties** dialog window. In order to do this, pass an anonymous function as a third argument:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example: Browsing Files</title>
    <script>
        // Helper function to get parameters from the query string.
        function getUrlParam( paramName ) {
            var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
            var match = window.location.search.match( reParam );

            return ( match && match.length > 1 ) ? match[1] : null;
        }
        // Simulate user action of selecting a file to be returned to CKEditor.
        function returnFileUrl() {

            var funcNum = getUrlParam( 'CKEditorFuncNum' );
            var fileUrl = 'http://c.cksource.com/a/1/img/sample.jpg';
            window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl, function() {
                // Get the reference to a dialog window.
                var dialog = this.getDialog();
                // Check if this is the Image Properties dialog window.
                if ( dialog.getName() == 'image' ) {
                    // Get the reference to a text field that stores the "alt" attribute.
                    var element = dialog.getContentElement( 'info', 'txtAlt' );
                    // Assign the new value.
                    if ( element )
                        element.setValue( 'alt text' );
                }
                // Return "false" to stop further execution. In such case CKEditor will ignore the second argument ("fileUrl")
                // and the "onSelect" function assigned to the button that called the file manager (if defined).
                // return false;
            } );
            window.close();
        }
    </script>
</head>
<body>
    <button onclick="returnFileUrl()">Select File</button>
</body>
</html>
```

### Example 4

The following code shows how to send back the URL of an uploaded file from the PHP connector (save it as `upload.php`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example: File Upload</title>
</head>
<body>
<?php
// Required: anonymous function reference number as explained above.
$funcNum = $_GET['CKEditorFuncNum'] ;
// Optional: instance name (might be used to load a specific configuration file or anything else).
$CKEditor = $_GET['CKEditor'] ;
// Optional: might be used to provide localized messages.
$langCode = $_GET['langCode'] ;
// Optional: compare it with the value of `ckCsrfToken` sent in a cookie to protect your server-side uploader against CSRF.
// Available since CKEditor 4.5.6.
$token = $_POST['ckCsrfToken'] ;

// Check the $_FILES array and save the file. Assign the correct path to a variable ($url).
$url = '/path/to/uploaded/file.ext';
// Usually you will only assign something here if the file could not be uploaded.
$message = 'The uploaded file has been renamed';

echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
?>
</body>
</html>
```

## Further Reading

For more information on integrating CKEditor 4 with a file manager refer to the following articles:

* {@link guide/dev/integration/file_browse_upload/README File Manager Integration}
* {@link guide/dev/integration/file_browse_upload/file_manager_configuration/README Advanced File Manager Configuration}
* {@link guide/dev/integration/file_browse_upload/ckfinder_integration/README CKFinder Integration}
* {@link guide/dev/integration/file_browse_upload/dialog_add_file_browser/README Adding the File Manager to Dialog Windows}
* {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Pasted and Dropped Images}
