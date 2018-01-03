<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting Content from Microsoft Word

<p class="requirements">
    This feature is provided through the <a href="https://ckeditor.com/cke4/addon/pastefromword">Paste from Word</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also <a href="#!/guide/dev_plugins">add it to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin allows you to paste content from Microsoft Word and maintain original content structure and formatting.

When enabled, it automatically detects Word content and transforms its structure and formatting to clean HTML. It also adds the **Paste from Word** toolbar button (<img src="guides/dev_pastefromword/pastefromword-button.png" alt="Paste from Word toolbar button" style="vertical-align: bottom;">) which makes it possible to paste clipboard data this way only on demand.

## Supported Features

Paste from Word retains the following formatting:

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
* Paste from Excel
    * Cell formatting (size, background, borders, special characters)
    * Row and column size
    * Text formatting (as listed above)
* Advanced formatting
    * Default styles
    * User-defined styles

Paste from Word maintains most of Microsoft Word text formatting features with some exceptions related to advanced styling, customizations, or stylings that are not supported by HTML, e.g. it will paste only standard bullets from the bullet library, or will not use a double strikethrough effect. Such elements are replaced by the default ones to resemble your Word content in the most accurate way.

## Advanced Paste from Word &mdash; CKEditor 4.6+

Pasting from Word is, in general, as tricky as it can get. With plenty of possible combinations of Microsoft Word, operating system and browser versions Word output that comes through clipboard to CKEditor can significantly differ. This makes it extremely hard to support some of the more complicated content formatting cases that include text, images, lists, tables, nested objects, plenty of colors, styles and so on.

CKEditor has always been a market leader in parsing Word content and transforming it to valid HTML, but handling some of the more complex cases and working around vendor bugs takes a lot of time, effort and experience. With some new tools available, such as [Advanced Content Filter](#!/guide/dev_acf) or [Clipboard API](#!/guide/dev_drop_paste), we have decided to rewrite the Paste from Word feature from scratch.

Here are some areas where the new, Advanced Paste from Word really shines:

* Preservation of list numbering, styling and indentation (for example, nested lists with multiple levels, with different styling or custom list markers).
* Document structure parsing that fixes plenty of issues with distorted or missing content after paste.
* Smarter inline formatting, including preserving text or background color.
* Handling hotlinked images.
* Tight integration with Advanced Content Filter to efficiently adjust formatting coming from Word to what is allowed in a particular editor configuration.
* Clean and valid HTML markup.

**Note:** Some Paste from Word configuration options were either dropped in CKEditor 4.6 or changed their default values. Please refer to the [release notes](https://ckeditor.com/cke4/release/CKEditor-4.6.0) for more details.

## Sample

The following sample content from a Microsoft Word document:

{@img pastefromword_01.png Sample Word document}

will look like below after pasting to CKEditor with the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin enabled:

{@img pastefromword_02.png Word content pasted into CKEditor}

Here is another sample with more fancy content:

{@img pastefromword_03.png}

It will look like this after pasting into CKEditor:

{@img pastefromword_04.png}

In the example above you can see that after pasting into CKEditor, the first list has different list item markers than in the Word document.
As far as pasting lists with different markers is supported (check the second and third list in the example above) this is a specific case. Such list
style is not natively supported by the browser. However, it can be adjusted by using extra
CSS rules (see a [related StackOverflow thread](http://stackoverflow.com/questions/4098195/can-ordered-list-produce-result-that-looks-like-1-1-1-2-1-3-instead-of-just-1) how to style it properly).

## Filters

HTML exposed by Microsoft Word does not comply to any imaginable rules. It is a poetry of what can be done wrong. Therefore, a separate filter had to be created to normalize this content. It is implemented in the [Paste from Word](https://ckeditor.com/cke4/addon/pastefromword) plugin and, beside the [standard filtering options](#!/guide/dev_drop_paste-section-filtering-content), it has additional settings:

* CKEDITOR.config.pasteFromWordCleanupFile
* CKEDITOR.config.pasteFromWordPromptCleanup

Starting from version 4.6 of CKEditor the following options were deprecated:

* CKEDITOR.config.pasteFromWordRemoveFontStyles (deprecated in favor of Advanced Content Filter)

For CKEditor versions older than 4.6 the following options were available, too:

* CKEDITOR.config.pasteFromWordNumberedHeadingToList
* CKEDITOR.config.pasteFromWordRemoveStyles

## Paste from Word Demo

See the [working "Pasting content from Microsoft Word" sample](https://sdk.ckeditor.com/samples/pastefromword.html) that showcases the Paste from Word plugin.

## Related Features

Refer to the following resources for more information about pasting content:

* The [Pasting content from Microsoft Excel](#!/guide/dev_pastefromexcel) article contains more information about the Paste from Excel feature.
* The [Clipboard Integration](#!/guide/dev_clipboard) article explains how Clipboard API is implemented in CKEditor.
* The [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) article describes drag&drop in CKEditor.
* The [Content Filtering (ACF)](#!/guide/dev_acf) is an introduction to CKEditor's unique content filtering system.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.