---
category: inserting-content
order: 200
url: guide/dev_drop_paste
menu-title: Dropping and Pasting
meta-title-short: Dropping and Pasting
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dropping and Pasting into Editor Content

<info-box info=""> Some of these features were introduced in <strong>CKEditor 4.5</strong>. They are provided through the <a href="https://ckeditor.com/cke4/addon/clipboard">Clipboard</a>, <a href="https://ckeditor.com/cke4/addon/pastefromword">Paste from Word</a> and <a href="https://ckeditor.com/cke4/addon/uploadimage">Upload Image</a> plugins. Part of them are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and may {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

One of the CKEditor features is that it takes care over the input data you paste or drop into the editor. The [Clipboard](https://ckeditor.com/cke4/addon/clipboard) plugin which is included in every preset implements custom input content handling, which means that the editor will handle pasted and &mdash; since version 4.5 &mdash; dropped content.

All pasted and dropped content is passed through the {@linkapi CKEDITOR.editor#paste } event which makes it easy to process it before it is inserted into the editor. This mechanism is used extensively by CKEditor features like {@link guide/dev/features/drop_paste/README#filtering Advanced Content Filter and paste filter}, {@link guide/dev/features/pastefromword/README Paste from Word filter} or {@link guide/dev/features/drop_paste/README#file-upload support for uploading dropped files}.

Note that browsers support clipboard operations differently and because of that the behavior of the drag and drop or copy and paste may be slightly different between browsers.

To learn more about the clipboard support check the {@link guide/dev/deep_dive/clipboard/README Clipboard Integration} article.

## Filtering Content

The most important feature related to clipboard is being able to limit what data can be pasted and dropped into the editor. Without such filters the user would be able to paste any content copied from the Web or other applications like email clients, Microsoft Word, etc. which could effectively ruin the semantics and looks of the content created with the editor. Additionally, Chrome, Opera and Safari tend to fill the clipboard with HTML including tons of inline styles which not only looks terrible in the editor but could also be uneditable.

Therefore, all pasted and dropped content is filtered by {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filter} unless it was disabled.

Additionally, since CKEditor 4.5 it is possible to configure a {@link guide/dev/deep_dive/advanced_content_filter/README#filtering-pasted-and-dropped-content separate filter (called *paste filter*)} which will handle only pasted and dropped content. By default it is enabled in Chrome, Opera and Safari to clean up the messy HTML they create. The paste filter is configurable using the {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README allowed content rules} and it also has two presets &mdash; `'plain-text'` and `'semantic-content'`. The first of them replaces the {@linkapi CKEDITOR.config.forcePasteAsPlainText CKEDITOR.config.forcePasteAsPlainText} option, but thanks to the flexibility of the paste filter it is now also possible to achieve results like "only text with links":

	config.pasteFilter = 'p; a[!href]';

You can also read more about {@link guide/dev/acf/README content filtering} in general and see the {@linksdk acf working "Content Filtering" sample}.

## File Upload

Another feature related to the clipboard is uploading dropped or pasted files or images. It lets you not only drop or paste files into the document, but also paste a part of the image copied from the image editor. The [Upload Widget](https://ckeditor.com/cke4/addon/uploadwidget), [File Tools](https://ckeditor.com/cke4/addon/filetools) and [Notification](https://ckeditor.com/cke4/addon/notification) plugins create a flexible API which lets the developers handle files the way they need. To learn more about these APIs check the {@link guide/dev/features/notifications/README Notifications}, {@link guide/dev/deep_dive/clipboard/README Clipboard Integration} and {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files} articles.

Note that this feature is limited because of browsers and operating systems limitations. File API is not supported in Internet Explorer 9 and below so dropped files cannot be handled. Support for pasting whole files and fragments of files (e.g. images) varies between browsers and operating systems.

<video width="550" height="391" controls>
	<source src="%BASE_PATH%/assets//upload.mp4" type="video/mp4"/>
</video>

## Dropping and Pasting Demos

See the following samples for examples of pasting and dropping into editor content:

* The {@linksdk fileupload#uploading-dropped-and-pasted-images "Uploading Dropped and Pasted Images"} sample.
* The {@linksdk draganddrop "Drag and Drop Integration"} sample.
* The {@linksdk pastefromword "Paste from Word"} sample.

## Further Reading

For more information on pasting, dropping and uploading files with CKEditor refer to the following articles:

* {@link guide/dev/deep_dive/clipboard/README Clipboard Integration}
* {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Dropped or Pasted Files}
* {@link guide/dev/features/pastefromword/README Paste from Word}
* {@link guide/dev/acf/README Content Filtering (ACF)}
* {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filter}
