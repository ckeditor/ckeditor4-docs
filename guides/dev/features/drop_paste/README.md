<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dropping and Pasting

<p class="requirements">
	Part of these features was introduced in <strong>CKEditor 4.5</strong>. They are provided through <a href="http://ckeditor.com/addon/clipboard">Clipboard</a>, <a href="http://ckeditor.com/addon/pastefromword">Paste from Word</a> and <a href="http://ckeditor.com/addon/uploadimage">Upload Image</a> plugins. Part of them are not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and may<a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

One of the CKEditor features is that it takes care over the input data you paste or drop into the editor. Including [Clipboard plugin](http://ckeditor.com/addon/clipboard) you will turn on custom input content handling, what means that editor will handle paste and, since version 4.5, dropped content. Thanks to single input event ({@link CKEDITOR.editor#paste}) which is fired every time paste or drop occurred it is also very simple to add custom data filtering. Having custom drop and paste handling we were able to implement features like filtering out unwanted data, special paste form word filter or uploading dropped files.

Note that browsers support clipboard differently and because of that the behavior of the drag and drop or copy and paste may be slightly different on different browsers.

To learn more about clipboard support check the [clipboard](#!/guide/dev_clipboard) guides.

**TODO:** Link to drag&drop sample in the SDK

## Filtering

**TODO:** ACF & pasteFilter very short introduction

**TODO:** add links

**TODO:** video: paste HTML content to the editor (filtering input data on paste), drag this data to the nested editable (filtering internal data on drag and drop).

## Paste from MS Word

**TODO:** needed plugin

**TODO:** short description

**TODO:** configuration options

**TODO:** video: pasting from Word

## File Upload

Another feature related to the clipboard is uploading dropped or pasted files or images. It let you not only drop or paste files into the document, but also paste part of the image from the image processor. [Upload Widget](http://ckeditor.com/addon/uploadwidget), [File Tools](http://ckeditor.com/addon/filetools) and [Notification](http://ckeditor.com/addon/notification) plugins create flexible API which let developer handle files the way they need. To learn more about these APIs check [notification](#!/guide/dev_notifications), [files](#!/guide/dev_files) and [clipboard](#!/guide/dev_clipboard) guides.

Note that this feature is limited because of browsers and operation systems limitations. File API is not supported on Internet Explorer 9 and below so dropped files can not be handled. Another limitation is that only Firefox let user paste files into the editor at the moment of writing this guide. On the others browsers only drop is supported.

**TODO:** Link to upload sample in the SDK

<video width="550" height="391" controls>
  <source src="guides/dev_drop_paste/upload.mp4" type="video/mp4">
</video>