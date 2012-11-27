# Integrate with File Browser

CKEditor can be easily integrated with an external file
browser/uploader.

Once properly set up, all file browser features will automatically
become available. This includes the **Upload** tab^(1) in the **Link**,
**Image**, and **Flash Properties** dialog windows as well as the
**Browse Server** button^(2).

![File browser features available for images in CKEditor](guides/dev_file_browse_upload/image_dialog_browser_upload.png)

## Basic Configuration
-------------------

 * The {@link CKEDITOR.config#filebrowserBrowseUrl filebrowserBrowseUrl} setting contains the location of an external file browser that should be
launched when the **Browse Server** button is pressed.

 * The {@link CKEDITOR.config#filebrowserUploadUrl filebrowserUploadUrl} setting contains the location of a script that handles file uploads. If
set, the **Upload** tab will appear in some dialog windows — the ones
where such functionality is available, i.e. **Link**, **Image** and
**Flash Properties**.

### Example 1

The sample below shows basic configuration code that can be used to
insert a CKEditor instance with the file browser configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php'
	});

### Example 2

It is also possible to set a separate URL for a selected dialog window
by using the dialog window name in file browser settings:
`filebrowserBrowseUrl` and
`filebrowserUploadUrl`.

For example to set a special upload URL for the image dialog window, use
the {@link CKEDITOR.config#filebrowserImageUploadUrl filebrowserImageUploadUrl}
property.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserImageBrowseUrl: '/browser/browse.php?type=Images',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserImageUploadUrl: '/uploader/upload.php?type=Images'
	});

In the example above, the `filebrowserBrowseUrl` and `filebrowserUploadUrl` settings
will be used by default. In the **Image Properties** dialog window CKEditor will
use the `filebrowserImageBrowseUrl` and `filebrowserImageUploadUrl` configuration settings instead.

## File Browser Window Size
--------------------------------------------------------------------------------------------------------

The default width of the file browser window in CKEditor is set to 80%
of the screen width, while the default height is set to 70% of the
screen height.

If for any reasons the default values are not suitable for you, you can
adjust them to your needs by using the {@link CKEDITOR.config#filebrowserWindowWidth filebrowserWindowWidth}
to change the width and {@link CKEDITOR.config#filebrowserWindowHeight filebrowserWindowHeight} to change the height of the window.

To specify the size of the file browser window in pixels, set it to a
number (e.g. `"800"`). If you prefer to set the height and width of the
window as a percentage value of the screen, do not forget to add the
percent sign after the number (e.g. `"60%"`).

### Example 3

The sample below shows basic configuration code that can be used to
insert a CKEditor instance with the file browser paths and window size
configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserWindowWidth: '640',
		filebrowserWindowHeight: '480'
	});

To set the window size of the file browser for a specific dialog window,
use the `filebrowserWindowWidth` and
`filebrowserWindowHeight` settings.

For example, to change the file browser window size only in "Image"
dialog box, change set the `filebrowserImageWindowWidth` and
`filebrowserImageWindowHeight` settings.

### Example 4

The sample below shows basic configuration code that can be used to
insert a CKEditor instance with the file browser paths configured. It
also changes the default dimensions of the file browser window, but only
when opened from the **Image Properties** dialog window.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserImageWindowWidth: '640',
		filebrowserImageWindowHeight: '480'
	});

## Using CKFinder

CKEditor may easily be integrated with [CKFinder](http://ckfinder.com),
an advanced Ajax file browser. For a live demonstration, see
[here](http://ckfinder.com/demo).

The integration may be conducted in two ways: by setting CKEditor
configuration options (example below) or by using the
[CKFinder.SetupCKEditor()]([http://docs.cksource.com/ckfinder_2.x_api/symbols/CKFinder.html#.setupCKEditor)
method available in the [CKFinder API](http://docs.cksource.com/ckfinder_2.x_api/).

### Example 5

The sample below shows the configuration code that can be used to insert
a CKEditor instance with CKFinder integrated. The browse and upload
paths for images and Flash objects are configured separately from
CKFinder default paths.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
		filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?Type=Images',
		filebrowserFlashBrowseUrl: '/ckfinder/ckfinder.html?Type=Flash',
		filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
		filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
		filebrowserFlashUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
	});

The example above is valid for PHP environment. Note that `/ckfinder/`
is a base path to the CKFinder installation directory.

If you are using CKFinder for ASP, ASP.NET, or ColdFusion, remember to
change `php` above to the right extension:

-   asp – [CKFinder for
	ASP](CKFinder/Developers_Guide/ASP/CKEditor_Integration)
-   aspx – [CKFinder for
	ASP.NET](CKFinder/Developers_Guide/ASP.NET/CKEditor_Integration)
-   cfm – [CKFinder for
	ColdFusion](CKFinder/Developers_Guide/ColdFusion/CKEditor_Integration)
-   php – [CKFinder for
	PHP](CKFinder/Developers_Guide/PHP/CKEditor_Integration)

### Example 6

The sample below shows the use of the `CKFinder.SetupCKEditor()` to
insert a CKEditor instance with CKFinder integrated.

	var editor = CKEDITOR.replace( 'editor1' );
	CKFinder.SetupCKEditor( editor, '/ckfinder/' );

The second parameter of the `SetupCKEditor()` method is the path to the
CKFinder installation.

Please check the `_samples/js/ckeditor.html` sample distributed with
CKFinder to see the full working example of this integration method.

![CKFinder integrated with CKEditor](guides/dev_file_browse_upload/ckeditor_with_ckfinder.png "CKFinder integrated with CKEditor")

### PHP API

As of CKFinder 1.4.2 and CKEditor 3.1 it is possible to integrate
CKFinder with CKEditor using the PHP API.

See [CKFinder for PHP](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/PHP/CKEditor_Integration#PHP)
documentation for more details.

## Other Resources

For more advanced information on integrating CKEditor with a file
browser refer to the following articles:

-   [Creating a Custom File Browser](#!/guide/dev_file_browser_api)
-   [Adding the File Browser to Dialog Windows](#!/guide/dev_dialog_add_file_browser)
