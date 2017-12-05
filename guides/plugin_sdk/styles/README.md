<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Plugin Stylesheets

Every plugin may require including some additional stylesheet files. For instance, the [Code Snippet](https://ckeditor.com/cke4/addon/codesnippet) plugin uses the [highlight.js](https://highlightjs.org/) library that stores color schemes in separate CSS files. The markup created by highlight.js contains only classes (no inline styles), so in order to implement code highlighting, one of the scheme CSS files needs to be loaded.

<p class="tip">
	Unless stylesheets are a part of some external library (like highlight.js), the recommended place to keep them is inside the <code>styles</code> directory in your plugin's folder.
</p>

Depending on the mode in which the editor is used (classic or inline), custom styles may be loaded by the plugin itself (this does not apply to target HTML pages, though) or they may require some additional handling by the developer who integrates CKEditor with his or her page.

## Classic Editor

For [classic](#!/guide/dev_framed), `iframe`-based editor, the plugin may load the stylesheet automatically.

The most convenient way is to use the the CKEDITOR.editor.addContentsCss method introduced in CKEditor 4.4. This method adds the specified path to the CKEDITOR.config.contentsCss setting and causes the styles to be loaded automatically by the editor. For example:

	CKEDITOR.plugins.add( 'example', {
		init: function( editor ) {
			var pluginDirectory = this.path;
			editor.addContentsCss( pluginDirectory + 'styles/example.css' );
		}
	} );

<p class="tip">
	The <code>editor.addContentsCss()</code> method can only be executed before the editor is ready &mdash; otherwise it will not take any effect until the data is reloaded or the user switches between the WYSIWYG and Source modes.
</p>

## Inline Editor

The [inline editor](#!/guide/dev_inline) cannot automatically load the stylesheet since it is not responsible for the page styling, it just inherits and displays the styles defined for the page by its developer.

In this case the developer integrating CKEditor needs to load the plugin stylesheet by adding it to the `<head>` section of the page that includes the editor.

## Target HTML Pages

The same is true for the final page where the content created by CKEditor is loaded and displayed to the end user &mdash; the additional plugin stylesheet needs to be added to the `<head>` section of the page.

## Note for Plugin Authors

If you are [sharing a plugin](https://ckeditor.com/cke4/addons/plugins/all/) that needs to use additional styles:

1. Place the styles in an easily recognizable directory inside the plugin directory (for example, the `styles` directory).
1. Add the path to the plugin stylesheet to the CKEDITOR.config.contentsCss setting in your plugin code.
1. Create clear documentation for developers who include your plugin in their builds, urging them to add the plugin stylesheet to the `<head>` section of end-user HTML pages and the pages where inline editor is used.

## Special Case: Stylesheets Required Only Inside the Editor

It may happen that your plugin requires some styles to be applied only inside the editor. For instance, it may add special information about blocks like the [Show Blocks](https://ckeditor.com/cke4/addon/showblocks) plugin. In such case your plugin can use the CKEDITOR.addCss method which lets you include the stylesheets directly in the plugin JavaScript file, without using separate CSS files.

This method has to be called before the [editable](#!/api/CKEDITOR.editable) is set up and only once for all editors. Therefore, unlike in the previous example, it should be called from the plugin `onLoad` callback:

	CKEDITOR.plugins.add( 'example', {
		onLoad: function() {
			CKEDITOR.addCss(
				'p:first-child {' +
					'border-top: solid 2px green' +
				'}' +
				'p:last-child {' +
					'border-bottom: solid 2px green' +
				'}'
			);
		}
		// ...
	} );

## Troubleshooting

If stylesheets added by your plugins do not seem to work, the first thing to do is **clearing the browser cache**. If that does not help, you can open your browser developer tools and inspect the editor content (it is a fragment of the HTML page).

It may happen that some classes, styles or attributes were removed from the content loaded into the editor. This often means that your plugin is not properly [integrated with the Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf).

## Further Reading

Refer to the following resources for more information about creating CKEditor plugins:

* [Creating a CKEditor Plugin in 20 Lines of Code](#!/guide/plugin_sdk_sample) &ndash; Create your first CKEditor plugin that inserts a piece of HTML code into the document.
* [Simple Plugin, Part 1](#!/guide/plugin_sdk_sample_1) &ndash; Develop a basic Abbreviation plugin with a dialog window that lets the user insert a an abbreviation element into the document.
* [Simple Plugin, Part 2](#!/guide/plugin_sdk_sample_2) &ndash; Modify the Abbreviation plugin by adding a custom context menu and abbreviation editing capabilities.
* [Integrating Plugins with Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf) &ndash; Learn how to implement Advanced Content Filter support in your plugins.
