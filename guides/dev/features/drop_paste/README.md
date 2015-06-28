<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dropping and Pasting

<p class="requirements">
	Part of these features was introduced in <strong>CKEditor 4.5</strong>. They are provided through the <a href="http://ckeditor.com/addon/clipboard">Clipboard</a>, <a href="http://ckeditor.com/addon/pastefromword">Paste from Word</a> and <a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugins. Part of them are not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

One of the CKEditor features is that it takes care over the input data you paste or drop into the editor. The [clipboard](http://ckeditor.com/addon/clipboard) plugin which is included in every preset implements a custom input content handling, what means that the editor will handle pasted and, since version 4.5, dropped content.

All pasted and dropped content is passed through the {@link CKEDITOR.editor#paste} event what makes it easy to process it before it is inserted into the editor. This mechanism is used extensively by CKEditor features like [Advanced Content Filter and paste filter](#!/guide/dev_drop_paste-section-filtering), [Paste From Word filter](#!/guide/dev_drop_paste-section-paste-from-word) or [support for uploading dropped files](#!/guide/dev_drop_paste-section-file-upload).

Note that browsers support clipboard operations differently and because of that the behavior of the drag and drop or copy and paste may be slightly different in different browsers.

To learn more about the clipboard support check the [clipboard](#!/guide/dev_clipboard) guides.

## Filtering

The most important feature related to clipboard is being able to limit what data can be pasted and dropped into the editor. Without such filters a user would be able to paste any content copied from the Web or other applications like email clients, MS Word, etc. what could effectively ruin semantics and looks of the content created with the editor. Additionally, Chrome, Opera and Safari tend to fill the clipboard with HTML including tones of inline styles which not only looks terrible in the editor but could also be not editable.

Therefore, all pasted and dropped content is filtered by the [Advanced Content Filter](#!/guide/dev_advanced_content_filter) unless it was disabled.

Additionally, since CKEditor 4.5 it is possible to configure a [separate filter (called *paste filter*)](#!/guide/dev_advanced_content_filter-section-filtering-pasted-and-dropped-content) which will handle only pasted and dropped content. It is by default enabled on Chrome, Opera and Safari to clean up the messy HTML they create. The paste filter is configurable using the [allowed content rules](#!/guide/dev_allowed_content_rules) and it also has two presets &ndash; `'plain-text'` and `'semantic-content'`. First of them replaces the {@link CKEDITOR.config#forcePasteAsPlainText} option, but thanks to the flexibility of the paste filter it is now also possible to achieve results like "only text with links":

	config.pasteFilter = 'p; a[!href]';

You can also read more about [content filtering](#!/guide/dev_acf) in general and see the [working "Content Filtering" sample](http://sdk.ckeditor.com/samples/acf.html).

## Paste from Word

HTML exposed by Microsoft Word does not comply to any imaginable rules. It is a poetry of what can be done wrong. Therefore, a separate filter must have been created to normalize this content. It is implemented in the <a href="http://ckeditor.com/addon/pastefromword">Paste from Word</a> and, beside the standard filtering options described in the previous sections, it has additional settings:

* {@link CKEDITOR.config#pasteFromWordRemoveFontStyles},
* {@link CKEDITOR.config#pasteFromWordRemoveStyles},

as well as three other options:

* {@link CKEDITOR.config#pasteFromWordNumberedHeadingToList},
* {@link CKEDITOR.config#pasteFromWordCleanupFile},
* {@link CKEDITOR.config#pasteFromWordPromptCleanup}.

## File Upload

Another feature related to the clipboard is uploading dropped or pasted files or images. It lets you not only drop or paste files into the document, but also paste part of the image from the image processor. [Upload Widget](http://ckeditor.com/addon/uploadwidget), [File Tools](http://ckeditor.com/addon/filetools) and [Notification](http://ckeditor.com/addon/notification) plugins create a flexible API which let developer handle files the way they need. To learn more about these APIs check [notification](#!/guide/dev_notifications), [files](#!/guide/dev_files) and [clipboard](#!/guide/dev_clipboard) guides.

Note that this feature is limited because of browsers and operating systems limitations. File API is not supported in Internet Explorer 9 and below so dropped files can not be handled. Support for pasting whole files and fragments of files (e.g. images) varies between browsers and operating systems.

See the [working "Uploading Dropped and Pasted Images" sample](http://sdk.ckeditor.com/samples/fileupload.html#uploading-dropped-and-pasted-images).

Read more about [enabling support for uploading dropped and pasted files](#!/guide/dev_file_upload).

<video width="550" height="391" controls>
	<source src="guides/dev_drop_paste/upload.mp4" type="video/mp4" />
</video>