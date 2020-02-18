---
category: howtos
order: 140
url: guide/dev_howtos_pasting
menu-title: Pasting
meta-title-short: Pasting
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting

The following article contains tips about customizing the pasting behavior of CKEditor.


## How Do I Preserve Font Styles and Backgrounds When Pasting from Word?

The {@link features/pastefromword/README Paste from Word} feature lets you copy the content of Microsoft Word or Excel documents and paste them into the editor, preserving the structure and styles that were present in the original text.

Note, however, that by default some font styles are not preserved to avoid conflicting with the styles of the document created in CKEditor. If however, you want to use Word font styles, including font size, font family, and text or background color, set the {@linkapi CKEDITOR.config#pasteFromWordRemoveFontStyles CKEDITOR.config#pasteFromWordRemoveFontStyles} configuration value to `false`.

```js
config.pasteFromWordRemoveFontStyles = false;
```

Please note that since CKEditor 4.1 you need to add {@link guide/dev/acf/README Advanced Content Filter} into the equation, too. The content filtering mechanism makes sure that the data that enters the editor is supported by the editor features that are enabled in your configuration (to simplify it: if there is no font or text and background color button in your toolbar, this formatting will be stripped from your Word-formatted text). ACF is a highly flexible tool, though, so you can {@linksdk acf easily adjust it to your needs}.

## Is Pasting from Google Docs Supported?

CKEditor 4.13 introduced a new feature, {@link features/pastefromgoogledocs/README Paste from Google Docs}. To enable this feature, you need to {@link guide/dev/plugins/README add the Paste from Google Docs plugin to your editor build}. By default, the plugin is also available in Standard and Full distributions.

## Is Pasting from LibreOffice Writer Supported?

CKEditor 4.14 introduced a new feature, {@link features/pastefromlibreoffice/README Paste from LibreOffice}. To enable this feature, you need to {@link guide/dev/plugins/README add the Paste from LibreOffice plugin to your editor build}. By default, the plugin is also available in Standard and Full distributions.
