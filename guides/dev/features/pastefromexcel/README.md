<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting Content from Microsoft Excel

<p class="requirements">
    This feature was introduced in <strong>CKEditor 4.7</strong>. It is provided through the <a href="https://ckeditor.com/cke4/addon/pastefromword">Paste from Word</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also <a href="#!/guide/dev_plugins">add it to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin allows you to also paste content from **Microsoft Excel** and maintain original content structure and formatting. As of CKEditor 4.7 some more advanced Excel features are not supported yet and will be added in future CKEditor releases.

When the plugin is enabled, it automatically detects Excel content and transforms its structure and formatting to clean HTML. It also adds the **Paste from Word** toolbar button (<img src="guides/dev_pastefromword/pastefromword-button.png" alt="Paste from Word toolbar button" style="vertical-align: bottom;">) which makes it possible to paste clipboard data this way only on demand.

## Supported Features

The following formatting will be reatained when pasting from Microsoft Excel:

* Text formatting
    * Text and background colors
    * Font name, style and size
    * Basic formatting (bold, italic, underline)
    * Font effects (strikethrough, superscript, subscript)
    * Heading levels
    * Text alignment
* Cell formatting (size, background, borders, special characters)
* Row and column size

## Sample

The following sample content from a Microsoft Excel document:

{@img pastefromexcel_01.png Sample Excel document}

will look like below after pasting to CKEditor with the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin enabled:

{@img pastefromexcel_02.png Excel content pasted into CKEditor}

## Paste from Excel Demo

See the [working "Pasting content from Microsoft Excel" sample](https://sdk.ckeditor.com/samples/pastefromexcel.html) that showcases the using the Paste from Word plugin to paste Excel content.

## Related Features

Refer to the following resources for more information about pasting content:

* The [Pasting content from Microsoft Word](#!/guide/dev_pastefromword) article contains more information about the Paste from Word plugin and its features.
* The [Clipboard Integration](#!/guide/dev_clipboard) article explains how Clipboard API is implemented in CKEditor.
* The [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) article describes drag&drop in CKEditor.
* The [Content Filtering (ACF)](#!/guide/dev_acf) is an introduction to CKEditor's unique content filtering system.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.
