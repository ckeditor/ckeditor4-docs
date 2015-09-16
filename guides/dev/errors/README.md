<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor error reference

List of CKEditor error codes and their explanation.

## autoembed-no-widget-def

* Location: `plugins/autoembed/plugin.js`
* Description: Incorrect config.autoEmbed_widget value. No widget definition found.
* Additional data: none

## editor-plugin-required
* Location: `core/editor.js`
* Description: Plugin cannot be removed from the plugins list, because it's required by other plugin.
* Additional data:
	* plugin: Name of the plugin that cannot be removed.
	* requiredBy: Name of the plugin which requirements blocks the removal.

## embedbase-widget-invalid

* Location: `plugins/embedbase/plugin.js`
* Description: Widget no longer belongs to current editor's widgets list and is no longer valid.
* Additional data: none

## filetools-response-error

* Location: `plugins/filetools/plugin.js`
* Description: Error occurred during parsing the upload response. Text could not be parsed to JSON.
* Additional data:
	* responseText - upload response text

## mathjax-config

* Location: `plugins/mathjax/plugin.js`
* Description: Config.mathJaxLib property is not set. For more information check [config.mathJaxLib documentation](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-mathJaxLib).
* Additional data: none

## uploadimage-config

* Location: `plugins/uploadimage/plugin.js`
* Description: Upload URL for the Upload Image feature was not defined. For more information check [file upload guide](http://docs.ckeditor.com/#!/guide/dev_file_upload).
* Additional data: none

## selection-fake-reset

* Location: `core/selection.js`
* Description: Wrong selection instance resets fake selection.
* Additional data: none

## selection-not-fake

* Location: `core/selection.js`
* Description: Selection is no longer fake.
* Additional data: none

## range-startcontainer

* Location: `core/dom/range.js`
* Description: Start container element is not a descendant of root element.
* Additional data:
	* `startContainer`
	* `root`

## range-endcontainer

* Location: `core/dom/range.js`
* Description: End container element is not a descendant of root element.
* Additional data:
	* `endContainer`
	* `root`

## resourcemanager-not-found

* Location: `core/dom/range.js`
* Description: Resource could not be loaded.
* Additional data:
	* `resources`: Names of the resources that could not be loaded.
	* `location`: Location that was used to find resources.