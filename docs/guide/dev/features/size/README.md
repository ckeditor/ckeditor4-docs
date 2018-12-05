---
category: editor-resizing
order: 20
url: guide/dev_size
menu-title: Editor Size
meta-title-short: Editor Size
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting Editor Size

<info-box info="">
 Editor size can only be modified in classic editor. The <code>config.width</code> and <code>config.height</code> settings are ignored by inline editor.
</info-box>

The width and height of the {@link guide/dev/framed/README classic editor} can be customized to match its context and predicted usage. By default, the editor width equals the width of its container element in the page, while its height is set to 200 pixels. Here are a few situations where you may consider changing the default values:

* The editor will only be used to submit very short (or very long) texts.
* You do not want the editor to dominate your page visually by taking too much space.
* You customized the toolbar, removing some buttons, and want to adjust the editor width to the reduced toolbar.
* You need to adjust the editor UI to your page layout.

The easiest way to achieve that is to use the {@linkapi CKEDITOR.config.width CKEDITOR.config.width} and {@linkapi CKEDITOR.config.height CKEDITOR.config.height} settings to adjust the editor user interface size.

The image below presents a really small editor instance with reduced toolbar, bottom bar, and size.

{@img assets/img/size_01.png}

## Editor Width

The {@linkapi CKEDITOR.config.width CKEDITOR.config.width} option sets the **outer size** of the entire editor interface, including the border. This configuration option accepts an integer (to denote a value in pixels) or any CSS-defined length unit, including percent (`%`).

For example:

	config.width = 500;     // 500 pixels wide.
	config.width = '75%';   // CSS unit (percent).

## Editor Height

The {@linkapi CKEDITOR.config.height CKEDITOR.config.height} option sets the **height of the editing area** with CKEditor content &mdash; it does not include the toolbar or the bottom bar. This configuration option accepts an integer (to denote a value in pixels) or any CSS-defined length unit except percent (`%`) values which are not supported.

For example:

	config.height = 500;        // 500 pixels high.
	config.height = '25em';     // CSS unit (em).

## Alternative Solutions

The editor can also be configured to {@link guide/dev/features/autogrow/README automatically adjust its height to the size of content} entered in its editing area thanks to an optional [Auto Grow](https://ckeditor.com/cke4/addon/autogrow) plugin.

Additionally, the [Editor Resize](https://ckeditor.com/cke4/addon/resize) plugin provides numerous resize options for the classic editor, including the manual resize handle, setting minimum and maximum editor dimensions after resizing or influencing the resize direction. It even allows changing the editor size on the fly!

## Editor Size Demo

See the {@linksdk size working "Setting Editor Size" sample} that showcases an editor instance with modified dimensions.

## Related Features

Refer to the following resources for more information about editor resizing:

* The {@link guide/dev/features/autogrow/README Auto Grow} feature allows the editor to automatically expand and shrink vertically depending on the amount and size of content entered in its editing area.
* The {@link guide/dev/features/resize/README Editor Resizing Customization} article explains a number of options for classic editor resizing, including resizing the editor on the fly.
