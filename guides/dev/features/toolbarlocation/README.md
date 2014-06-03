# Toolbar Location

CKEditor allows you to customize the editor toolbar location. By default, in [classic](#!/guide/dev_framed), `iframe`-based editors the toolbar is placed in the top part of the editor UI, above the editing area.

You can, however, use the CKEDITOR.config.toolbarLocation configuration setting to change this option. For the default editor implementation you can choose between the `top` (the default) and the `bottom` setting.

For example, to put the toolbar at the bottom of the interface, use the following option:

    config.toolbarLocation = 'bottom';

To receive the result such as this:

{@img toolbarlocation_01.png}

Please note that this option is only applicable to [classic](#!/guide/dev_framed) editor. In case of [inline](#!/guide/dev_inline) editor the toolbar position is set dynamically depending on the position of the editable element on the screen.

See also the [working Toolbar Location sample](../samples/toolbarlocation.html) along with its source code, ready to copy and implement with your own CKEditor instance!

## Related Features

Try the [Shared Toolbar and Bottom Bar](#!/guide/dev_sharedspaces) feature to place the toolbar in a designated page element and share it among multiple editor instances used on one page!