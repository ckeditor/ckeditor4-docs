<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Pasting


## How Do I Preserve Font Styles and Backgrounds When Pasting from Word?

The **Paste from Word** feature lets you copy the contents of Microsoft Word or Excel documents and paste them into the editor, preserving the structure and styles that were present in the original text.

Note, however, that by default some font styles are not preserved to avoid conflicting with the styles of the document created in CKEditor. If however, you want to use Word font styles, including font size, font family, and font foreground/background color, set the {@link CKEDITOR.config#pasteFromWordRemoveFontStyles pasteFromWordRemoveFontStyles} configuration value to `false`.

	config.pasteFromWordRemoveFontStyles = false;