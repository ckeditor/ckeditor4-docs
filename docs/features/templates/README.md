---
category: styling-formatting
order: 80
url: features/templates
menu-title: Content templates
meta-title-short: Content templates
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Content templates

<info-box info="">
 	This feature is provided through the <a href="https://ckeditor.com/cke4/addon/templates">Content Templates</a> plugin that is included in the Full preset available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

This Content Templates plugin provides a dialog to offer predefined content templates - with page layout, text formatting and styles.

When enabled, the plugin adds the **Templates** (<img class="inline" src="%BASE_PATH%/assets/img/templates-button.png" alt="Copy Formatting toolbar button">) toolbar button. Use it to invoke a dialog with defined templates, then use the dialog to apply a selected template.

{@img assets/img/templates_01.png Content templates selector in CKEditor}

A couple of sample templates can be found inside of the plugin directory at install time. The user may design and load their own favorite templates, too.



## Defining templates

The template definition set in the `default.js` file in the `templates` folder and defined by the {@linkapi CKEDITOR.plugins.templates.templateDefinition} class. A template needs several basic things to work. The most important part is the HTML content defining the layout of the template.

The following code registers the default template with title, text body and an image.

	// Register a templates definition set named "default".
	CKEDITOR.addTemplates( 'default', {
		// The name of sub folder which hold the shortcut preview images of the
		// templates.
		imagesPath: CKEDITOR.getUrl( CKEDITOR.plugins.getPath( 'templates' ) + 'templates/images/' ),

		// The templates definitions.
		templates: [ {
			title: 'Image and Title',
			image: 'template1.gif',
			description: 'One main image with a title and text that surround the image.',
			html: '<h3>' +
				// Use src=" " so image is not filtered out by the editor as incorrect (src is required).
				'<img src=" " alt="" style="margin-right: 10px" height="100" width="100" align="left" />' +
				'Type the title here' +
				'</h3>' +
				'<p>' +
				'Type the text here' +
				'</p>'
		}

## Content Templates Demo

See the {@linkexample templates working "Content Templates" sample} that showcases the use of predefined content templates and the plugin implementation.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The {@link features/copyformatting/README Using the Copy Formatting Feature} article explains how to copy text formatting between document fragments.
* The {@link features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.
* The {@link features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.