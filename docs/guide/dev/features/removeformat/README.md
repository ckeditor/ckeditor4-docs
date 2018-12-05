---
category: styling-formatting
order: 60
url: guide/dev_removeformat
menu-title: Removing Text Formatting
meta-title-short: Removing Text Formatting
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Removing Text Formatting

<info-box info="">
 This feature is provided through a plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site.
</info-box>

The [Remove Format](https://ckeditor.com/cke4/addon/removeformat) plugin provides the ability to quickly remove any text formatting that is applied through inline HTML elements and CSS styles, like {@link guide/dev/features/basicstyles/README basic text styles} (bold, italic, etc.), font family and size, {@link guide/dev/features/colorbutton/README text and background colors} or styles applied through the {@link guide/dev/features/styles/README Styles drop-down}. Note that it does not change {@link guide/dev/features/format/README text formats} applied at block level.

When enabled, the plugin adds the **Remove Format** toolbar button. Since this feature applies to inline styles, you need to select the text fragment whose formatting is to be removed before pressing the button.

The image below shows a sample text with some styling &mdash; different typefaces, font sizes, italics, inline styles and colors &mdash; applied.

{@img assets/img/removeformat_03.png Remove Format feature in CKEditor}

The second image presents the same text after the formatting cleanup done through the **Remove Format** feature. Note that block-level text formats (headings, paragraphs, blockquotes etc.) remain unchanged.

{@img assets/img/removeformat_04.png Inline text formatting removed with Remove Format}

## Removing Text Formatting Demo

See the {@linksdk removeformat working "Removing Text Formatting" sample} that showcases the usage of the inline formatting cleanup functionality.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link guide/dev/features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The {@link guide/dev/features/copyformatting/README Using the Copy Formatting Feature} article explains how to copy text formatting between document fragments.
* The {@link guide/dev/features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link guide/dev/features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.
* The {@link guide/dev/features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.
