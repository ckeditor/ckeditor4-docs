---
category: inserting-content
order: 60
url: features/pastefromlibreoffice
menu-title: Paste from LibreOffice
meta-title-short: Paste from LibreOffice
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting Content from LibreOffice

<info-box info="">
    This feature is provided through the <a href="https://ckeditor.com/cke4/addon/pastefromlibreoffice">Paste from LibreOffice</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The [Paste from LibreOffice](https://ckeditor.com/cke4/addon/pastefromlibreoffice) plugin allows you to paste content from LibreOffice Writer and maintain original content structure and formatting.

When enabled, it automatically detects LibreOffice Writer content and transforms its structure and formatting to clean HTML.

## Supported Features

Paste from LibreOffice retains the following formatting:

* Text formatting
    * Text and background colors
    * Font family, style and size
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
* Images

Paste from LibreOffice maintains most of Google Docs text formatting features with some exceptions related to advanced styling, customizations, or stylings that are not supported by HTML.

## Sample

The following sample content from a LibreOffice Writer document:

{@img assets/img/pastefromlibreoffice_01.png 804 A sample LibreOffice Writer document.}

will look like below after pasting to CKEditor with the [Paste from LibreOffice](https://ckeditor.com/cke4/addon/pastefromlibreoffice) plugin enabled:

{@img assets/img/pastefromlibreoffice_02.png 952 LibreOffice Writer content pasted into CKEditor 4 WYSIWYG editor.}

Here is another sample with some more complicated formatting and styling as well as an image:

{@img assets/img/pastefromlibreoffice_03.png 748 A sample LibreOffice Writer document with complex formatting and image.}

It will look like this after pasting into CKEditor:

{@img assets/img/pastefromlibreoffice_04.png 950 Complex LibreOffice Writer content pasted into CKEditor 4 WYSIWYG editor.}

In the example above you can see that after pasting into CKEditor, the first list has different list item markers than in the LibreOffice Writer document. Although pasting lists with different markers is supported in CKEditor 4 (check the second and third list in the example above), this is a specific case. Such list style is not natively supported by the browser. However, it can be adjusted by using extra CSS rules (see a [related StackOverflow thread](http://stackoverflow.com/questions/4098195/can-ordered-list-produce-result-that-looks-like-1-1-1-2-1-3-instead-of-just-1) how to style it properly).

## Filters

HTML exposed by LibreOffice Writer does not fully comply to rules of valid and semantic HTML. Therefore, a separate filter had to be created to normalize this content. It is implemented in the [Paste from LibreOffice](https://ckeditor.com/cke4/addon/pastefromlibreoffice) plugin.

## Paste from LibreOffice Demo

See the {@linksdk pastefromlibreoffice working "Pasting content from LibreOffice" sample} that showcases the Paste from LibreOffice plugin.

## Related Features

Refer to the following resources for more information about pasting content:

* The {@link features/pastefromword/README Pasting content from Microsoft Word} article contains more information about the Paste from Word feature.
* The {@link features/pastefromexcel/README Pasting content from Microsoft Excel} article contains more information about the Paste from Excel feature.
* The {@link features/pastefromgoogledocs/README Pasting content from Google Docs} article contains more information about the Paste from Google Docs feature.
* The {@link guide/dev/deep_dive/clipboard/README Clipboard Integration} article explains how Clipboard API is implemented in CKEditor.
* The {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} article describes drag&drop in CKEditor.
* The {@link guide/dev/acf/README Content Filtering (ACF)} is an introduction to CKEditor's unique content filtering system.
* The {@link features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
