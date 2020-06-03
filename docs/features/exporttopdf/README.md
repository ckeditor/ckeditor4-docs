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

# Exporting content to PDF

<info-box info="">
	This feature is provided through the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin that is not included in any official CKEditor 4 preset. You can {@link guide/dev/plugins/README add it to your custom build} with [online builder](https://ckeditor.com/cke4/builder) or download as a [npm package](https://www.npmjs.com/package/ckeditor4-plugin-exportpdf).
</info-box>

The [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin allows you to export the content from editor to a PDF file.

{@img assets/img/exportpdf_01.png Export to PDF button.}

When enabled, it adds the **<img class="inline" src="%BASE_PATH%/assets/img/exportpdf-button.png" alt="Export to PDF toolbar button">Export to PDF** toolbar button. It sends data from editor to the PDF service maintained by [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) and handles the response, saving it as a PDF file.

## Feature overview

CKEditor 4 is a feature rich WYSIWYG editor where you operate mostly on rich text and HTML markup. In many cases pure HTML output is enough, however you may also need to preserve the document in other formats which can be easily shared and presented in different environments. Thanks to the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin you can save the document you created to a downloadable file, preserving all the styles and structure in nearly 1:1 projection.

## Supported features and compatibility

All the formatting and content structure you create using the editor is maintained in the output file. See the tips for {@link features/exporttopdf/README#reaching-the-best-projection reaching the best projection} to learn how to configure the plugin and editor to best suite your needs.

As for the compatibility, Export to PDF plugin works on all the browsers {@link guide/dev/browsers/README supported by CKEditor 4} except for Internet Explorer versions older than version 11. The plugin is compatible with CKEditor 4 versions starting from `4.6.1` version.

## Configuration

### Reaching the best projection

Due to the differences between browsers and operating systems it is not always possible to reach a perfect match between content in the editor and PDF. However, thanks to flexible configuration, adjusting couple of configuration options can make the difference hardly noticeable.

Make the editor width correspond with the chosen paper format for output file - e.g. for the `A4` format (which is used by the PDF service [by default](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Page-format)) the editor width should be equal to `840px`. Then mind the margins - if they are changed for the PDF using [custom config](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Margins), also update them for editor itself providing additional styling via {@linkapi CKEDITOR.addCss `CKEDITOR.addCss()`} method. To take things a step further you may also experiment with {@link guide/dev/example_setups/README#document-editor Document Editor setup}.

### Setting dynamic file name

Using {@linkapi CKEDITOR.config.exportPdf_fileName `CKEDITOR.config.exportPdf_fileName`} option, the name of the generated file may be set to a fixed value upon editor initialization (e.g. `ckeditor4.pdf`) or changed dynamically every time editor content is exported to PDF. For example it can match the text in `h1` element from editor content:

	config.exportPdf_fileName = function( editor ) {
		return editor.editable().findOne( 'h1' ).getText() + '.pdf';
	}

The value is then calculated right before saving the file.

### Output file configuration

A number of options like output file format or margins can be set in the {@linkapi CKEDITOR.config.exportPdf_options `CKEDITOR.config.exportPdf_options`} object. It is sent to the PDF service along with the HTML and CSS and processed on the server side. To check out the possible configurations, visit the [PDF service documentation](https://pdf-converter.cke-cs.com/docs).

### Relative vs absolute image URLs

Images can be attached to the editor using relative URLs, but before data is sent to the PDF service, such links are converted to absolute ones. In some cases it will mean that data will not be accessible by the server (e.g. if it is referenced locally or through the intranet) - remember to expose such assets publicly or use absolute URLs to publicly available assets. Other possibility is to use [base64 encoded images](https://pdf-converter.cke-cs.com/docs#section/Images/Insert-base64-encoded-image). Also {@linkapi CKEDITOR.config.baseHref `CKEDITOR.config.baseHref`} option may come in handy here to set the base path for editor assets to a different URL than editor itself.

### Custom CSS rules

Irrespectively from the editor type, inline rules are always preserved. During preprocessing data from editor is also wrapped into a `div` container with two classes defined: `cke_editable` and, depending on {@linkapi CKEDITOR.dom.element.getDirection the content direction}, `cke_contents_rlt` or `cke_contents_ltr` - they can be used for better targeting of custom CSS rules (see details below). The editor type determines the behaviour according to the global editor styles.

#### Classic editor

Besides the inline styles, in order to recreate the editor content, all the default CKEditor 4 CSS rules are sent to the PDF service. They can be overriden by {@linkapi CKEDITOR.config.contentsCss `CKEDITOR.config.contentsCss`} option or extended by {@linkapi CKEDITOR.addCss `CKEDITOR.addCss()`} method.

#### Divarea and Inline editor

For these editors (note that they use the styles of the webpage they are embedded on top of their own rules), only inline and browser styles are sent by default. If more is needed, attach the additional stylesheet (one or more) using {@linkapi CKEDITOR.config.exportPdf_stylesheets `CKEDITOR.config.exportPdf_stylesheets`} configuration option.

### Data preprocessing

Plugin provides a custom {@linkapi CKEDITOR.editor#exportPdf `exportPdf` event}. It can be used for custom data processing (e.g. to ensure the output text will be black, not <span style="color:pink;background-color:yellow">pink on yellow background</span>). Editor uses it too, so just remember to add the right priority to the {@linkapi CKEDITOR.editor.on event listener}:

* 1-14: Data is available in the original string format (it is extracted using {@linkapi CKEDITOR.editor.getData `CKEDITOR.editor.getData()`} method).
* 15: Data is preprocessed by the plugin: image relative paths are changed to absolute ones and editor's content is wrapped into a container with appropriate classes for styling.
* 16-19: Data is in the form in which it will be sent to the PDF service. It can still be modified.
* 20: Data is sent to the PDF service.

### Asynchronous data preprocessing

It is even possible to run some asynchronous tasks before sending data to the server. To do this, simply stop the event and set the flag telling that process is not finished yet. After it is done, remove flag and refire the {@linkapi CKEDITOR.editor#exportPdf `exportPdf` event}:

	editor.on( 'exportPdf', function( evt ) {
		// Let's call some asynchronous function here, like an Ajax request. Flag processing as 'in progress'.
		evt.data.asyncDone = false;

		ajaxRequestForAdditionalData( evt.editor, function() {
			// Ajax call is done, let's mark processing as done and refire 'exportPdf' event.
			evt.data.asyncDone = true;
			editor.fire( 'exportPdf', evt.data );
		} );
	}, null, null, 1 );

	editor.on( 'exportPdf', function( evt ) {
		// Stop the event if the async process is still on.
		if ( !evt.data.asyncDone ) {
			evt.cancel();
		}
	} );

## Export to PDF demo

See the {@linkexample exporttopdf working "Exporting content to a PDF" sample} that showcases the export to PDF process.

## Related Features

Refer to the following resources for more information about working with document in CKEditor 4:

* The {@link features/pastefromword/README Pasting content from Microsoft Word} article contains information about the Paste from Word plugin and its features.
* The {@link features/pastefromexcel/README Pasting content from Microsoft Excel} article contains information about the Paste from Excel plugin and its features.
* The {@link features/pastefromgoogledocs/README Pasting content from Google Docs} article contains information about the Paste from Google Docs plugin and its features.
* The {@link features/pastefromlibreoffice/README Pasting content from LibreOffice} article contains information about the Paste from LibreOffice plugin and its features.
* The {@link features/size/README Setting editor size} article will help reaching the best projection.
* The {@link guide/dev/acf/README content filtering} article explains how to make editor work also with custom plugins.
