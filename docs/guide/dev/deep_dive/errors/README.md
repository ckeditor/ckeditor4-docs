---
category: ckeditor-deep-dive
order: 120
url: guide/dev_errors
menu-title: Error Code Reference
meta-title-short: Error Code Reference
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 Error Code Reference

<info-box info="">
	This feature was introduced in <strong>CKEditor 4.5.4</strong>. It is an editor core functionality which is included in all CKEditor 4 packages available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site.
</info-box>

This article contains the list of CKEditor 4 error codes and their explanations. The error codes are used by the editor to log information about errors and warnings to the JavaScript console.

## autoembed-no-widget-def

* Location: `plugins/autoembed/plugin.js`
* Description: Incorrect {@linkapi CKEDITOR.config#autoEmbed_widget} value. No widget definition found.
* Additional data: None.

## cloudservices-no-token

* Location: `plugins/cloudservices/plugin.js`
* Description: The authentication token for the [CKEditor Cloud Services](https://ckeditor.com/cke4/addon/cloudservices) plugin is empty. The cause of it might be that your {@linkapi CKEDITOR.config.cloudServices_tokenUrl token URL} returned an empty response.
* Additional data: None.

## cloudservices-no-token-url

* Location: `plugins/cloudservices/plugin.js`
* Description: The {@linkapi CKEDITOR.config.cloudServices_tokenUrl} configuration variable for the [CKEditor Cloud Services](https://ckeditor.com/cke4/addon/cloudservices) plugin was not specified.
* Additional data: None.

## cloudservices-no-upload-url

* Location: `plugins/cloudservices/plugin.js`
* Description: The {@linkapi CKEDITOR.config.cloudServices_uploadUrl} configuration variable for the [CKEditor Cloud Services](https://ckeditor.com/cke4/addon/cloudservices) plugin was not specified.
* Additional data: None.

## editor-destroy-iframe

* Location: `plugins/wysiwygarea/plugin.js`
* Description: The editor's `<iframe>` could not be destroyed correctly because it had been unloaded before the editor was destroyed. Make sure to destroy the editor before detaching it from the DOM.
* Additional data: None.

## editor-element-conflict

* Location: `core/editor.js`
* Description: There is already an editor's instance attached to the provided element and attaching another one to it is not allowed.
* Additional data:
	* `editorName`: The name of the already attached editor.

## editor-incorrect-destroy

* Location: `core/editor.js`
* Description: The editor is being destroyed before it is fully initialized.
* Additional data: None.

## editor-incorrect-element

* Location: `core/editor.js`
* Description: The requested element could not be found in the page's DOM. Check if the passed argument points to the correct element.
* Additional data:
	* `element`: The element's `id` attribute.

## editor-plugin-conflict

* Location: `core/editor.js`
* Description: A plugin cannot be initialized because it is in conflict with another plugin.
* Additional data:
	* `plugin`: The name of the plugin that cannot be initialized.
	* `replacedWith`: The name of the plugin which has been initialized instead of the conflicting one.

## editor-plugin-required

* Location: `core/editor.js`
* Description: A plugin cannot be removed from the plugins list because it is required by another plugin.
* Additional data:
	* `plugin`: The name of the plugin that cannot be removed.
	* `requiredBy`: The name of the plugin whose requirements block the removal.

## embed-no-provider-url
* Location: `plugins/embed/plugin.js`
* Description: No {@linkapi CKEDITOR.config#embed_provider embed provider URL} configured. Since CKEditor 4.7.0 this value is empty by default.
* Additional data: None.

## embedbase-widget-invalid

* Location: `plugins/embedbase/plugin.js`
* Description: A widget no longer belongs to the current editor's widgets list and is no longer valid.
* Additional data: None.

## exportpdf-no-token

* Location: `plugins/exportpdf/plugin.js`
* Description: The authentication token for the [CKEditor Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin is empty. The cause of it might be that your {@linkapi CKEDITOR.config.exportPdf_tokenUrl token URL} returned an empty response.
* Additional data: None.

## exportpdf-no-token-url

* Location: `plugins/exportpdf/plugin.js`
* Description: The {@linkapi CKEDITOR.config.exportPdf_tokenUrl} configuration variable for the [CKEditor Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin was not specified.
* Additional data: None.

## exportpdf-stylesheets-incaccessible

* Location: `plugins/exportpdf/plugin.js`
* Description: At least one of the stylesheets attached to the document was not fully loaded when `exportPdf` command was executed.
* Additional data:
	* `error`: Detailed error message (determines if stylesheet is still loading or cannot be accessed).

## filetools-response-error

* Location: `plugins/filetools/plugin.js`
* Description: An error occurred when parsing the upload response. The text could not be parsed to JSON.
* Additional data:
	* `responseText`: Upload response text.

## invalid-license-key

* Location: Various plugins
* Description: The plugin license key passed to the plugin is missing or invalid. Refer to the plugin documentation for more information.
* Additional data:
	* `plugin`: The name of the plugin that threw the error.

## mathjax-no-config

* Location: `plugins/mathjax/plugin.js`
* Description: The {@linkapi CKEDITOR.config#mathJaxLib CKEDITOR.config#mathJaxLib} property is not set. Refer to {@linkapi CKEDITOR.config#mathJaxLib API documentation} for more information.
* Additional data: None.

## no-vendor-lib

* Location: `core/tools.js`
* Description: Unable to find the vendor library. Make sure that the vendor library is available at the given path.
* Additional data:
	* `path`: A path to the vendor library.

## pastetools-failed-image-extraction

* Location: `plugins/pastetools/filter/image.js`
* Description: Images could not be correctly extracted from the RTF content provided by the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) or [Paste from LibreOffice](https://ckeditor.com/cke4/addon/pastefromlibreoffice) plugins.
* Additional data:
	* `rtf`: The number of images extracted from RTF.
	* `html`: The number of images present in HTML.

## pastetools-unsupported-image

* Location: `plugins/pastetools/filter/image.js`
* Description: One of the images extracted from the pasted content provided by the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) or [Paste from LibreOffice](https://ckeditor.com/cke4/addon/pastefromlibreoffice) plugins uses an unsupported format. In the case of Safari browser, the `type` property will always equal to `'blob'`.
* Additional data:
	* `type`: The image's MIME type or `'blob'`.
	* `index`: The index of the image inside the pasted content.

## range-endcontainer

* Location: `core/dom/range.js`
* Description: The end container element is not a descendant of the root element.
* Additional data:
	* `endContainer`
	* `root`

## range-startcontainer

* Location: `core/dom/range.js`
* Description: The start container element is not a descendant of the root element.
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

## uploadfile-config

* Location: `plugins/uploadfile/plugin.js`
* Description: Upload URL for the Upload File feature was not defined. Refer to the {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article for more information.
* Additional data: None.

## uploadimage-config

* Location: `plugins/uploadimage/plugin.js`
* Description: An upload URL for the Upload Image feature was not defined. Refer to the {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article for more information.
* Additional data: None.
