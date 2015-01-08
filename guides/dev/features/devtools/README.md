<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using Developer Tools Plugin to Customize Dialog Windows

<p class="requirements">
	This feature is provided through an optional plugin that is not included in the CKEditor distribution packages available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

An optional CKEditor plugin called [Developer Tools](http://ckeditor.com/addon/devtools) displays tooltips with information about editor dialog windows, such as:

* dialog window name,
* dialog window tab name,
* dialog window element ID,
* dialog window element type with a link to an appropriate entry in the [CKEditor API](#!/api).

{@img devtools_01.png}

This feature is aimed at developers who would like to [customize their CKEditor instances](#!/guide/dev_howtos_dialog_windows) or [create their own plugins](#!/guide/plugin_sdk_intro). It is only useful in the development phase and makes no sense in a production environment, so do remember to get rid of it before you upload CKEditor to your production server!

<p class="tip">
	This feature works with all CKEditor dialog windows, including the ones that were created by custom plugins.
</p>

## Customization Options

The Developer Tools plugin provides two configuration options:

* CKEDITOR.config.devtools_styles &ndash; sets the CSS styles applied to the tooltip.
* CKEDITOR.config.devtools_textCallback &ndash; contains a function that returns the text displayed in the tooltip.

## Developer Tools Demo 

See the [working "Developer Tools" sample](http://sdk.ckeditor.com/samples/devtools.html) that showcases how easy it can be to get information about editor dialog windows and their elements. 

## Related Features

Read more about customizing CKEditor dialog windows in the [Dialog Windows](#!/guide/dev_howtos_dialog_windows) HOWTO article. It explains how to set default values for dialog window fields or configure dialog window properties with some help from the Developer Tools plugin.