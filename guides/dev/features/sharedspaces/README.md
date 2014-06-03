# Shared Toolbar and Bottom Bar

An optional CKEditor plugin called [Shared Spaces](http://ckeditor.com/addon/sharedspace) lets you put the editor toolbar and bottom bar in selected page elements detached from the editing areas and then share these UI elements among numerous editor instances.

This feature can be used for both [classic](#!/guide/dev_framed), `iframe`-based editors, and [inline](#!/guide/dev_inline) editors. In case of inline editor instances this will ensure that the toolbar will always remain in one designated place on the page which may be beneficial is some usage scenarios.

Please note that the UI elements can be shared between classic and inline editors placed on one page, too. See also the [working Shared Toolbar and Bottom Bar sample](../samples/sharedspaces.html) along with its source code, ready to copy and implement with your own CKEditor instance!

## Customization

This feature can be configured separately for each editor instance by setting the CKEDITOR.config.sharedSpaces option.

This configuration option defines the IDs of the page elements that will store the editor UI elements. For example the following code will place the toolbar (the `top` part) in the element with an ID of `someElementId`, while the bottom bar (the `bottom` part) will be displayed in the element with an ID of `anotherId`.

    config.sharedSpaces = {
        top: 'someElementId',
        bottom: 'anotherId'
    };

The image below presents this editor configuration for two inline editor instances.

{@img sharedspaces_01.png}

If, on the other hand, you only want to share some UI elements and leave others to particular instances, you can use the settings like the following:

    config.sharedSpaces = {
        top: 'someElementId'
    };

An editor instance with such configuration will use the shared toolbar (the `top` element) while preserving its own bottom bar with the elements path, as shown in the image below with two classic editor instances.

{@img sharedspaces_02.png}

<p class="tip">
    Please note that you need to create the page elements that will store the toolbar and bottom bar by yourself and make sure you provide valid IDs to the editor configuration.
</p>

## Related Features

Try the [Toolbar Location](#!/guide/dev_toolbarlocation) feature to customize the toolbar position within the editor user interface.