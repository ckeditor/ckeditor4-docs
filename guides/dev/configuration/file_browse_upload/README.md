<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Browser Integration

CKEditor can be easily integrated with an external file browser/uploader thanks to the [File Browser](http://ckeditor.com/addon/filebrowser) plugin which is included in every preset by default.

Once properly set up, all file browser features will automatically
become available. This includes the **Upload** tab `(1)` in the **Link**,
**Image**, and **Flash Properties** dialog windows as well as the
**Browse Server** button `(2)`.

{@img image_dialog_browser_upload.png File browser features available for images in CKEditor}

**Note:** Starting from CKEditor 4.5 it is also possible to [enable uploading pasted and dropped images](#!/guide/dev_upload_widget).

## Basic Configuration

 * The {@link CKEDITOR.config#filebrowserBrowseUrl filebrowserBrowseUrl} setting contains the location of an external file browser that should be launched when the **Browse Server** button is pressed.

 * The {@link CKEDITOR.config#filebrowserUploadUrl filebrowserUploadUrl} setting contains the location of a script that handles file uploads. If set, the **Upload** tab will appear in some dialog windows &mdash; the ones where such functionality is available, i.e. **Link**, **Image** and **Flash Properties**.

### Example 1 &mdash; Adding File Browser Scripts

The sample below shows basic configuration code that can be used to
insert a CKEditor instance with the file browser configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php'
	});


<p class="tip">
	Please note that the names of the file browser and uploader scripts used in this guide are just an example and should be replaced with your custom scripts or the scripts coming from an external tool, like <a href="http://cksource.com/ckfinder">CKFinder</a> or a third-party file manager.
</p>

### Example 2 &mdash; Adding File Browser Scripts for Selected Dialog Windows

It is also possible to set a separate URL for a selected dialog window (like **Image** or **Link**) by using the dialog window name in file browser settings:
<code>filebrowser<i>[dialogWindowName]</i>BrowseUrl</code> and <code>filebrowser<i>[dialogWindowName]</i>UploadUrl</code>.

For example to set a special upload URL for the **Image Properties** dialog window, use
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

### Example 3 &mdash; Customizing File Browser Window Size

The sample below shows basic configuration code that can be used to
insert a CKEditor instance with the file browser paths and window size
configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserWindowWidth: '640',
		filebrowserWindowHeight: '480'
	});

To set the window size of the file browser for a specific dialog window (like **Image** or **Link**),
use the <code>filebrowser<i>[dialogWindowName]</i>WindowWidth</code> and <code>filebrowser<i>[dialogWindowName]</i>WindowHeight</code> settings.

For example, to change the file browser window size only in the **Image Properties** dialog window, configure the `filebrowserImageWindowWidth` and `filebrowserImageWindowHeight` settings.

### Example 4 &mdash; Customizing File Browser Window Size for a Selected Dialog Window

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

CKEditor may easily be integrated with [CKFinder](http://cksource.com/ckfinder),
an advanced Ajax file manager. For a live demonstration, see 
[the demo](http://cksource.com/ckfinder/demo#ckeditor).

The integration may be conducted in two ways: by setting CKEditor
configuration options (example below) or by using the
[CKFinder.setupCKEditor()](http://docs.cksource.com/ckfinder_2.x_api/symbols/CKFinder.html#.setupCKEditor)
method available in the [CKFinder API](http://docs.cksource.com/ckfinder_2.x_api/).

### Example 5 &mdash; CKFinder Integration

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

The example above is valid for the PHP environment. Note that `/ckfinder/`
is a base path to the CKFinder installation directory.

If you are using CKFinder for ASP, ASP.NET, or ColdFusion, remember to
change `php` above to the right extension:

- `asp` &ndash; [CKFinder for ASP](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/ASP/CKEditor_Integration)
- `aspx` &ndash; [CKFinder for ASP.NET](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/ASP.NET/CKEditor_Integration)
- `cfm` &ndash; [CKFinder for ColdFusion](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/ColdFusion/CKEditor_Integration)
- `php` &ndash; [CKFinder for PHP](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/PHP/CKEditor_Integration)
- `java` &ndash; [CKFinder for Java](http://docs.cksource.com/CKFinder_2.x/Developers_Guide/Java/CKEditor_Integration)

### Example 6 &mdash; CKFinder Integration using CKFinder.setupCKEditor()

The sample below shows the use of the [CKFinder.setupCKEditor()](http://docs.cksource.com/ckfinder_2.x_api/symbols/CKFinder.html#.setupCKEditor) method to
insert a CKEditor instance with CKFinder integrated.

	var editor = CKEDITOR.replace( 'editor1' );
	CKFinder.setupCKEditor( editor, '/ckfinder/' );

The second parameter of the `setupCKEditor()` method is the path to the
CKFinder installation.

Please check the `_samples/ckeditor.html` sample distributed with
CKFinder to see the full working example of this integration method.

{@img ckeditor_with_ckfinder.png CKFinder integrated with CKEditor}

## Further Reading

For more advanced information on integrating CKEditor with a file
browser refer to the following articles:

- [Creating a Custom File Browser](#!/guide/dev_file_browser_api)
- [Adding the File Browser to Dialog Windows](#!/guide/dev_dialog_add_file_browser)
- [Uploading Pasted and Dropped Images](#!/guide/upload_widget)