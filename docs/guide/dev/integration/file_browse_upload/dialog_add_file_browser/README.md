---
category: file-manager
order: 100
url: guide/dev_dialog_add_file_browser
menu-title: Integrating with Dialogs
meta-title-short: Integrating with Dialogs
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Adding File Manager to a Dialog Window

The aim of this article is to explain to plugin authors how to create CKEditor 4 dialog windows that integrate seamlessly with a file manager.

<info-box info="">
	CKEditor 4 can be easily integrated with an external file manager (file browser/uploader) thanks to the <a href="https://ckeditor.com/cke4/addon/filebrowser">File Browser</a> plugin which by default is included in every preset.
</info-box>

To connect a file browser/uploader that is already compatible with CKEditor 4, refer to the {@link guide/dev/integration/file_browse_upload/README File Manager Integration} article. If you want to integrate with [CKFinder](http://cksource.com/ckfinder/),
check the {@link guide/dev/integration/file_browse_upload/ckfinder_integration/README CKFinder Integration} article.

## Dialog Windows

Please refer to the CKEditor 4 {@linkapi CKEDITOR.dialog.definition dialog definition API} for general information on how to create a dialog window.

## The File Browser Plugin

The [File Browser](https://ckeditor.com/cke4/addon/filebrowser) plugin is built-in into CKEditor 4. Its only purpose is to provide an API inside CKEditor 4 to easily integrate any external file manager and to add file browser/uploader features to various CKEditor 4 components (usually to dialog windows).

### Adding the "Browse Server" Button

To assign the File Browser plugin to an element inside a dialog window, set the `filebrowser` property. For example in the [Image plugin dialog window source](https://github.com/ckeditor/ckeditor4/blob/master/plugins/image/dialogs/image.js) you can find the following code:

```js
{
	type: 'button',
	id: 'browse',
	// ...
	label: editor.lang.common.browseServer,
	hidden: true,
	filebrowser: 'info:txtUrl'
},
```

This button will be hidden by default (`hidden:true`). The File Browser plugin looks for all elements with the `filebrowser` attribute and unveils them if an appropriate configuration setting is available ({@link guide/dev/integration/file_browse_upload/README#basic-configuration `filebrowserBrowseUrl`/`filebrowserUploadUrl`}).

The action performed by the plugin depends on the element type. For {@linkapi CKEDITOR.dialog.definition.fileButton fileButton}
it is **QuickUpload**, for other elements the default action is **Browse**. In the example above, the file manager will be launched (in
a popup) when the button is clicked.

The `'info:txtUrl'` value instructs the plugin to update an element with the ID of `txtUrl` inside the `info` tab when {@linkapi CKEDITOR.tools.callFunction CKEDITOR.tools.callFunction} is called (see {@link guide/dev/integration/file_browse_upload/file_browser_api/README File Browser API - Creating a Custom File Manager}).

### Adding "Quick Upload" Support

Again, to see how file uploads can be handled in a dialog window, the following working example from CKEditor 4 will be used. In the [Image plugin dialog window source](https://github.com/ckeditor/ckeditor4/blob/master/plugins/image/dialogs/image.js) you can find the following definition of the `Upload` tab:

```js
{
	id: 'Upload',
	hidden: true,
	filebrowser: 'uploadButton',
	label: editor.lang.image.upload,
	elements: [ {
		type: 'file',
		id: 'upload',
		label: editor.lang.image.btnUpload,
		style: 'height:40px',
		size: 38
	},
	{
		type: 'fileButton',
		id: 'uploadButton',
		filebrowser: 'info:txtUrl',
		label: editor.lang.image.btnUpload,
		'for': [ 'Upload', 'upload' ]
	} ]
},
```

This example is slightly more complicated than the previous one, because:

* It contains the definition of the entire dialog window tab.
* Two elements ({@linkapi CKEDITOR.dialog.definition.file file} and {@linkapi CKEDITOR.dialog.definition.fileButton fileButton}) are needed to upload a file.

In the example above, the ID of the tab is `'Upload'`. The tab is hidden by default (`hidden:true`). As mentioned above, the File Browser plugin looks for all elements with the `filebrowser` attribute and unveils them if an appropriate configuration setting is available. In this case, the tab will be shown automatically if a `filebrowser` setting for `'uploadButton'` (because of `filebrowser:'uploadButton'`) will be available (`filebrowserUploadUrl`).

The `file` element is just an input element that will store the name of the file that will be uploaded.

The `fileButton` element is more interesting. The `'info:txtUrl'` value instructs the File Browser plugin to update an element with the ID of `txtUrl` inside the `info` tab when {@linkapi CKEDITOR.tools.callFunction CKEDITOR.tools.callFunction} is called (see {@link guide/dev/integration/file_browse_upload/file_browser_api/README File Browser API - Creating a Custom File Manager}).

The `'for': [ 'Upload', 'upload'   ]` line is used to connect `fileButton` with the `file` element. It is an instruction for CKEditor 4 to upload the file using the `'file'` element with the ID of `'upload'` (second value) inside the `'Upload'` tab (first value).

### Advanced Configuration - Browsing

It is possible to define your own function that will be called when a file is selected/uploaded.

```js
{
	type: 'button',
	hidden: true,
	id: 'id0',
	label: editor.lang.common.browseServer,
	filebrowser: {
		action: 'Browse',
		// target: 'tab1:id1',
		onSelect: function( fileUrl, data ) {
			alert( 'The selected file URL is "' + fileUrl + '"' );

			for ( var _info in data )
				alert( 'data[ "' + _info + '" ]' + ' = ' + data[ _info ] );

			var dialog = this.getDialog();
			dialog.getContentElement( 'tab1', 'id1' ).setValue( data[ 'fileUrl' ] );

			// Do not call the built-in onSelect command.
			return false;
		}
	}
}
```

In this example the action is set to `'Browse'` in order to call the file manager when the button is clicked. Setting `'target'` is not required, because the target element will be updated in the custom `onSelect` function.

As explained in the {@link guide/dev/integration/file_browse_upload/file_browser_api/README File Browser API documentation}, `CKEDITOR.tools.callFunction( funcNum, fileUrl, data );` is called when the user selected a file. The `fileUrl` and `data` arguments are passed to the custom `onSelect` function and can be used to update the target element.

### Advanced Configuration - Quick Uploads

In a similar way that a button can be configured to open the file manager, you can also configure the file button.

```js
{
	type: 'file',
	label: editor.lang.common.upload,
	labelLayout: 'vertical',
	id: 'id2'
},
{
	type: 'fileButton',
	label: editor.lang.common.uploadSubmit,
	id: 'id3',
	filebrowser: {
		action: 'QuickUpload',
		params: { type: 'Files', currentFolder: '/folder/' },
		target: 'tab1:id1',
		onSelect: function( fileUrl, errorMessage ) {
			alert( 'The url of uploaded file is: ' + fileUrl + '\nerrorMessage: ' + errorMessage );
			// Do not call the built-in onSelect command.
			// return false;
		}
	},
	'for': [ 'tab1', 'id2' ]
}
```

Additional arguments to be passed in the query string to the external file manager can be added in the `filebrowser.params` attribute.

`filebrowser.target` is the target element to be updated when the file is returned by the server connector (uploader) &mdash; you do not need it if you define your own `onSelect` function (`filebrowser.onSelect`) and update the target element in this function, just like it was done in the previous example.

## Further Reading

For more information on integrating CKEditor 4 with a file manager refer to the following articles:

* {@link guide/dev/integration/file_browse_upload/README File Manager Integration}
* {@link guide/dev/integration/file_browse_upload/file_manager_configuration/README Advanced File Manager Configuration}
* {@link guide/dev/integration/file_browse_upload/ckfinder_integration/README CKFinder Integration}
* {@link guide/dev/integration/file_browse_upload/file_browser_api/README File Browser API - Creating a Custom File Manager}
* {@link features/drop_paste/README Uploading Pasted and Dropped Files}

See also the {@link guide/plugin_sdk/intro/README CKEditor Plugin SDK} with tutorials on creating your own plugins with dialog windows.
