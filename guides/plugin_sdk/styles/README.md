# Plugin CSS Styles

Each plugin can introduce new CSS styles that need to be handled by the editor.

The recommeded way to add them is to create a `styles` directory inside the plugin folder and place your stylesheet files there.

Please note, however, that depending on the usage mode, adding custom styles requires some additional handling by the developer who integrates CKEditor with his or her page.

## Classic Editor

In this case it is enough to define the stylesheet path in the plugin file. The plugin will then add this path to the [config.contentsCss](#!/api/CKEDITOR.config-cfg-contentsCss) setting and the styles will be loaded automatically by the [classic editor](#!/guide/dev_framed).

This is usually done by the plugin author by using the [editor.addContentsCss()](#!/api/CKEDITOR.editor-method-addContentsCss) method introduced in CKEditor 4.4.

## Inline Editor

The [inline editor](#!/guide/dev_inline) cannot automatically load the stylesheet since it is not responsibe for the page styling, it just inherits and displays the styles defined for the page by its developer.

In this case the developer integrating CKEditor needs to load the plugin stylesheet by adding it to the `<head>` section of the page that includes the editor.

## Resulting HTML Pages

The same is true for the final page where the content created by CKEditor is loaded and displayed to the end user &mdash; the additional plugin stylesheet needs to be added to the `<head>` section of the page.

## Note for Plugin Authors

If you are [sharing a plugin](http://ckeditor.com/addons/plugins/all) that needs to use additional styles:

1. Place the styles in an easily recognizable directory inside the plugin directory (for example, the `styles` directory).
1. Add the path to the plugin stylesheet to the [config.contentsCss](#!/api/CKEDITOR.config-cfg-contentsCss) setting in your plugin code.
1. Create clear documentation for developers who include your plugin in their builds, urging them to add the plugin stylesheet to the `<head>` section of end-user HTML pages and the pages where inline editor is used.