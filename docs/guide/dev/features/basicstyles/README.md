---
category: styling-formatting
order: 20
url: guide/dev_basicstyles
menu-title: Basic Text Styles
meta-title-short: Basic Text Styles
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Basic Text Styles: Bold, Italic and More

<info-box info="">
 This feature is provided through a plugin that is included in all official CKEditor distributions (Basic, Standard, Full) available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site, although some text style buttons are disabled in the Basic and Standard preset.
</info-box>

The [Basic Styles](https://ckeditor.com/cke4/addon/basicstyles) plugin provides the ability to add some basic text formatting to your document. When enabled, it adds the **Bold**, **Italic**, **Underline**, **Strikethrough**, **Subscript** and **Superscript** toolbar buttons that apply these styles. If you want to quickly {@link guide/dev/features/removeformat/README remove basic styles} from your document, use the **Remove Format** button provided by the [Remove Format](https://ckeditor.com/cke4/addon/removeformat) plugin.


Basic text styles work on text selections; check the {@link guide/dev/features/format/README Text Formats} feature for block-level text formatting.

{@img assets/img/basicstyles_01.png Basic styles enabled in CKEditor}

## Enabling All Basic Styles

By default, some of these styles are disabled in the Basic and Standard presets through the {@linkapi CKEDITOR.config.removeButtons CKEDITOR.config.removeButtons} setting in the `config.js` file, but you can easily enable them by using one of the following solutions.

### Enable All Basic Styles Globally

Open the `config.js` file available in your `ckeditor` directory, and edit the `config.removeButtons` entry in the following way:

	// For the Basic preset:
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor';

	// For the Standard preset:
	config.removeButtons = '';

**Advantages**

This will apply to all CKEditor instances that you create, so you will not need to remember to change it for each one separately.

**Disadvantages**

You will need to remember not to overwrite this file when {@link guide/dev/upgrade/README upgrading} to a newer CKEditor version. **Solution**: Provide a {@link guide/dev/configuration/README#using-a-custom-configuration-file custom configuration file} overriding the default configuration.

### Enable All Basic Styles for a Single Editor Instance

If you want to change the default settings for a particular editor instance, provide the modified `config.removeButtons` value in the {@link guide/dev/configuration/README#defining-configuration-in-page in-page configuration} when creating a CKEditor instance, for example:

``` js
// For the Basic preset:
CKEDITOR.replace( 'editor1', {
    removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor'
});

// For the Standard preset:
CKEDITOR.replace( 'editor1', {
    removeButtons: ''
});
```

**Advantages**

This will only apply to a selected CKEditor instance that you create, without affecting your global configuration.

**Disadvantages**

You will need to provide the in-page configuration for all other CKEditor instances that you want to use it with.

## Custom Basic Text Style Definition

Basic text styles can be output in HTML in different ways. For example, the **Bold** feature can be implemented as `<strong>`, `<b>`, `<span style="font-weight: bold;">` or `<span class="Bold">`. These configuration options let you set custom definitons for basic text style output:

* {@linkapi CKEDITOR.config.coreStyles_bold CKEDITOR.config.coreStyles_bold}
* {@linkapi CKEDITOR.config.coreStyles_italic CKEDITOR.config.coreStyles_italic}
* {@linkapi CKEDITOR.config.coreStyles_underline CKEDITOR.config.coreStyles_underline}
* {@linkapi CKEDITOR.config.coreStyles_strike CKEDITOR.config.coreStyles_strike}
* {@linkapi CKEDITOR.config.coreStyles_subscript CKEDITOR.config.coreStyles_subscript}
* {@linkapi CKEDITOR.config.coreStyles_superscript CKEDITOR.config.coreStyles_superscript}

The following example configures CKEditor to output bold with an inline CSS style, italic with the `<i>` element, and subscript and superscript with CSS classes.

``` js
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
```

You can use the `overrides` parameter to define an alternative that CKEditor will convert into your desired form.

Remember that depending on your use case, the CSS classes for basic text styles need to be defined accordingly. For {@link guide/dev/framed/README classic editor} they should be defined in an external CSS file added to the editor configuration with the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} option. For {@link guide/dev/inline/README inline editor} they need to be added directly to the page stylesheet.

<info-box hint="">
 <p>
 	Some conversions are applied automatically thanks to a feature called {@link guide/dev/deep_dive/advanced_content_filter/README#content-transformations content transformations} which is a part of Advanced Content Filter. This, however, will only work when ACF
 is enabled (the deafult option), and applies to a handful of pre-defined transformations.
 </p>
 <p>
 	Custom basic style definitions are automatically integrated with {@link guide/dev/acf/README Advanced Content Filter} and are treated as allowed by the editor content filtering mechanism.
 </p>
</info-box>

## Basic Text Styles Demo

See the {@linksdk basicstyles working "Basic Text Styles: Bold, Italic and More" sample} that showcases the usage and customization of basic text formatting.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link guide/dev/features/copyformatting/README Using the Copy Formatting Feature} article explains how to copy text formatting between document fragments.
* The {@link guide/dev/features/removeformat/README Removing Text Formatting} article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The {@link guide/dev/features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link guide/dev/features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.
* The {@link guide/dev/features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.
