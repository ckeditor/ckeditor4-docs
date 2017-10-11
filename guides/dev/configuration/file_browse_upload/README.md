<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Manager Integration

<p class="requirements">
	CKEditor can be easily integrated with an external file manager (file browser/uploader) thanks to the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin which by default is included in every preset.
</p>

Once properly set up, all file manager features will automatically become available. This includes the **Upload** tab `(1)` in the **Link**, **Image**, and **Flash Properties** dialog windows as well as the **Browse Server** button `(2)`.

{@img image_dialog_browser_upload.png File browser features available for images in CKEditor}

**Note:** Starting from CKEditor 4.5 it is also possible to [enable uploading pasted and dropped images](#!/guide/dev_file_upload).

## Basic Configuration

In order to integrate CKEditor with a file manager, you need to set the following configuration options:

 * The {@link CKEDITOR.config#filebrowserBrowseUrl config.filebrowserBrowseUrl} setting contains the location of an external file browser that should be launched when the **Browse Server** button is pressed.

 * The {@link CKEDITOR.config#filebrowserUploadUrl config.filebrowserUploadUrl} setting contains the location of a script that handles file uploads. If set, the **Upload** tab will appear in some dialog windows &mdash; the ones where such functionality is available, i.e. **Link**, **Image** and **Flash Properties**.

The sample below shows basic configuration code that can be used to create a CKEditor instance with the file manager configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php'
	});

<p class="tip">
	Please note that the names of the file browser and uploader scripts used in this guide are just an example and should be replaced with your custom scripts or the scripts coming from an external tool, like <a href="http://cksource.com/ckfinder">CKFinder</a> or a third-party file manager.
</p>

## Advanced Configuration Options

CKEditor integration with a file manager can be customized to your needs. It is possible to only enable the file manager in selected dialog windows (e.g. just for images) or set the file manager window size. Please refer to the [Advanced File Manager Configuration](#!/guide/dev_file_manager_configuration) article for more details.

## Further Reading

For more advanced information on integrating CKEditor with a file manager refer to the following articles:

* [Advanced File Manager Configuration](#!/guide/dev_file_manager_configuration)
* [CKFinder Integration](#!/guide/dev_ckfinder_integration)
* [File Browser API - Creating a Custom File Manager](#!/guide/dev_file_browser_api)
* [Adding the File Manager to Dialog Windows](#!/guide/dev_dialog_add_file_browser)
* [Uploading Pasted and Dropped Files](#!/guide/dev_file_upload)

