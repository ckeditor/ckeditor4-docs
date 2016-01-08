<!--
Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Editor Resizing Customization

<div class="requirements">
	<p>
		This feature is provided through the <a href="http://ckeditor.com/addon/resize">Editor Resize</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="http://ckeditor.com/download">Download</a> site. You can also <a href="#!/guide/dev_plugins">add it to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
	</p>
	<p>
		Width and height manipulation is only supported for <a href="#!/guide/dev_framed">classic editor</a> and does not work in <a href="#!/guide/dev_inline">inline editor</a>.
	</p>
</div>


When the Editor Resize plugin is enabled, it adds the resize handle (<span title="Resize">◢</span>) at the bottom of the editor user interface and allows users to manually resize the editor window to desired dimensions.

{@img resize_01.png The editor resize handle}

The resize feature is highly customizable. It is possible to define the resizing direction or maximum and minimum editor size after the resize. Additionally, this plugin provides the CKEDITOR.editor.resize method which allows for resizing the editor on the fly.

## Disabling Editor Resizing

To prevent the editor from being resized you can use the CKEDITOR.config.removePlugins setting to remove the Editor Resize (`resize`) plugin.

	config.removePlugins = 'resize';

You can also disable this feature by setting the CKEDITOR.config.resize_enabled configuration option to `false`.

	config.resize_enabled = false;


## Changing Editor Size on the Fly

Besides defining a [default size](#!/guide/dev_size) of the editor window you can also change the size of a CKEditor instance on the fly.

To achieve this, use the {@link CKEDITOR.editor#method-resize editor.resize()} method to define the dimensions of the editor interface, assigning the window a width and height value in pixels or CSS-accepted units.

	// Set editor width to 100% and height to 350px.
	editor.resize( '100%', '350' );

While setting the height value, use the `isContentHeight` parameter to decide whether the value applies to the entire editor interface or just the editing area.

	// The height value now applies to the editing area.
	editor.resize( '100%', '350', true );


## Limiting the Width and Height for CKEditor Resizing

It is also possible to define the minimum and maximum dimensions after resizing to prevent the editor window from becoming too small or too big to handle.

To define the minimum editor dimensions after resizing, specify the CKEDITOR.config.resize_minWidth and CKEDITOR.config.resize_minHeight values in pixels.

	config.resize_minWidth = 300;
	config.resize_minHeight = 300;

To define the maximum editor dimensions after resizing, specify the CKEDITOR.config.resize_maxWidth and CKEDITOR.config.resize_maxHeight values in pixels.

	config.resize_maxWidth = 800;
	config.resize_maxHeight = 600;


## Limiting the Resizing Directions

Additionally, you can define the resizing directions in order to have more control over the resulting editor appearance.

By default CKEditor is allowed to only resize vertically. This is achieved thanks to setting the CKEDITOR.config.resize_dir configuration option to `'vertical'`

	config.resize_dir = 'vertical';
	
If you set the CKEDITOR.config.resize_dir configuration option to `'horizontal'`, CKEditor window will only be resizable in horizontal dimension.

	config.resize_dir = 'horizontal';

If you want to allow both vertical and horizontal resizing, you need to set the CKEDITOR.config.resize_dir configuration option to `'both'`.

	config.resize_dir = 'both';

## Editor Resizing Customization Demo 

See the [working "Editor Resizing Customization" sample](http://sdk.ckeditor.com/samples/resize.html) that showcases an editor instance with modified resizing settings.

## Related Features

Refer to the following resources for more information about editor resizing:

* The [Setting Editor Size](#!/guide/dev_size) article explains how to set the editor width and height.
* The [Auto Grow](#!/guide/dev_autogrow) feature allows the editor to automatically expand and shrink vertically depending on the amount and size of content entered in its editing area.