---
category: inserting-content
order: 50
url: features/pastefromgdocs
menu-title: Paste from Google Docs
meta-title-short: Paste from Google Docs
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting Content from Google Docs

<info-box info="">
    This feature is provided through the <a href="https://ckeditor.com/cke4/addon/pastefromgdocs">Paste from Google Docs</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The [Paste from Google Docs](https://ckeditor.com/cke4/addon/pastefromgdocs) plugin allows you to paste content from Google Docs and maintain original content structure and formatting.

When enabled, it automatically detects Google Docs content and transforms its structure and formatting to clean HTML.

## Supported Features

Paste from Google Docs retains the following formatting:

* Text formatting
    * Text and background colors
    * Font name, style and size
    * Basic formatting (bold, italic, underline)
    * Font effects (strikethrough, superscript, subscript)
    * Heading levels
    * Text alignment
* Lists
    * Numbered and bulleted lists
    * Multilevel lists
    * Different numbering formats (Roman, decimal, alphanumeric)
    * Custom start number (e.g. you can start the list from number 4)
* Tables
    * Borders and shading
    * Cell size (width and height)
    * Cell alignment
    * Text formatting (as listed above)

Paste from Google Docs maintains most of Google Docs text formatting features with some exceptions related to advanced styling, customizations, or stylings that are not supported by HTML, e.g. it will not handle equations created in Google Docs.

## Sample

The following sample content from a Google Docs document:

{@img assets/img/pastefromgdocs_01.png Sample Google Docs document}

will look like below after pasting to CKEditor with the [Paste from Google Docs](https://ckeditor.com/cke4/addon/pastefromgdocs) plugin enabled:

{@img assets/img/pastefromgdocs_02.png Google Docs content pasted into CKEditor}

## Filters

HTML exposed by Google Docs does not comply to rules of valid and semantic HTML. Therefore, a separate filter had to be created to normalize this content. It is implemented in the [Paste from Google Docs](https://ckeditor.com/cke4/addon/pastefromgdocs) plugin.

## Paste from Google Docs Demo

See the {@linksdk pastefromgdocs working "Pasting content from Google Docs" sample} that showcases the Paste from Google Docs plugin.

## Related Features

Refer to the following resources for more information about pasting content:

* The {@link features/pastefromword/README Pasting content from Microsoft Word} article contains more information about the Paste from Word feature.
* The {@link features/pastefromexcel/README Pasting content from Microsoft Excel} article contains more information about the Paste from Excel feature.
* The {@link guide/dev/deep_dive/clipboard/README Clipboard Integration} article explains how Clipboard API is implemented in CKEditor.
* The {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article describes drag&drop in CKEditor.
* The {@link guide/dev/acf/README Content Filtering (ACF)} is an introduction to CKEditor's unique content filtering system.
* The {@link features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
