<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dropping and Pasting into Editor Content

<p class="requirements">
	Some of these features were introduced in <strong>CKEditor 4.5</strong>. They are provided through the <a href="https://ckeditor.com/cke4/addon/clipboard">Clipboard</a>, <a href="https://ckeditor.com/cke4/addon/pastefromword">Paste from Word</a> and <a href="https://ckeditor.com/cke4/addon/uploadimage">Upload Image</a> plugins. Part of them are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

One of the CKEditor features is that it takes care over the input data you paste or drop into the editor. The [Clipboard](https://ckeditor.com/cke4/addon/clipboard) plugin which is included in every preset implements custom input content handling, which means that the editor will handle pasted and &mdash; since version 4.5 &mdash; dropped content.

All pasted and dropped content is passed through the {@link CKEDITOR.editor#paste} event which makes it easy to process it before it is inserted into the editor. This mechanism is used extensively by CKEditor features like [Advanced Content Filter and paste filter](#!/guide/dev_drop_paste-section-filtering), [Paste from Word filter](#!/guide/dev_paste_from_word) or [support for uploading dropped files](#!/guide/dev_drop_paste-section-file-upload).

Note that browsers support clipboard operations differently and because of that the behavior of the drag and drop or copy and paste may be slightly different between browsers.

To learn more about the clipboard support check the [Clipboard Integration](#!/guide/dev_clipboard) article.

## Filtering Content

The most important feature related to clipboard is being able to limit what data can be pasted and dropped into the editor. Without such filters the user would be able to paste any content copied from the Web or other applications like email clients, Microsoft Word, etc. which could effectively ruin the semantics and looks of the content created with the editor. Additionally, Chrome, Opera and Safari tend to fill the clipboard with HTML including tons of inline styles which not only looks terrible in the editor but could also be uneditable.

Therefore, all pasted and dropped content is filtered by [Advanced Content Filter](#!/guide/dev_advanced_content_filter) unless it was disabled.

Additionally, since CKEditor 4.5 it is possible to configure a [separate filter (called *paste filter*)](#!/guide/dev_advanced_content_filter-section-filtering-pasted-and-dropped-content) which will handle only pasted and dropped content. By default it is enabled in Chrome, Opera and Safari to clean up the messy HTML they create. The paste filter is configurable using the [allowed content rules](#!/guide/dev_allowed_content_rules) and it also has two presets &mdash; `'plain-text'` and `'semantic-content'`. The first of them replaces the CKEDITOR.config.forcePasteAsPlainText option, but thanks to the flexibility of the paste filter it is now also possible to achieve results like "only text with links":

	config.pasteFilter = 'p; a[!href]';

You can also read more about [content filtering](#!/guide/dev_acf) in general and see the [working "Content Filtering" sample](https://sdk.ckeditor.com/samples/acf.html).

## File Upload

Another feature related to the clipboard is uploading dropped or pasted files or images. It lets you not only drop or paste files into the document, but also paste a part of the image copied from the image editor. The [Upload Widget](https://ckeditor.com/cke4/addon/uploadwidget), [File Tools](https://ckeditor.com/cke4/addon/filetools) and [Notification](https://ckeditor.com/cke4/addon/notification) plugins create a flexible API which lets the developers handle files the way they need. To learn more about these APIs check the [Notifications](#!/guide/dev_notifications), [Clipboard Integration](#!/guide/dev_clipboard) and [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload) articles.

Note that this feature is limited because of browsers and operating systems limitations. File API is not supported in Internet Explorer 9 and below so dropped files cannot be handled. Support for pasting whole files and fragments of files (e.g. images) varies between browsers and operating systems.

<video width="550" height="391" controls>
	<source src="guides/dev_drop_paste/upload.mp4" type="video/mp4" />
</video>

## Dropping and Pasting Demos

See the following samples for examples of pasting and dropping into editor content:

* The ["Uploading Dropped and Pasted Images"](https://sdk.ckeditor.com/samples/fileupload.html#uploading-dropped-and-pasted-images) sample.
* The ["Drag and Drop Integration"](https://sdk.ckeditor.com/samples/draganddrop.html) sample.
* The ["Paste from Word"](https://sdk.ckeditor.com/samples/pastefromword.html) sample.

## Further Reading

For more information on pasting, dropping and uploading files with CKEditor refer to the following articles:

* [Clipboard Integration](#!/guide/dev_clipboard)
* [Uploading Dropped or Pasted Files](#!/guide/dev_file_upload)
* [Paste from Word](#!/guide/dev_paste_from_word)
* [Content Filtering (ACF)](#!/guide/dev_acf)
* [Advanced Content Filter](#!/guide/dev_advanced_content_filter)
