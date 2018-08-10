---
category: styling-formatting
order: 100
url: guide/dev_format
menu-title: Text Formats
meta-title-short: Text Formats
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Applying Block-Level Text Formats

<info-box info="">
 This feature is provided through a plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site, although some text formats are disabled in the Standard preset.
</info-box>

The [Format](https://ckeditor.com/cke4/addon/format) plugin provides the ability to add block-level text formatting to your document. When enabled, it introduces the <img class="inline" src="%BASE_PATH%/assets/img/format_01.png" alt="Paragraph Format" title="Paragraph Format"> toolbar button that applies these text formats. The formats work on block level which means that you do not need to select any text in order to apply them and entire blocks will be affected by your choice.

{@img assets/img/format_02.png Format drop-down available in CKEditor toolbar}

If you want to apply inline styles on selected text fragments, read about {@link guide/dev/features/basicstyles/README basic text styles} and the {@link guide/dev/features/styles/README **Styles** drop-down list}.

## Enabling All Block-Level Text Formats

By default, some of these formats are not included in the Standard preset due to the {@linkapi CKEDITOR.config.format_tags CKEDITOR.config.format_tags} settings available in the `config.js` file, but you can easily enable them by using one of the following solutions. The same procedure also applies to limiting the number of text format options available in the editor.

### Enable All Block-Level Text Format Globally

Open the `config.js` file available in your `ckeditor` directory, and edit the `config.format_tags` entry in the following way:

	// Enable all default text formats:
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';

	// Enable a limited set of text formats:
	config.format_tags = 'p;h1;h2;pre;div';

**Advantages**

This will apply to all CKEditor instances that you create, so you will not need to remember to change it for each one separately.

**Disadvantages**

You will need to remember not to overwrite this file when {@link guide/dev/upgrade/README upgrading} to a newer CKEditor version. **Solution**: Provide a {@link guide/dev/configuration/README#using-a-custom-configuration-file custom configuration file} overriding the default configuration.

### Enable All Block-Level Text Formats for a Single Editor Instance

If you want to change the default settings for a particular editor instance, provide the modified `config.format_tags` value in the {@link guide/dev/configuration/README#defining-configuration-in-page in-page configuration} when creating a CKEditor instance, for example:

	// Enable all default text formats:
	CKEDITOR.replace( 'editor1', {
		format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div'
	});

	// Enable a limited set of text formats:
	CKEDITOR.replace( 'editor1', {
		format_tags: 'p;h1;h2;pre;div'
	});

**Advantages**

This will only apply to a selected CKEditor instance that you create, without affecting your global configuration.

**Disadvantages**

You will need to provide the in-page configuration for all other CKEditor instances that you want to use it with.

## Custom Block-Level Text Formats Definition

The text format feature is customizable &mdash; you can easily adjust format definitions, for example by adding a custom class.

Each entry from the {@linkapi CKEDITOR.config.format_tags CKEDITOR.config.format_tags} setting must have a corresponding definition in a configuration option named `config.format_(tagName)`, for example the `<h1>` tag is defined in {@linkapi CKEDITOR.config.format_h1 CKEDITOR.config.format_h1}

If you want to, for example, add CSS classes to format definitions, you can do it in the following way:

	config.format_h1 = { element: 'h1', attributes: { 'class': 'editorTitle1' } };
	config.format_h2 = { element: 'h2', attributes: { 'class': 'editorTitle2' } };
	config.format_pre = { element: 'pre', attributes: { 'class': 'editorCode' } };

Remember that depending on your use case, the CSS classes for text formats need to be defined accordingly. For {@link guide/dev/framed/README classic editor} they should be defined in an external CSS file added to the editor configuration with the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} option. For {@link guide/dev/inline/README inline editor} they need to be added directly to the page stylesheet.

<info-box hint="">
 The block-level text format feature is automatically integrated with {@link guide/dev/acf/README Advanced Content Filter}, so all custom format definitions are treated as allowed by the editor content filtering mechanism.
</info-box>

## Block-Level Text Formats Demo

See the {@linksdk format working "Applying Block-Level Text Formats" sample} that showcases the usage and customization of basic text formatting.

## Related Features

Refer to the following resources for more information about text styling:

* The {@link guide/dev/features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The {@link guide/dev/features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link guide/dev/features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.
