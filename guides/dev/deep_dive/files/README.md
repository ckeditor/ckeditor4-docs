<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Files Handling

Since 4.5 version CKEditor provide a set of helpers to handle files: [Upload Widget plugin](http://ckeditor.com/addon/upload widget) and [Files Tools plugin](http://ckeditor.com/addon/filetools). These tools were designed to help developers create plugins which will read and upload dropped and pasted files. They solve some problems related to files and uploading, handle asynchronous editor update, create facade for browsers inconsistency. They also create the [common servers API](#!/guide/dev_file_upload) and use [notifications](#!/guide/dev_notifications) the same way, so new plugins based on these tools will have the same interface for both user and server.

Note that because [File API](http://www.w3.org/TR/FileAPI/) is supported since Internet Explorer 10 these feature will not work on older versions of this browser.

## Upload Widget

The most useful and powerful tool is the {@link CKEDITOR.fileTools#addUploadWidget Upload Widget}. It is the top level helper based the other {@link CKEDITOR.fileTools file tools} which let you create plugins which will support dropped and pasted file as simple as it is possible. {@link CKEDITOR.fileTools#addUploadWidget Upload Widget} let you focus on the content you want to insert into the CKEditor. It solves issues such as: editing during asynchronous upload, undo manager integration, getting data, removing or copying uploaded element.

Using it you can create upload widget similar to [Image upload widget](http://ckeditor.com/addon/uploadimage) which will handle files the way you want. You can for example create widget which will upload file and create a link to that file or upload a PDF and create a miniature with such link, or read the content of the file and insert it into the editor.

This function creates an upload widget &mdash; a placeholder to show the progress of an upload. The upload widget is based on its {@link CKEDITOR.fileTools.uploadWidgetDefinition definition}. The {@link CKEDITOR.fileTools#addUploadWidget} method also creates a {@link CKEDITOR.editor#paste paste} event, if the {@link CKEDITOR.fileTools.uploadWidgetDefinition#fileToElement fileToElement} method is defined. This event helps in handling pasted files, as it will automatically check if the files were pasted and mark them to be uploaded.

To create an upload widget you need to define two transformation methods:

The {@link CKEDITOR.fileTools.uploadWidgetDefinition#fileToElement fileToElement} method which will be called on `paste` and transform a file into a placeholder. The {@link CKEDITOR.fileTools.uploadWidgetDefinition#onUploaded onUploaded} method with the {@link CKEDITOR.fileTools.uploadWidgetDefinition#replaceWith replaceWith} method which will be called to replace the upload placeholder with the final HTML when the upload is done. If you want to show more information about the progress you can also define the {@link CKEDITOR.fileTools.uploadWidgetDefinition#onLoading onLoading} and {@link CKEDITOR.fileTools.uploadWidgetDefinition#onUploading onUploading} methods.

The simplest uploading widget which uploads a file and creates a link to it may look like this:

		CKEDITOR.fileTools.addUploadWidget( editor, 'uploadfile', {
			uploadUrl: CKEDITOR.fileTools.getUploadUrl( editor.config ),

			fileToElement: function( file ) {
				var a = new CKEDITOR.dom.element( 'a' );
				a.setText( file.name );
				a.setAttribute( 'href', '#' );
				return a;
			},

			onUploaded: function( upload ) {
				this.replaceWith( '<a href="' + upload.url + '" target="_blank">' + upload.fileName + '</a>' );
			}
		} );

The upload widget uses {@link CKEDITOR.fileTools.fileLoader} as a helper to upload the file. A {@link CKEDITOR.fileTools.fileLoader} instance is created when the file is pasted and a proper method is called &mdash; by default it is the {@link CKEDITOR.fileTools.fileLoader#loadAndUpload} method. If you want to only use the `load` or `upload`, you can use the {@link CKEDITOR.fileTools.uploadWidgetDefinition#loadMethod loadMethod} property.

Note that if you want to handle a big file, e.g. a video, you may need to use `upload` instead of `loadAndUpload` because the file may be too big to load it to memory at once.

If you do not upload the file, you need to define {@link CKEDITOR.fileTools.uploadWidgetDefinition#onLoaded onLoaded} instead of {@link CKEDITOR.fileTools.uploadWidgetDefinition#onUploaded onUploaded}. For example, if you want to read the content of the file:

		CKEDITOR.fileTools.addUploadWidget( editor, 'fileReader', {
			loadMethod: 'load',
			supportedTypes: /text\/(plain|html)/,

			fileToElement: function( file ) {
				var el = new CKEDITOR.dom.element( 'span' );
				el.setText( '...' );
				return el;
			},

			onLoaded: function( loader ) {
				this.replaceWith( atob( loader.data.split( ',' )[ 1 ] ) );
			}
		} );

## Files in the paste event

{@link CKEDITOR.plugins.clipboard.dataTransfer} object, described in the [clipboard guide](#!/guide/dev_clipboard), is also useful if you want to get pasted or dropped files. You do not need to care if the file was dropped or pasted or if and how browser support pasting or dropping files. {@link CKEDITOR.plugins.clipboard.dataTransfer} facade will hide differences and let you get pasted or dropped files using {@link CKEDITOR.plugins.clipboard.dataTransfer#getFilesCount} and {@link CKEDITOR.plugins.clipboard.dataTransfer#getFile} if the file is available.

If you need custom `paste` handling for dropped or pasted files instead of the one provided by upload widget you need to mark the pasted element to be changed into an upload widget using {@link CKEDITOR.fileTools#markElement markElement}. For example, instead of the `fileToElement` helper from the example above, a `paste` listener can be created manually:

		editor.on( 'paste', function( evt ) {
			var file, i, el, loader;

			for ( i = 0; i < evt.data.dataTransfer.getFilesCount(); i++ ) {
				file = evt.data.dataTransfer.getFile( i );

				if ( CKEDITOR.fileTools.isTypeSupported( file, /text\/(plain|html)/ ) ) {
					el = new CKEDITOR.dom.element( 'span' ),
					loader = editor.uploadRepository.create( file );

					el.setText( '...' );

					loader.load();

					CKEDITOR.fileTools.markElement( el, 'filereader', loader.id );

					evt.data.dataValue += el.getOuterHtml();
				}
			}
		} );

## Binding Notifications

Note that you can bind notifications to the upload widget on paste using the {@link CKEDITOR.fileTools#bindNotifications} method, so notifications will automatically show the progress of the upload. Because this method shows notifications about upload, do not use it if you only {@link CKEDITOR.fileTools.fileLoader#load load} (and not upload) a file.

		editor.on( 'paste', function( evt ) {
			var file, i, el, loader;

			for ( i = 0; i < evt.data.dataTransfer.getFilesCount(); i++ ) {
				file = evt.data.dataTransfer.getFile( i );

				if ( CKEDITOR.fileTools.isTypeSupported( file, /text\/pdf/ ) ) {
					el = new CKEDITOR.dom.element( 'span' ),
					loader = editor.uploadRepository.create( file );

					el.setText( '...' );

					loader.upload();

					CKEDITOR.fileTools.markElement( el, 'pdfuploader', loader.id );

					CKEDITOR.fileTools.bindNotifications( editor, loader );

					evt.data.dataValue += el.getOuterHtml();
				}
			}
		} );

## Lower level tools

Beside {@link CKEDITOR.fileTools#markElement markElement} and {@link CKEDITOR.fileTools#bindNotifications} CKEditor brings some more function which can be called a lower level API. You can use them for example to upload files in dialog. Most useful are described below.

### fileLoader

{@link CKEDITOR.fileTools.fileLoader} is facade for both `XMLHttpRequest` and `FileReader` which use CKEditor {@link CKEDITOR.event events}. {@link CKEDITOR.fileTools.fileLoader fileLoader} is also the base for the Upload Widget and [fire request and response events](#!/guide/dev_file_upload) so is recommended to use for file uploads instead of native `XMLHttpRequest`.

To learn more see {@link CKEDITOR.fileTools.fileLoader} API description.

### getUploadUrl

Because the user may use [various configuration options](#!/guide/dev_file_upload) to set the upload URL the {@link CKEDITOR.fileTools#getUploadUrl} is the proper way to get right value.

### uploadRepository

The {@link CKEDITOR.fileTools.uploadRepository} is the collection of all {@link CKEDITOR.fileTools.fileLoader fileLoaders}. An instance of the repository is available as the {@link CKEDITOR.editor#uploadRepository}.