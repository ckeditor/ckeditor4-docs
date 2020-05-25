---
category: working-with-document
order: 25
url: features/exportpdf
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

When enabled, it adds the **<img class="inline" src="%BASE_PATH%/assets/img/exportpdf-button.png" alt="Export to PDF toolbar button">Export to PDF** toolbar button. It sends data from editor to the endpoint maintained by [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) and handles the response, saving it as a PDF file.

## Feature overview

Although CKEditor 4 is basically a web tool, sometimes you may want (or *need*) to use the content it generated somewhere else. While simple copy and paste may work in some cases, most probably it will not allow you to use some more advanced editor features like styled tables or lists. Thanks to the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin you can save the document you created to a downloadable file, preserving all the styles and structure in nearly 1:1 projection.

## Supported features

All the formatting and content structure you create using the editor is maintained in the output file. See the tips for {@link features/exportpdf/README#reaching-the-best-projection reaching the optimal projection} to learn how to configure the plugin and editor to best suite your needs.

As for the compatibility, plugin works on all the browsers {@link guide/dev/browsers/README supported for CKEditor 4} except for Internet Explorers older than version 11.

## Configuration

### Reaching the best projection

Due to the differences between browsers and operating systems it is not always possible to reach a perfect match between content in the editor and PDF. However, a lot can be done to ensure the differences will be hardly noticeable.

For example, make the editor width correspond with the chosen paper format for output file - e.g. for the `A4` format (which is used by the export service [by default](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Page-format)) the editor width should be equal to `840px`. Then mind the margins - if they are changed for the PDF using [custom config](https://pdf-converter.cke-cs.com/docs#section/PDF-options/Margins), also update them for editor. To take things a step further you may experiment with {@link guide/dev/example_setups/README#document-editor Document Editor setup}.

### Custom CSS rules

Besides the inline styles, in order to mimic the editor content, all the CKEditor 4 CSS rules are sent to the service. But let's say your company has a strict heading color policy: it has to be <span style="color:#4B0082">indigo</span> (`#4B0082`), definitely not <span style="color:#483D8B">dark slate blue</span> (`#483D8B`)! Fortunately you do not have to remember to change it every time. It is possible to attach your own custom CSS stylesheet via {@linkapi CKEDITOR.config.exportPdf_stylesheet CKEDITOR.config.exportPdf_stylesheet} configuration option or just add some styles with {@linkapi CKEDITOR.addCss} method.

### Output file configuration

A number of options like output file format or margins can be set in the {@linkapi CKEDITOR.config.exportPdf_options CKEDITOR.config.exportPdf_options} object. It is sent to the service along with the HTML and CSS and processed on the server side. To check out the possible configurations, visit the [service documentation](https://pdf-converter.cke-cs.com/docs).

### Data preprocessing

Plugin provides a custom {@linkapi CKEDITOR.editor#exportPdf exportPdf event}. It can be used for custom data processing (e.g. to ensure the output text will be black, not <span style="color:pink;background-color:yellow">pink on yellow background</span>). Editor uses it too, so just remember to add the right priority to the listener:

* 1-14: Data is available in the original string format.
* 15: Data is processed by the plugin.
* 16-19: Data that will be sent to the service can be modified.
* 20: Data is sent to the service.

### Asynchronous preprocessing

It is even possible to run some asynchronous tasks before sending data to the server. To do this simply stop the event and set the flag telling that process is not finished yet. After it is done, remove flag and refire the `exportPdf` event:

	editor.on( 'exportPdf', function( evt ) {
		// Stop the event if the async process is still on.
		if ( !evt.data.asyncDone ) {
			evt.cancel();
		} else {
			delete evt.data.asyncDone;
		}
	} );

	editor.on( 'exportPdf', function( evt ) {
		// Here e.g. some AJAX request can be sent; after it is done set the flag to `true`:
		evt.data.asyncDone = true;

		// Refire the event.
		editor.fire( 'exportPdf', evt.data );
	}, null, null, 1 );

### Relative vs absolute URLs

Assets like images can be attached using relative URLs, but before data is sent to the service, relative links are converted to absolute ones. In some cases it will mean that data will not be accessible by the server (e.g. if it is referenced locally or through the infranet) - remember to expose such assets globally.

### Setting dynamic file name

Using {@linkapi CKEDITOR.config.exportPdf_fileName CKEDITOR.config.exportPdf_fileName} option the name of generated file may be set to a fixed name upon editor initialization (e.g. `ckeditor4.pdf`) or changed dynamically every time editor content is exported to PDF. For example it can match the text in `h1` element from editor content:

	config.exportPdf_fileName = function( editor ) {
		return editor.editable().findOne( 'h1' ).getText() + '.pdf';
	}

The value is then calculated right before saving the file.

## Export to PDF demo

See the {@linkexample exportpdf working "Export to PDF" sample} that showcases the export to PDF process.

## Related Features

Refer to the following resources for more information about working with document in CKEditor 4:

* The {@link features/size/README Setting editor size} article will help reaching the best projection.
* The {@link guide/dev/acf/README content filtering} article explains how to make editor work also with custom plugins.
