<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic Text Styles: Bold, Italic and More

<p class="requirements">
	This feature is provided through a plugin that is included in all official CKEditor distributions (Basic, Standard, Full) available from the official CKEditor <a href="http://ckeditor.com/download">Download</a> site, although some text style buttons are disabled in the Basic and Standard preset.
</p>

The [Basic Styles](http://ckeditor.com/addon/basicstyles) plugin provides the ability to add some basic text formatting to your document. When enabled, it adds the **Bold**, **Italic**, **Underline**, **Strikethrough**, **Subscript** and **Superscript** toolbar buttons that apply these styles. If you want to quickly [remove basic styles](#!/guide/dev_removeformat) from your document, use the **Remove Format** button provided by the [Remove Format](http://ckeditor.com/addon/removeformat) plugin.


Basic text styles work on text selections; check the [Text Formats](#!/guide/dev_format) feature for block-level text formatting.

{@img basicstyles_01.png Basic styles enabled in CKEditor}

## Enabling All Basic Styles

By default, some of these styles are disabled in the Basic and Standard presets through the CKEDITOR.config.removeButtons setting in the `config.js` file, but you can easily enable them by using one of the following solutions.

### Enable All Basic Styles Globally

Open the `config.js` file available in your `ckeditor` directory, and edit the `config.removeButtons` entry in the following way:

	// For the Basic preset:
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor';

	// For the Standard preset:
	config.removeButtons = '';

**Advantages**

This will apply to all CKEditor instances that you create, so you will not need to remember to change it for each one separately.

**Disadvantages**

You will need to remember not to overwrite this file when [upgrading](#!/guide/dev_upgrade) to a newer CKEditor version. **Solution**: Provide a [custom configuration file](#!/guide/dev_configuration-section-using-a-custom-configuration-file) overriding the default configuration.

### Enable All Basic Styles for a Single Editor Instance

If you want to change the default settings for a particular editor instance, provide the modified `config.removeButtons` value in the [in-page configuration](#!/guide/dev_configuration-section-defining-configuration-in-page) when creating a CKEditor instance, for example:

	// For the Basic preset:
	CKEDITOR.replace( 'editor1', {
		removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor'
	});

	// For the Standard preset:
	CKEDITOR.replace( 'editor1', {
		removeButtons: ''
	});

**Advantages**

This will only apply to a selected CKEditor instance that you create, without affecting your global configuration.

**Disadvantages**

You will need to provide the in-page configuration for all other CKEditor instances that you want to use it with.

## Custom Basic Text Style Definition

Basic text styles can be output in HTML in different ways. For example, the **Bold** feature can be implemented as `<strong>`, `<b>`, `<span style="font-weight: bold;">` or `<span class="Bold">`. These configuration options let you set custom definitons for basic text style output:

* CKEDITOR.config.coreStyles_bold
* CKEDITOR.config.coreStyles_italic
* CKEDITOR.config.coreStyles_underline
* CKEDITOR.config.coreStyles_strike
* CKEDITOR.config.coreStyles_subscript
* CKEDITOR.config.coreStyles_superscript

The following example configures CKEditor to output bold with an inline CSS style, italic with the `<i>` element, and subscript and superscript with CSS classes.

	config.coreStyles_bold = {
		element: 'span',
		styles: { 'font-weight': 'bold' }
	};

	config.coreStyles_italic = { element: 'i', overrides: 'em' };

	config.coreStyles_subscript = {
		element: 'span',
		attributes: { 'class': 'Subscript' },
		overrides: 'sub'
	};

	config.coreStyles_superscript = {
		element: 'span',
		attributes: { 'class': 'Superscript' },
		overrides: 'sup'
	};

You can use the `overrides` parameter to define an alternative that CKEditor will convert into your desired form.

Remember that depending on your use case, the CSS classes for basic text styles need to be defined accordingly. For [classic editor](#!/guide/dev_framed) they should be defined in an external CSS file added to the editor configuration with the CKEDITOR.config.contentsCss option. For [inline editor](#!/guide/dev_inline) they need to be added directly to the page stylesheet.

<div class="tip">
	<p>
		Some conversions are applied automatically thanks to a feature called <a href="#!/guide/dev_advanced_content_filter-section-content-transformations">content transformations</a> which is a part of Advanced Content Filter. This, however, will only work when ACF
	is enabled (the deafult option), and applies to a handful of pre-defined transformations.
	</p>
	<p>
		Custom basic style definitions are automatically integrated with <a href="#!/guide/dev_acf">Advanced Content Filter</a> and are treated as allowed by the editor content filtering mechanism.
	</p>
</div>

## Basic Text Styles Demo

See the [working "Basic Text Styles: Bold, Italic and More" sample](https://sdk.ckeditor.com/samples/basicstyles.html) that showcases the usage and customization of basic text formatting.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The [Using the Copy Formatting Feature](#!/guide/dev_fcopyformatting) article explains how to copy text formatting between document fragments.
* The [Removing Text Formatting](#!/guide/dev_removeformat) article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.
* The [Applying Block-Level Text Formats](#!/guide/dev_format) article presents how to apply formatting to entire text blocks and not just text selections.
* The [Setting Text and Background Color](#!/guide/dev_colorbutton) article explains how to use and customize the **Text Color** and **Background Color** features.
