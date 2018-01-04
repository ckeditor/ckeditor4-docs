---
category: file-manager
order: 20
url: guide/dev_file_browse_upload
menu-title: File Manager Integration
meta-title-short: File Manager Integration
---
<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# File Manager Integration

<info-box info=""> CKEditor can be easily integrated with an external file manager (file browser/uploader) thanks to the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin which by default is included in every preset.
</info-box>

Once properly set up, all file manager features will automatically become available. This includes the **Upload** tab `(1)` in the **Link**, **Image**, and **Flash Properties** dialog windows as well as the **Browse Server** button `(2)`.

{@img assets/img/image_dialog_browser_upload.png File browser features available for images in CKEditor}

**Note:** Starting from CKEditor 4.5 it is also possible to {@link guide/dev/configuration/file_browse_upload/file_upload/README enable uploading pasted and dropped images}.

## Basic Configuration

In order to integrate CKEditor with a file manager, you need to set the following configuration options:

 * The {@linkapi CKEDITOR.config#filebrowserBrowseUrl config.filebrowserBrowseUrl} setting contains the location of an external file browser that should be launched when the **Browse Server** button is pressed.

 * The {@linkapi CKEDITOR.config#filebrowserUploadUrl config.filebrowserUploadUrl} setting contains the location of a script that handles file uploads. If set, the **Upload** tab will appear in some dialog windows &mdash; the ones where such functionality is available, i.e. **Link**, **Image** and **Flash Properties**.

The sample below shows basic configuration code that can be used to create a CKEditor instance with the file manager configured.

	CKEDITOR.replace( 'editor1', {
		filebrowserBrowseUrl: '/browser/browse.php',
		filebrowserUploadUrl: '/uploader/upload.php'
	});

<info-box hint=""> Please note that the names of the file browser and uploader scripts used in this guide are just an example and should be replaced with your custom scripts or the scripts coming from an external tool, like <a href="http://cksource.com/ckfinder">CKFinder</a> or a third-party file manager.
</info-box>

## Advanced Configuration Options

CKEditor integration with a file manager can be customized to your needs. It is possible to only enable the file manager in selected dialog windows (e.g. just for images) or set the file manager window size. Please refer to the {@link guide/dev/configuration/file_browse_upload/file_manager_configuration/README Advanced File Manager Configuration} article for more details.

## Further Reading

For more advanced information on integrating CKEditor with a file manager refer to the following articles:

* {@link guide/dev/configuration/file_browse_upload/file_manager_configuration/README Advanced File Manager Configuration}
* {@link guide/dev/configuration/file_browse_upload/ckfinder_integration/README CKFinder Integration}
* {@link guide/dev/configuration/file_browse_upload/file_browser_api/README File Browser API - Creating a Custom File Manager}
* {@link guide/dev/configuration/file_browse_upload/dialog_add_file_browser/README Adding the File Manager to Dialog Windows}
* {@link guide/dev/configuration/file_browse_upload/file_upload/README Uploading Pasted and Dropped Files}

