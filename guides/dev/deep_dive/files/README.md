<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Files Handling


## Upload Widget

This function creates an upload widget &mdash; a placeholder to show the progress of an upload. The upload widget is based on its {@link CKEDITOR.fileTools.uploadWidgetDefinition definition}. The `addUploadWidget` method also creates a `paste` event, if the {@link CKEDITOR.fileTools.uploadWidgetDefinition#fileToElement fileToElement} method is defined. This event helps in handling pasted files, as it will automatically check if the files were pasted and mark them to be uploaded.

The upload widget helps to handle content that is uploaded asynchronously inside the editor. It solves issues such as: editing during upload, undo manager integration, getting data, removing or copying uploaded element.

To create an upload widget you need to define two transformation methods:

The {@link CKEDITOR.fileTools.uploadWidgetDefinition#fileToElement fileToElement} method which will be called on `paste` and transform a file into a placeholder. * The {@link CKEDITOR.fileTools.uploadWidgetDefinition#onUploaded onUploaded} method with the {@link CKEDITOR.fileTools.uploadWidgetDefinition#replaceWith replaceWith} method which will be called to replace the upload placeholder with the final HTML when the upload is done. If you want to show more information about the progress you can also define the {@link CKEDITOR.fileTools.uploadWidgetDefinition#onLoading onLoading} and {@link CKEDITOR.fileTools.uploadWidgetDefinition#onUploading onUploading} methods.

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

If you need custom `paste` handling you need to mark the pasted element to be changed into an upload widget using {@link CKEDITOR.fileTools#markElement markElement}. For example, instead of the `fileToElement` helper from the example above, a `paste` listener can be created manually:

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

## FileLoader