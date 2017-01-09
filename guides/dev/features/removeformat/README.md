<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Removing Text Formatting

<p class="requirements">
	This feature is provided through a plugin that is included in the Standard and Full presets available from the official CKEditor <a href="http://ckeditor.com/download">Download</a> site.
</p>

The [Remove Format](http://ckeditor.com/addon/removeformat) plugin provides the ability to quickly remove any text formatting that is applied through inline HTML elements and CSS styles, like [basic text styles](#!/guide/dev_basicstyles) (bold, italic, etc.), font family and size, [text and background colors](#!/guide/dev_colorbutton) or styles applied through the [Styles drop-down](#!/guide/dev_styles). Note that it does not change [text formats](#!/guide/dev_format) applied at block level.

When enabled, the plugin adds the **Remove Format** toolbar button. Since this feature applies to inline styles, you need to select the text fragment whose formatting is to be removed before pressing the button.

The image below shows a sample text with some styling &mdash; different typefaces, font sizes, italics, inline styles and colors &mdash; applied.

{@img removeformat_03.png Remove Format feature in CKEditor}

The second image presents the same text after the formatting cleanup done through the **Remove Format** feature. Note that block-level text formats (headings, paragraphs, blockquotes etc.) remain unchanged.

{@img removeformat_04.png Inline text formatting removed with Remove Format}

## Removing Text Formatting Demo

See the [working "Removing Text Formatting" sample](http://sdk.ckeditor.com/samples/removeformat.html) that showcases the usage of the inline formatting cleanup functionality.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The [Basic Text Styles: Bold, Italic and More](#!/guide/dev_basicstyles) article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The [Using the Copy Formatting Feature](#!/guide/dev_fcopyformatting) article explains how to copy text formatting between document fragments.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.
* The [Setting Text and Background Color](#!/guide/dev_colorbutton) article explains how to use and customize the **Text Color** and **Background Color** features.
* The [Applying Block-Level Text Formats](#!/guide/dev_format) article presents how to apply formatting to entire text blocks and not just text selections.
