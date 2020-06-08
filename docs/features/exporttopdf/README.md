---
category: working-with-document
order: 25
url: features/exporttopdf
menu-title: Export to PDF
meta-title-short: Export to PDF
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Exporting editor content to PDF

<info-box info="">
	This feature is provided through the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin that is not included in any official CKEditor 4 preset. You can {@link guide/dev/plugins/README add it to your custom build} with [online builder](https://ckeditor.com/cke4/builder) or download as an [npm package](https://www.npmjs.com/package/ckeditor4-plugin-exportpdf).

	**This feature is in beta version. It is free to use while in the beta phase.**

	This is a premium feature. Please [contact us](https://ckeditor.com/contact/) if you would like to purchase a license. Let us know if you have any feedback or questions!
</info-box>

The optional [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin allows you to easily print the WYSIWYG editor content to a PDF file.

When enabled, the plugin adds the <img class="inline" src="%BASE_PATH%/assets/img/exportpdf-button.png" alt="Export to PDF toolbar button"> (**Export to PDF**) toolbar button. When the button is clicked, the plugin sends the content of your editor together with the styles that are used to display it to the [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) HTML to PDF converter service. The service then generates a PDF document that can be downloaded by the user.

{@img assets/img/exportpdf_01.png CKEditor 4 WYSIWYG editor with the Export to PDF feature enabled.}

## Feature Overview

CKEditor 4 is a feature-rich WYSIWYG editor where you operate on HTML markup that contains rich text &mdash; styled content with elements such as tables, images, lists etc. While HTML output is perfect for Web environment and applications working in a browser, sometimes you may also need to save the document in other formats that can be easily shared and presented in different environments.

Thanks to the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin, you can save the document you created in CKEditor 4 to a downloadable PDF file, preserving all the styles and structure in a nearly 1:1 projection.

## Installation

Depending on your preferences and editor setup, you can use a few different methods to install the plugin.

### Using npm

The Export to PDF plugin for CKEditor 4 is available through [npm](https://www.npmjs.com/package/ckeditor4-plugin-exportpdf). To use it, install the `ckeditor4-plugin-exportpdf` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-plugin-exportpdf
```

After installing the package, copy or link the `exportpdf` folder from the `ckeditor4-plugin-exportpdf` package to the CKEditor 4 `plugins/` directory.

If you prefer not to touch any files, you may use the [`CKEDITOR.plugins.addExternal()`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins.html#method-addExternal) API method instead to load the Export to PDF plugin directly from the `node_modules/` directory:

```js
CKEDITOR.plugins.addExternal( 'exportpdf', './node_modules/ckeditor4-plugin-exportpdf/' );
```

### Custom Build with Online Builder

The Export to PDF plugin is also available in the [official CKEditor 4 Add-ons Repository](https://ckeditor.com/cke4/addon/exportpdf). This allows you to automatically include it in any custom build which is created with the [online builder](https://ckeditor.com/cke4/builder).

### Manual Download

If you prefer to download the plugin code manually, you can do this via the Add-ons Repository. Simply download the [Export to PDF plugin](https://ckeditor.com/cke4/addon/exportpdf) and place it in the CKEditor 4 `plugins/` directory.

## Supported Features and Compatibility

Thanks to the plugin, the formatting and content structure you create using the WYSIWYG editor is maintained in the output PDF file. See the tips for {@link features/exporttopdf/README#achieving-the-best-results achieving the best results} to learn how to configure the plugin and editor to best suite your needs.

As for browser compatibility, the Export to PDF plugin works in all browsers {@link guide/dev/browsers/README supported by CKEditor 4} except for Internet Explorer older than version 11. The plugin is compatible with CKEditor 4 versions starting from `4.6.1`.

## Configuration

The crucial aspect of this feature is its configuration. In order to ensure that the generated PDF looks as close as possible to the same content when it is displayed in the WYSIWYG editor, the feature should be carefully configured. Thhe configuration options available both in the plugin and the HTML to PDF converter allow you to create PDF documents that will fulfill the needs of your application and your end-users.

### Achieving the Best Results

Due to the differences between browsers and operating systems it is not always possible to reach a perfect match between the content in the editor and in a generated PDF file. However, thanks to flexible configuration, adjusting a few configuration options can make the difference hardly noticeable.

Here are a few configuration tips that will make it easier to achieve a close to 1:1 rendering between the editor content and the output PDF document:

* **Editor width.**
  Make the editor width correspond with the chosen paper format for output file. For example, for the `A4` format (which is used by the PDF converter service [by default](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Page-format)), the editor width should be equal to `805px`.
* **Margins.**
  If they are changed for the PDF document using a [custom configuration](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Margins), also update them for the editor by providing additional styling via the {@linkapi CKEDITOR.addCss `CKEDITOR.addCss()`} method.
* **Document editor setup.**
  To take things a step further you may also experiment with a {@link guide/dev/example_setups/README#document-editor Document Editor setup}, just like in our [demo](https://ckeditor.com/ckeditor-4/demo/#document).

### Setting Dynamic File Name

Using the {@linkapi CKEDITOR.config.exportPdf_fileName `CKEDITOR.config.exportPdf_fileName`} option, the name of the generated PDF file may be set to a fixed value upon the editor initialization (e.g. `ckeditor4.pdf`) or changed dynamically every time the editor content is exported to PDF. For example, it can match the text in the main heading (`<h1>` element) from the editor content:

```js
config.exportPdf_fileName = function( editor ) {
	return editor.editable().findOne( 'h1' ).getText() + '.pdf';
}
```

The value is then calculated right before saving the PDF file.

### Output File Configuration

A number of options like output file format or margins can be set in the {@linkapi CKEDITOR.config.exportPdf_options `CKEDITOR.config.exportPdf_options`} object.

This object is sent to the CKEditor Cloud Services HTML to PDF converter service along with the HTML and CSS and processed on the server side. To learn about the possible configurations, visit the [HTML to PDF converter service documentation](https://pdf-converter.cke-cs.com/docs).

Among the features that you can set up for your PDF document are:

* Page margins.
* Page format.
* Page orientation.
* Custom header and footer, with support for adding the page number.

### Relative vs Absolute URLs

Images and {@linkapi CKEDITOR.config.exportPdf_stylesheets stylesheets} can be attached to the editor using relative URLs, but before the data is sent to the HTMNL to PDF converter service, such links are converted to absolute ones.

In some cases it will mean that the data will not be accessible by the server (e.g. if it is referenced locally or through the intranet). You should remember to expose such assets publicly or use absolute URLs to publicly available assets.

For images it is possible to use [Base64-encoded images](https://pdf-converter.cke-cs.com/docs#section/Images/Insert-base64-encoded-image) instead. Also the {@linkapi CKEDITOR.config.baseHref `CKEDITOR.config.baseHref`} option may come in handy here to set the base path for editor assets to a different URL than the editor itself.

### Custom CSS Rules

Irrespectively of the editor type, inline style rules are always preserved.

During the preprocessing phase, the data from the editor is also wrapped with a `<div>` container with two classes defined:

* `cke_editable`,
* `cke_contents_rlt` or `cke_contents_ltr` &mdash; depending on the {@linkapi CKEDITOR.dom.element.getDirection content direction}.

They can be used for better targeting of custom CSS rules (see details below).

The editor type determines the behavior according to the global editor styles.

#### Classic Editor

Besides the inline styles, in order to recreate the editor content, all the default CKEditor 4 CSS rules are sent to the HTML to PDF converter service. They can be overriden by the {@linkapi CKEDITOR.config.contentsCss `CKEDITOR.config.contentsCss`} option or extended with the {@linkapi CKEDITOR.addCss `CKEDITOR.addCss()`} method.

#### Divarea and Inline editor

Inline and div-editing area editors use the styles of the web page they are embedded in, on top of their own rules. For these editors, only inline and browser styles are sent by default.

If more styles are needed for the PDF output, attach additional stylesheet(s) using the {@linkapi CKEDITOR.config.exportPdf_stylesheets `CKEDITOR.config.exportPdf_stylesheets`} configuration option.

### Data Preprocessing

The Export to PDF plugin provides a custom {@linkapi CKEDITOR.editor#exportPdf `exportPdf`} event. It can be used for custom data processing (e.g. to ensure the output text will be black, not <span style="color:pink;background-color:yellow">pink on yellow background</span>). The editor uses it too, so just remember to add the right priority to the {@linkapi CKEDITOR.editor.on event listener}:

* 1-14 &ndash; The data is available in the original string format (it is extracted using the {@linkapi CKEDITOR.editor.getData `CKEDITOR.editor.getData()`} method).
* 15 &ndash; The data is preprocessed by the plugin: relative paths for images are changed to absolute ones and the editor's content is wrapped into a container with appropriate classes for styling.
* 16-19 &ndash; The data is in the form in which it will be sent to the HTML to PDF converter service. It can still be modified.
* 20 &ndash; The data is sent to the HTML to PDF converter service.

### Asynchronous Data Preprocessing

It is even possible to run some asynchronous tasks before sending the data to the server. To do this, simply stop the event and set a flag marking that process as not finished yet. After it is done, remove the flag and refire the {@linkapi CKEDITOR.editor#exportPdf `exportPdf`} event:

```js
editor.on( 'exportPdf', function( evt ) {
	// Let's call some asynchronous function here, like an Ajax request. Flag processing as 'in progress'.
	evt.data.asyncDone = false;

	ajaxRequestForAdditionalData( evt.editor, function() {
		// Ajax call is done, let's mark processing as done and refire the 'exportPdf' event.
		evt.data.asyncDone = true;
		editor.fire( 'exportPdf', evt.data );
	} );
}, null, null, 1 );

editor.on( 'exportPdf', function( evt ) {
	// Stop the event if the asynchronous process is still on.
	if ( !evt.data.asyncDone ) {
		evt.cancel();
	}
} );
```

## Export to PDF Demo

See the {@linkexample exporttopdf working "Exporting editor content to PDF" sample} that showcases creating a document in CKEditor 4 and then printing it to a PDF file that can be downloaded by the user.

## Related Features

Refer to the following resources for more information about working with document in CKEditor 4:

* The {@link features/pastefromword/README Pasting content from Microsoft Word} article contains information about the Paste from Word plugin and its features.
* The {@link features/pastefromexcel/README Pasting content from Microsoft Excel} article contains information about the Paste from Excel plugin and its features.
* The {@link features/pastefromgoogledocs/README Pasting content from Google Docs} article contains information about the Paste from Google Docs plugin and its features.
* The {@link features/pastefromlibreoffice/README Pasting content from LibreOffice} article contains information about the Paste from LibreOffice plugin and its features.
* The {@link features/size/README Setting editor size} article will help reaching the best projection.
* The {@link guide/dev/acf/README Content filtering with ACF} article explains how to make editor work also with custom plugins.
