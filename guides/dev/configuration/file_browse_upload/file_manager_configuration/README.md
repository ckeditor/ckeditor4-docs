<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Advanced File Manager Configuration

<p class="requirements">
	CKEditor can be easily integrated with an external file manager (file browser/uploader) thanks to the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin which by default is included in every preset.
</p>

As mentioned in the introductory [File Manager Integration](#!/guide/dev_file_browse_upload) article, CKEditor can not only be integrated with an external application providing file browser and uploader capabilities, but the extent of this integration can be fine-tuned to your needs.

This article describes a few options available to adjust the file manager integration to your usage scenario.

<p class="tip">
	Please note that the names of the file browser and uploader scripts used in this guide are just an example and should be replaced with your custom scripts or the scripts coming from an external tool, like <a href="http://cksource.com/ckfinder">CKFinder</a> or a third-party file manager.
</p>

## Adding File Manager Scripts for Selected Dialog Windows

It is possible to set a separate URL for a selected dialog window (like **Image** or **Link**) by using the dialog window name in the file manager settings:
<code>config.filebrowser<i>[dialogWindowName]</i>BrowseUrl</code> and <code>config.filebrowser<i>[dialogWindowName]</i>UploadUrl</code>.

For example to set special browse and upload URLs for the **Image Properties** dialog window, use the {@link CKEDITOR.config#filebrowserImageBrowseUrl config.filebrowserImageBrowseUrl} and {@link CKEDITOR.config#filebrowserImageUploadUrl config.filebrowserImageUploadUrl} properties, respectively:

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserImageBrowseUrl: '/browser/browse.php?type=Images',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserImageUploadUrl: '/uploader/upload.php?type=Images'
	});

In the example above, the {@link CKEDITOR.config#filebrowserBrowseUrl config.filebrowserBrowseUrl} and {@link CKEDITOR.config#filebrowserUploadUrl config.filebrowserUploadUrl} settings will be used by default. In the **Image Properties** dialog window CKEditor will use the {@link CKEDITOR.config#filebrowserImageBrowseUrl config.filebrowserImageBrowseUrl} and {@link CKEDITOR.config#filebrowserImageUploadUrl config.filebrowserImageUploadUrl} settings instead.

## File Manager Window Size

The default width of the file manager window in CKEditor is set to 80% of the screen width, while the default height is set to 70% of the screen height.

If for any reasons the default values are not suitable for you, you can adjust them by using {@link CKEDITOR.config#filebrowserWindowWidth config.filebrowserWindowWidth} to change the width and {@link CKEDITOR.config#filebrowserWindowHeight config.filebrowserWindowHeight} to change the height of the file manager window.

To specify the size of the file manager window in pixels, set it to a number (e.g. `"800"`). If you prefer to set the height and width of the window as a percentage value of the screen, do not forget to add the percent sign after the number (e.g. `"60%"`).

The sample below shows some basic configuration code that can be used to insert a CKEditor instance with the file manager paths and window size configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php',
		filebrowserWindowWidth: '640',
		filebrowserWindowHeight: '480'
	});

## Further Reading

For more information on integrating CKEditor with a file manager refer to the following articles:

* [File Manager Integration](#!/guide/dev_file_browse_upload)
* [CKFinder Integration](#!/guide/dev_ckfinder_integration)
* [File Browser API - Creating a Custom File Manager](#!/guide/dev_file_browser_api)
* [Adding the File Manager to Dialog Windows](#!/guide/dev_dialog_add_file_browser)
* [Uploading Pasted and Dropped Files](#!/guide/dev_file_upload)
