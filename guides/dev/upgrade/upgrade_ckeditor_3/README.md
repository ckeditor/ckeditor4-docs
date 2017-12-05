<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Upgrading from CKEditor 3

CKEditor 3 and 4 are mostly compatible, so an upgrade to the latest CKEditor 4 line is mostly hassle-free.

<p class="tip">
	Please note that the CKEditor 3 line is no longer updated. New features, bug fixes, and support for latest browser versions are not backported from CKEditor 4 and are only available by upgrading to the current editor version.
</p>

## Changes Between CKEditor 3 and 4

Here is a list of the most notable changes between CKEditor 3 and 4.

1. The new default [Moono skin](https://ckeditor.com/cke4/addon/moono) was introduced.
2. The installation package no longer includes all possible CKEditor plugins. You can now either choose one of the pre-defined packages (Basic, Standard, Full) or create a custom build by using the [CKBuilder](https://ckeditor.com/cke4/builder) service.
3. All CKEditor plugins, both created by the CKEditor team and by the community, are available in the new [Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all), where you can browse them and easily add to your custom build.
4. The new [Advanced Content Filter](#!/guide/dev_advanced_content_filter) adjusts your content to your editor configuration and strips disallowed content.
5. Some changes in the CKEditor 4 JavaScript API break backward compatibility. See the list of changes between CKEditor 3.x and CKEditor 4.0 [here](#!/guide/dev_api_changes). Please note that with time the number of differences may grow as CKEditor 4 is in active development, so it is recommended to test whether your custom plugins work as expected after the upgrade.
6. The server-side integrations (ASP, PHP) were removed. Use the JavaScript integration method instead.
7. The location of some of the configuration files has changed. For example `ckeditor/plugins/styles/styles/default.js` is now just `ckeditor/styles.js`.

## Upgrade Procedure

If you were using CKEditor 3 in the past, you can either try to create a CKEditor 4 build that mimics the functionality used before or start anew, choose the desired CKEditor 4 installation package, and then just adjust your configuration. See the [Compare Packages](https://ckeditor.com/cke4/presets) link to examine the differences between them.

To upgrade CKEditor 3 to CKEditor 4, proceed as follows:

1. **Rename** your existing editor folder to a backup folder, for example `ckeditor_old`.
2. **Download** the latest version from the official [CKEditor Download](https://ckeditor.com/ckeditor-4/download/) site.
	* The easiest way is to choose one of the pre-defined presets like Standard or Full.
	* If you want to include any additional plugins, use the [CKBuilder](https://ckeditor.com/cke4/builder) service to create a custom build.
3. **Extract** (decompress) the downloaded archive to the original editor directory, for example `ckeditor`.
4. **Review** all configuration files that you have changed in CKEditor 3 (see the backup folder) and **apply** your changes to new CKEditor 4 files. These could include (but are not limited to) the following files:
	* `config.js`
	* `contents.css`
	* `plugins/styles/styles/default.js`
	* custom template files
