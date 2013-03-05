# Interface


## How Do I Remove the Elements Path?

The **elements path** displays information about the HTML elements of the document for the position of the cursor.

{@img ui_elements_path.png The elements path of CKEditor}

If you want to get rid of it, use the CKEDITOR.config.removePlugins setting to remove the `elementspath` plugin.

	config.removePlugins = 'elementspath';


## How Do I Change the Size of the Editor?

To define the default size of the editor, use the {@link CKEDITOR.config#width width} and {@link CKEDITOR.config#height height} configuration settings.

Note that the `width` value can be given as a number representing the value in pixels or as a percent representing the size relative to the parent element containing the editor.

	config.width = 850;
	config.width = '75%';

The `height` value defines the height of CKEditor editing area and can be given in pixels or em. Percent values are not supported.

	config.height = 500;
	config.height = '25em';
	config.height = '300px';


## How Do I Change the Size of the Editor on the Fly?

Besides defining a [default size](#!/guide/dev_howtos_interface-section-2) of the editor window you can also change the size of a CKEditor instance on the fly.

To achieve this, use the {@link CKEDITOR.editor#method-resize resize function} to define the dimensions of the editor interface, assigning the window a width and height value in pixels or CSS-accepted units.

	// Set editor width to 100% and height to 350px.
	editor.resize( '100%', '350' );

While setting the height value, use the `isContentHeight` parameter to decide whether the value applies to the whole editor interface or just the editing area.

	// The height value now applies to the editing area.
	editor.resize( '100%', '350', true );


## How Do I Remove the Ability to Resize CKEditor?

The editor window can be resized by using the resizing grip located in the bottom right-hand corner of CKEditor interface (for RTL languages — in the bottom left-hand corner).

{@img ui_resizer.png The resizing grip of CKEditor}

To prevent the editor from being resized you can use the {@link CKEDITOR.config#removePlugins removePlugins} setting to remove the `resize` plugin.

	config.removePlugins = 'resize';

You can also disable this feature by setting the {@link CKEDITOR.config#resize_enabled resize_enabled} parameter to `false`.

	config.resize_enabled = false;


## How Do I Limit the Width and Height for CKEditor Resizing?

CKEditor window can be resized if the `resize` plugin is enabled. You can however define the minimum and maximum dimensions to prevent the editor window from becoming too small or too big to handle.

To define the minimum editor dimensions after resizing, specify the {@link CKEDITOR.config#resize_minWidth resize_minWidth} and {@link CKEDITOR.config#resize_minHeight resize_minHeight} values in pixels.

	config.resize_minWidth = 300;
	config.resize_minHeight = 300;

To define the maximum editor dimensions after resizing, specify the {@link CKEDITOR.config#resize_maxWidth resize_maxWidth} and {@link CKEDITOR.config#resize_maxHeight resize_maxHeight} values in pixels.

	config.resize_maxWidth = 800;
	config.resize_maxHeight = 600;


## How Do I Limit the Directions for CKEditor Resizing to Horizontal or Vertical Only?

CKEditor window can be resized if the `resize` plugin is enabled. You can however define the resizing directions in order to have more control over the resulting editor appearance.

By default CKEditor resizing is allowed in both directions — vertical and horizontal. This is achieved thanks to setting the resize_dir configuration value to `'both'` (this is the default setting).

	config.resize_dir = 'both';

If you want to allow vertical resizing only, you need to set the {@link CKEDITOR.config#resize_dir resize_dir} configuration value to `'vertical'`.

	config.resize_dir = 'vertical';

If you set the resize_dir configuration value to `'horizontal'`, CKEditor window will only be resizable in horizontal dimension.

	config.resize_dir = 'horizontal';


## How Do I Add the Toolbar Collapse Button?

CKEditor toolbar can be collapsed and restored by using the **Collapse Toolbar** button located in the bottom right-hand corner of the toolbar (for RTL languages — in the bottom left-hand corner).

{@img ui_collapse.png The Collapse Toolbar button in CKEditor}

If you want to enable this feature, you need to set the {@link CKEDITOR.config#toolbarCanCollapse toolbarCanCollapse} parameter to `true`.

	config.toolbarCanCollapse = true;

## How Do I Add or Remove Toolbar Buttons?

CKEditor {@link CKEDITOR.config#toolbar toolbar} is an array of button elements that you can freely add or remove.

{@img ui_toolbar.png The CKEditor toolbar}

Check the [Toolbar Customization](#!/guide/dev_toolbar) section of this guide for more information on how to customize it.


## How Do I Navigate CKEditor Using the Keyboard?

[CKEditor Accessibility Guide](http://docs.cksource.com/CKEditor_3.x/Accessibility) contains lots of useful information on using the CKEditor interface with your keyboard or with assistive devices such as screen readers.

Many functions in CKEditor have their equivalent keyboard shortcuts. This is one of the reasons why working with the editor is simple and efficient.

The [Keyboard Shortcuts](http://docs.cksource.com/CKEditor_3.x/Users_Guide/Keyboard_Shortcuts) article describes available keyboard shortcuts grouped by problem areas.


## How Do I Configure CKEditor to Use the `Arrow` Keys to Navigate Between All Toolbar Buttons?

In [CKEditor 3.6](http://ckeditor.com/blog/CKEditor_3.6_released) the concept of **toolbar button groups** was introduced to enable faster and more efficient navigation using the keyboard or assistive devices. In all previous versions of the editor, the `Tab` and `Shift+Tab` keys had the same effect as using the `Right` and `Left Arrow` keys and were used to cycle between consecutive toolbar buttons.

Since CKEditor 3.6, Tab and `Shift+Tab` navigate between toolbar button groups, while the `Arrow` keys are used to cycle between the buttons within a group.

In order to change the new default toolbar navigation mode and use the `Arrow` keys as an equivalent to `Tab` and `Shift+Tab`, use the following {@link CKEDITOR.config#toolbarGroupCycling toolbarGroupCycling} configuration setting:

	config.toolbarGroupCycling = false;