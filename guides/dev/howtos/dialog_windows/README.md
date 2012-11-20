# Dialog Windows


## How Do I Change the Contents of a CKEditor Dialog Window?

CKEditor allows you to customize [dialog windows](#!/guide/user_interace_dialog_windows) without changing the original editor code. For an example on how to add or remove dialog window tabs and fields refer to the **Using the JavaScript API to customize dialog windows** (`plugins/dialog/samples/dialog.html`) sample and its source code from your CKEditor installation.

**Note**: Some dialog window elements cannot be removed due to limitations of the current core editor code, but they can be hidden. Use the {@link CKEDITOR.dialog#method-hide hide} function to hide a dialog window and the {@link CKEDITOR.dialog#hidePage hidePage} function to hide a tab.


## How Do I Set a Default Value for a CKEditor Dialog Window Field?

In order to assign a default value to a dialog window field, use the 'default' parameter in the dialog window UI element definition.

	elements: [
		{
			type: 'text',
			id: 'myCustomField',
			label: 'My Custom Field',
			'default': 'Default Custom Field Value!'
		},
		{
			type: 'checkbox',
			id: 'myCheckbox',
			label: 'This checkbox is selected by default',
			'default': true
		}
	]

The code above creates the following UI elements in a sample dialog window tab.

{@img ../../images/dialog_custom_1.png Sample dialog window tab containing two field with default values}

You can also customize existing dialog windows and give them default values. The following code sets the default **URL** field value for the **Link** dialog window.

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

{@img ../../images/dialog_custom_2.png Link dialog window with a default value for the URL field}

For more examples on setting a default field value refer to the **Using the JavaScript API to customize dialog windows** (`plugins/dialog/samples/dialog.html`) sample and its source code from your CKEditor installation.

**Note**: Since in some old browsers `default` is a reserved word in JavaScript, remember to always put it in quotes when used in your code.


## How Do I Set a Specific Dialog Window Tab to Open by Default?

If you want to change your CKEditor configuration to show a different tab on opening a dialog window, you can hook into the {@link CKEDITOR.dialog.definition#onShow onShow} event of the dialog window.

Firstly, you will need to know the names of the dialog window and the tab that you want to set as default, so use the [Developer Tools](#!/guide/dev_howtos_dialog_windows-section-4) plugin to get these.

Once you have the names you can add the following code either in the `<script>` element inserted into the page that contains your CKEditor instance or into the `config.js` file. The example below sets the **Image Properties** dialog window to open the **Advanced** tab by default.

	CKEDITOR.on('dialogDefinition', function( ev ) {
		// Take the dialog window name and its definition from the event data.
		var dialogName = ev.data.name;
		var dialogDefinition = ev.data.definition;

		if ( dialogName == 'image' ) {
			dialogDefinition.onShow = function() {
				// This code will open the Advanced tab.
				this.selectPage( 'advanced' );
			};
		}
	});

If, for example, you want to open the **Upload** tab first to make it more convenient for your users to use the ([existing and previously integrated](#!/guide/dev_howtos_file_upload)) file uploader, change the code in the following way:

	// This code will open the Upload tab.
	this.selectPage( 'Upload' );


## How Do I Learn the Names of CKEditor Dialog Window Fields?

If you want to customize a [dialog window](#!/guide/user_interace_dialog_windows), the easiest and most convenient way is to enable the **Developer Tools** plugin that displays the name and IDs of all dialog window elements when you hover them with your mouse.

If you want to enable this feature, you need to add the plugin to your CKEditor configuration by using the {@link CKEDITOR.config#extraPlugins extraPlugins} setting.

	config.extraPlugins = 'devtools';

The following figure shows the tooltip that describes the **URL** field of the **Link** dialog window that is displayed after the **Developer Tools** plugin was enabled.

{@img ../../images/dialog_dev_tools.png Element information displayed with the Developer Tools plugin in CKEditor}


## How Do I Remove the Ability to Resize All CKEditor Dialog Windows?

Since version 3.5 the dialog windows of CKEditor can be [resized](#!/guide/user_interface_dialog_windows-section-3) by using the resizing grip located in the bottom right-hand corner of a dialog window (for RTL languages — in the bottom left-hand corner).

{@img ../../images/dialog_resize.png The resizing grip of a CKEditor dialog window}

You can disable the resizing feature completely by setting the {@link CKEDITOR.dialog.definition#resizable resizable} parameter to {@link CKEDITOR#DIALOG_RESIZE_NONE}.

	CKEDITOR.on( 'dialogDefinition', function( ev ) {
		ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
	});

Use the {@link CKEDITOR#DIALOG_RESIZE_WIDTH} and {@link CKEDITOR#DIALOG_RESIZE_HEIGHT} values to enable resizing of a dialog window in one dimension only.


## How Do I Remove the Ability to Resize Specific CKEditor Dialog Windows?

Since version 3.5 the dialog windows of CKEditor can be [resized](#!/guide/user_interface_dialog_windows-section-3) by using the resizing grip located in the bottom right-hand corner of a dialog window (for RTL languages — in the bottom left-hand corner).

{@img ../../images/dialog_resize.png The resizing grip of a CKEditor dialog window}

You can disable the resizing feature completely as described [here](#!/guide_howtos_dialog_windows-section-4). If, however, you want to leave the resizing feature for some of the dialog windows and turn it off for others, you may define the value of the {@link CKEDITOR.dialog.definition#resizable resizable} parameter for each dialog window separately, like in the example below.

	CKEDITOR.on( 'dialogDefinition', function( ev ) {
		if ( ev.data.name == 'link' )
			ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;
		else if ( ev.data.name == 'image' )
			ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_HEIGHT;
	});

Use the {@link CKEDITOR#DIALOG_RESIZE_WIDTH} and {@link CKEDITOR#DIALOG_RESIZE_HEIGHT} values to enable resizing of a dialog window in one dimension only.