<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Dialog Windows

The following article contains tips about customizing the editor dialog windows.


## How Do I Change the Content of a CKEditor Dialog Window?

CKEditor allows you to customize dialog windows without changing the original editor code. For an example on how to add or remove dialog window tabs and fields refer to the old "Using the JavaScript API to customize dialog windows" [sample](http://nightly.ckeditor.com/standard/samples/old/dialog/dialog.html) and its [source code](https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/dialog/samples/dialog.html). Please note this sample is just an example which is not maintained anymore.

## How Do I Set a Default Value for a CKEditor Dialog Window Field?

In order to assign a default value to a dialog window field, use the `'default'` parameter in the dialog window [UI element definition](#!/api/CKEDITOR.dialog.definition.uiElement).

	elements: [
		{
			type: 'text',
			id: 'myCustomField',
			label: 'My Custom Field',
			'default': 'Default custom field value.'
		},
		{
			type: 'checkbox',
			id: 'myCheckbox',
			label: 'This checkbox is selected by default.',
			'default': true
		}
	]

The code above creates the following UI elements in a sample dialog window tab.

{@img dialog_01.png Sample dialog window tab containing two fields with default values}

You can also customize existing dialog windows and give them default values. The following code sets the default **URL** field value for the [Link](https://ckeditor.com/cke4/addon/link) dialog window.

	CKEDITOR.on( 'dialogDefinition', function( ev ) {
		// Take the dialog name and its definition from the event data.
		var dialogName = ev.data.name;
		var dialogDefinition = ev.data.definition;

		// Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
		if ( dialogName == 'link' ) {
			// Get a reference to the "Link Info" tab.
			var infoTab = dialogDefinition.getContents( 'info' );

			// Set the default value for the URL field.
			var urlField = infoTab.get( 'url' );
			urlField[ 'default' ] = 'www.example.com';
		}
	});

After this customization the **Link** dialog window will contain the `www.example.com` default value in the **URL** field.

{@img dialog_02.png Link dialog window with a default value for the URL field}

For more examples on setting a default field value refer to the old "Using the JavaScript API to customize dialog windows" [sample](http://nightly.ckeditor.com/standard/samples/old/dialog/dialog.html) and its [source code](https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/dialog/samples/dialog.html). Please note this sample is just an example which is not maintained anymore.

<p class="tip">
	Since in some old browsers <code>default</code> is a reserved word in JavaScript, remember to always put it in quotes when used in your code (<code>'default'</code>).
</p>


## How Do I Set a Specific Dialog Window Tab to Open by Default?

If you want to change your CKEditor configuration to show a different tab on opening a dialog window, you can hook into the {@link CKEDITOR.dialog.definition#onShow onShow} event of the dialog window.

Firstly, you will need to know the names of the dialog window and the tab that you want to set as default, so use the [Developer Tools](#!/guide/dev_howtos_dialog_windows-section-how-do-i-learn-the-names-of-ckeditor-dialog-window-fields%3F) plugin to get these.

Once you have the names you can add the following code into the page that contains your CKEditor instance. The example below sets the [Image Properties](https://ckeditor.com/cke4/addon/image) dialog window to open the **Link** tab by default.

	CKEDITOR.on('dialogDefinition', function( ev ) {
		// Take the dialog window name and its definition from the event data.
		var dialogName = ev.data.name;
		var dialogDefinition = ev.data.definition;

		if ( dialogName == 'image' ) {
			dialogDefinition.onShow = function() {
				// This code will open the Link tab.
				this.selectPage( 'Link' );
			};
		}
	});

If, for example, you want to open the **Upload** tab first to make it more convenient for your users to use the ([existing and previously integrated](#!/guide/dev_howtos_file_upload)) file uploader, change the code in the following way:

	// This code will open the Upload tab.
	this.selectPage( 'Upload' );


## How Do I Learn the Names of CKEditor Dialog Window Fields?

If you want to customize a dialog window, the easiest and most convenient way is to enable the [Developer Tools](#!/guide/dev_devtools) plugin that displays the names and IDs of all dialog window elements when you hover them with your mouse. You can see the plugin demo in [CKEditor SDK](https://sdk.ckeditor.com/samples/devtools.html).

The following figure shows the tooltip that describes the **URL** field of the **Link** dialog window that is displayed after the **Developer Tools** plugin was enabled.

<img src="guides/dev_devtools/devtools_01.png" alt="Element information displayed with the Developer Tools plugin in CKEditor">


## How Do I Remove the Ability to Resize All CKEditor Dialog Windows?

CKEditor dialog windows can be resized by using the resizing grip located in the bottom right-hand corner of a dialog window (for RTL languages — in the bottom left-hand corner).

{@img captionedimage_03.png The resizing grip of a CKEditor dialog window}

You can disable the resizing feature completely by setting the {@link CKEDITOR.dialog.definition#resizable resizable} parameter to  CKEDITOR#DIALOG_RESIZE_NONE.

	CKEDITOR.on( 'dialogDefinition', function( ev ) {
		ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
	});

Use the CKEDITOR#DIALOG_RESIZE_WIDTH and CKEDITOR#DIALOG_RESIZE_HEIGHT values to enable resizing of a dialog window in one dimension only.


## How Do I Remove the Ability to Resize Specific CKEditor Dialog Windows?

If you want to leave the resizing feature for some of the dialog windows and turn it off for others, you may define the value of the {@link CKEDITOR.dialog.definition#resizable resizable} parameter for each dialog window separately, like in the example below.

	CKEDITOR.on( 'dialogDefinition', function( ev ) {
		if ( ev.data.name == 'link' )
			ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
		else if ( ev.data.name == 'image' )
			ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_HEIGHT;
	});

Use the CKEDITOR#DIALOG_RESIZE_WIDTH and CKEDITOR#DIALOG_RESIZE_HEIGHT values to enable resizing of a dialog window in one dimension only.
