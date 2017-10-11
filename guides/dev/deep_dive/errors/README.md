<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Error Code Reference

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.5.4</strong>. It is an editor core functionality which is included in all CKEditor packages available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site.
</p>

This article contains the list of CKEditor error codes and their explanation. The error codes are used by the editor to log information about errors and warnings to the JavaScript console.

## autoembed-no-widget-def

* Location: `plugins/autoembed/plugin.js`
* Description: Incorrect {@link CKEDITOR.config#autoEmbed_widget} value. No widget definition found.
* Additional data: None.

## editor-destroy-iframe

* Location: `plugins/wysiwygarea/plugin.js`
* Description: The editor's `<iframe>` could not be destroyed correctly because it had been unloaded before the editor was destroyed. Make sure to destroy the editor before detaching it from the DOM.
* Additional data: None.

## editor-incorrect-destroy

* Location: `core/editor.js`
* Description: The editor is being destroyed before it is fully initialized.
* Additional data: None.

## editor-plugin-required

* Location: `core/editor.js`
* Description: A plugin cannot be removed from the plugins list because it is required by another plugin.
* Additional data:
	* `plugin`: The name of the plugin that cannot be removed.
	* `requiredBy`: The name of the plugin whose requirements block the removal.

## embed-no-provider-url
* Location: `plugins/embed/plugin.js`
* Description: No [embed provider URL](#!/api/CKEDITOR.config-cfg-embed_provider) configured. Since CKEditor 4.7.0 this value is empty by default.
* Additional data: None.

## embedbase-widget-invalid

* Location: `plugins/embedbase/plugin.js`
* Description: A widget no longer belongs to the current editor's widgets list and is no longer valid.
* Additional data: None.

## filetools-response-error

* Location: `plugins/filetools/plugin.js`
* Description: An error occurred when parsing the upload response. Text could not be parsed to JSON.
* Additional data:
	* `responseText`: Upload response text.

## mathjax-no-config

* Location: `plugins/mathjax/plugin.js`
* Description: The CKEDITOR.config#mathJaxLib property is not set. Refer to {@link CKEDITOR.config#mathJaxLib API documentation} for more information.
* Additional data: None.

## range-endcontainer

* Location: `core/dom/range.js`
* Description: End container element is not a descendant of the root element.
* Additional data:
	* `endContainer`
	* `root`

## range-startcontainer

* Location: `core/dom/range.js`
* Description: Start container element is not a descendant of the root element.
* Additional data:
	* `startContainer`
	* `root`

## selection-fake-reset

* Location: `core/selection.js`
* Description: Incorrect selection instance resets the fake selection.
* Additional data: None.

## selection-not-fake

* Location: `core/selection.js`
* Description: The selection is no longer fake.
* Additional data: None.

## uploadimage-config

* Location: `plugins/uploadimage/plugin.js`
* Description: Upload URL for the Upload Image feature was not defined. Refer to the [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) article for more information.
* Additional data: None.

## uploadfile-config

* Location: `plugins/uploadfile/plugin.js`
* Description: Upload URL for the Upload File feature was not defined. Refer to the [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) article for more information.
* Additional data: None.
