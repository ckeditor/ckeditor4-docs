<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting Editor Size

<p class="requirements">
	Editor size can only be modified in classic editor. The <code>config.width</code> and <code>config.height</code> settings are ignored by inline editor.
</p>

The width and height of the [classic editor](#!/guide/dev_framed) can be customized to match its context and predicted usage. By default, the editor width equals the width of its container element in the page, while its height is set to 200 pixels. Here are a few situations where you may consider changing the default values:

* The editor will only be used to submit very short (or very long) texts.
* You do not want the editor to dominate your page visually by taking too much space.
* You customized the toolbar, removing some buttons, and want to adjust the editor width to the reduced toolbar.
* You need to adjust the editor UI to your page layout.

The easiest way to achieve that is to use the CKEDITOR.config.width and CKEDITOR.config.height settings to adjust the editor user interface size.

The image below presents a really small editor instance with reduced toolbar, bottom bar, and size.

{@img size_01.png}

## Editor Width

The CKEDITOR.config.width option sets the **outer size** of the entire editor interface, including the border. This configuration option accepts an integer (to denote a value in pixels) or any CSS-defined length unit, including percent (`%`).

For example:

	config.width = 500;     // 500 pixels wide.
	config.width = '75%';   // CSS unit (percent).

## Editor Height

The CKEDITOR.config.height option sets the **height of the editing area** with CKEditor content &mdash; it does not include the toolbar or the bottom bar. This configuration option accepts an integer (to denote a value in pixels) or any CSS-defined length unit except percent (`%`) values which are not supported.

For example:

	config.height = 500;        // 500 pixels high.
	config.height = '25em';     // CSS unit (em).

## Alternative Solutions

The editor can also be configured to [automatically adjust its height to the size of content](#!/guide/dev_autogrow) entered in its editing area thanks to an optional [Auto Grow](http://ckeditor.com/addon/autogrow) plugin.

Additionally, the [Editor Resize](http://ckeditor.com/addon/resize) plugin provides numerous resize options for the classic editor, including the manual resize handle, setting minimum and maximum editor dimensions after resizing or influencing the resize direction. It even allows changing the editor size on the fly!

## Editor Size Demo

See the [working "Setting Editor Size" sample](https://sdk.ckeditor.com/samples/size.html) that showcases an editor instance with modified dimensions.

## Related Features

Refer to the following resources for more information about editor resizing:

* The [Auto Grow](#!/guide/dev_autogrow) feature allows the editor to automatically expand and shrink vertically depending on the amount and size of content entered in its editing area.
* The [Editor Resizing Customization](#!/guide/dev_resize) article explains a number of options for classic editor resizing, including resizing the editor on the fly.
