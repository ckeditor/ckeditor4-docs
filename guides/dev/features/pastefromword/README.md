<!--
Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Paste from Word

The [Paste from Word](http://ckeditor.com/addon/pastefromword) plugin allows you to paste content from Microsoft Word and maintain original content formatting.
It also adds the Paste from Word toolbar button which makes it possible to paste clipboard data this way only on demand.

The following sample content from Word document:
{@img pastefromword_01.png}

will look like below after pasting to CKEditor with [Paste from Word](http://ckeditor.com/addon/pastefromword) plugin:
{@img pastefromword_02.png}

Here is another sample with more fancy content:
{@img pastefromword_03.png}

after pasting will look like:
{@img pastefromword_04.png}

In the above example you can see that, after pasting to CKEditor, first list has different list item markers than in the Word document.
As far as pasting lists with different list item markers is supported (check the second and third list in the above example) this is the specific case. Such list
style is not natively supported by the browser. However, it can be adjusted by using extra
CSS rules (see [related stackoverflow thread](http://stackoverflow.com/questions/4098195/can-ordered-list-produce-result-that-looks-like-1-1-1-2-1-3-instead-of-just-1) how to style this properly).

## Filters

HTML exposed by Microsoft Word does not comply to any imaginable rules. It is a poetry of what can be done wrong. Therefore, a separate filter had to be created to normalize this content. It is implemented in the [Paste from Word](http://ckeditor.com/addon/pastefromword) plugin and, beside the [standard filtering options](#!/guide/dev_drop_paste-section-filtering-content), it has additional settings:

* CKEDITOR.config.pasteFromWordCleanupFile
* CKEDITOR.config.pasteFromWordPromptCleanup

Starting from version 4.6 of CKEditor the following options were deprecated:

* CKEDITOR.config.pasteFromWordRemoveFontStyles (deprecated in favor of Advanced Content Filter)


For CKEditor versions older than 4.6 the following options were available, too:

* CKEDITOR.config.pasteFromWordNumberedHeadingToList
* CKEDITOR.config.pasteFromWordRemoveStyles

## Paste from Word Demo

See the following sample of pasting the content from Microsoft Word into the editor:

* The ["Paste from Word"](http://sdk.ckeditor.com/samples/pastefromword.html) sample.

## Further Reading

For more information on pasting and filters in CKEditor refer to the following articles:

* [Clipboard Integration](#!/guide/dev_clipboard)
* [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload)
* [Content Filtering (ACF)](#!/guide/dev_acf)
* [Advanced Content Filter](#!/guide/dev_advanced_content_filter)