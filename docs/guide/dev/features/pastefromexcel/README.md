---
category: inserting-content
order: 60
url: guide/dev_pastefromexcel
menu-title: Paste from Excel
meta-title-short: Paste from Excel
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting Content from Microsoft Excel

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.7</strong>. It is provided through the <a href="https://ckeditor.com/cke4/addon/pastefromword">Paste from Word</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin allows you to also paste content from **Microsoft Excel** and maintain original content structure and formatting. As of CKEditor 4.7 some more advanced Excel features are not supported yet and will be added in future CKEditor releases.

When the plugin is enabled, it automatically detects Excel content and transforms its structure and formatting to clean HTML. It also adds the **Paste from Word** toolbar button (<img class="inline" src="%BASE_PATH%/assets/img/pastefromword-button.png" alt="Paste from Word toolbar button">) which makes it possible to paste clipboard data this way only on demand.

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

{@img assets/img/pastefromexcel_01.png Sample Excel document}

will look like below after pasting to CKEditor with the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin enabled:

{@img assets/img/pastefromexcel_02.png Excel content pasted into CKEditor}

## Paste from Excel Demo

See the {@linksdk pastefromexcel working "Pasting content from Microsoft Excel" sample} that showcases the using the Paste from Word plugin to paste Excel content.

## Related Features

Refer to the following resources for more information about pasting content:

* The {@link guide/dev/features/pastefromword/README Pasting content from Microsoft Word} article contains more information about the Paste from Word plugin and its features.
* The {@link guide/dev/deep_dive/clipboard/README Clipboard Integration} article explains how Clipboard API is implemented in CKEditor.
* The {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article describes drag&drop in CKEditor.
* The {@link guide/dev/acf/README Content Filtering (ACF)} is an introduction to CKEditor's unique content filtering system.
* The {@link guide/dev/features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
