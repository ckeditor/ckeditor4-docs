<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Shared Toolbar and Bottom Bar

<p class="requirements">
	This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

An optional CKEditor plugin called [Shared Space](https://ckeditor.com/cke4/addon/sharedspace) lets you put the editor toolbar and bottom bar in selected page elements detached from the editing areas and then share these UI elements among numerous editor instances.

This feature can be used for both [classic](#!/guide/dev_framed), `iframe`-based editors, and [inline](#!/guide/dev_inline) editors. In case of inline editor instances this will ensure that the toolbar will always remain in one designated place on the page which may be beneficial is some usage scenarios.

Please note that the UI elements can be shared between classic and inline editors placed on one page, too.

## Customization

This feature can be configured separately for each editor instance by setting the CKEDITOR.config.sharedSpaces option.

This configuration option defines the IDs of the page elements that will store the editor UI elements. For example the following code will place the toolbar (the `top` part) in the element with an ID of `someElementId`, while the bottom bar (the `bottom` part) will be displayed in the element with an ID of `anotherId`.

    config.sharedSpaces = {
        top: 'someElementId',
        bottom: 'anotherId'
    };

The image below presents this editor configuration for two classic editor instances.

{@img sharedspace_01.png}

If, on the other hand, you only want to share some UI elements and leave others to particular instances, you can use the settings like the following:

    config.sharedSpaces = {
        top: 'someElementId'
    };

An editor instance with such configuration will use the shared toolbar (the `top` element) while preserving its own bottom bar with the elements path, as shown in the image below with the same two classic editor instances.

{@img sharedspace_02.png}

<p class="tip">
    Please note that you need to create the page elements that will store the toolbar and bottom bar by yourself and make sure you provide valid IDs to the editor configuration.
</p>

## Tips and Tricks

The Shared Space feature affects a crucial editor element &mdash; its user interface &mdash; so some fine-tuning of the editor configuration might be needed. Here are a few tips:

* The [Editor Resize](https://ckeditor.com/cke4/addon/resize) plugin should be disabled as it would not work in this context.
* Since CKEditor 4.5.5 the [Maximize](https://ckeditor.com/cke4/addon/maximize) plugin is disabled automatically in the shared space context.

<pre>
config.removePlugins = 'resize';
</pre>

## Shared Toolbar and Bottom Bar Demo

See the [working "Shared Toolbar and Bottom Bar" sample](https://sdk.ckeditor.com/samples/sharedspace.html) that showcases how multiple editor instances can share the same toolbar and bottom bar.

## Related Features

Refer to the following resources for more information about editor toolbar:

 * The [Toolbar Configuration](#!/guide/dev_toolbar) article explains how to set up the editor toolbar using the toolbar configurator (CKEditor 4.5+).
 * The [Understanding CKEditor Toolbar Concepts](#!/guide/dev_toolbarconcepts) article explains the basic concepts behind the editor toolbar.
 * The [Toolbar Location](#!/guide/dev_toolbarlocation) feature lets you change the toolbar position in classic editor.
