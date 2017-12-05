<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Upgrading CKEditor

This article describes the steps you need to take when you want to upgrade your CKEditor 4.x installation to the latest version.

<p class="tip">
	<strong>The latest CKEditor is always the greatest CKEditor.</strong> New releases add cool new features, support for the latest browser versions, and bug fixes. The changelog is published <a href="https://ckeditor.com/cke4/release-notes">here</a> and you can also learn about new releases by following our <a href="https://ckeditor.com/blog/">blog</a>, <a href="http://www.facebook.com/ckeditor">Facebook</a>, <a href="https://plus.google.com/+ckeditor/posts">Google+</a>, or <a href="http://twitter.com/ckeditor">Twitter</a> pages.
</p>

To upgrade CKEditor, proceed as follows:

1. **Rename** your existing editor folder to a backup folder, for example `ckeditor_old`.
2. **Download** the latest version from the official [CKEditor Download](https://ckeditor.com/ckeditor-4/download/) site.
	* If you are using one of the pre-defined presets like Standard or Full, download the same one.
	* If you created a custom CKEditor build, you have a few options, as described in your backed-up `build-config.js` file.
		* You can use the unique link to download the updated version of your custom build using the latest editor release.
		* You can use the unique link to CKBuilder pre-loaded with your custom build configuration and using the latest editor release.
		* You can go to the [CKBuilder site](https://ckeditor.com/cke4/builder) and click the **Upload build-config.js** button. Select your backed-up custom build configuration file and download the updated build containing the latest versions of all selected plugins.
3. **Extract** (decompress) the downloaded archive to the original editor directory, for example `ckeditor`.
4. **Copy** all configuration files that you have changed from the backup directory to their corresponding positions in the new directory. These could include (but are not limited to) the following files:
	* `config.js`
	* `contents.css`
	* `styles.js`
	* custom template files

## Further Reading

The following resources discuss related issues:

* The [Upgrading from CKEditor 3](#!/guide/dev_upgrade_ckeditor_3) article shows how to upgrade from CKEditor 3 to CKEditor 4.
* The [Upgrading from FCKeditor](#!/guide/dev_upgrade_fckeditor_2) article shows how to upgrade from FCKeditor to CKEditor 4.
* The [API Changes in CKEditor 4](#!/guide/dev_api_changes) article describes some API changes between CKEditor 3 and CKEditor 4.
* The [Patching Old Versions of CKEditor](#!/guide/dev_patching) article explains how to apply a selected patch on your CKEditor installation (warning: unrecommended method, for advanced users only).
