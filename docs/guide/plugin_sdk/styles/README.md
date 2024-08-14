---
category: ckeditor-4-plugin-sdk
order: 100
url: guide/plugin_sdk_styles
menu-title: Plugin Stylesheets
meta-title-short: Plugin Stylesheets
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Plugin Stylesheets

Every plugin may require including some additional stylesheet files. For instance, the [Code Snippet](https://ckeditor.com/cke4/addon/codesnippet) plugin uses the [highlight.js](https://highlightjs.org/) library that stores color schemes in separate CSS files. The markup created by highlight.js contains only classes (no inline styles), so in order to implement code highlighting, one of the scheme CSS files needs to be loaded.

<info-box hint="">
	Unless stylesheets are a part of some external library (like highlight.js), the recommended place to keep them is inside the <code>styles</code> directory in your plugin's folder.
</info-box>

Depending on the mode in which the editor is used (classic or inline), custom styles may be loaded by the plugin itself (this does not apply to target HTML pages, though) or they may require some additional handling by the developer who integrates CKEditor 4 with their page.

## Classic Editor

For {@link guide/dev/framed/README classic}, `iframe`-based editor, the plugin may load the stylesheet automatically.

The most convenient way is to use the the {@linkapi CKEDITOR.editor.addContentsCss CKEDITOR.editor.addContentsCss} method introduced in CKEditor 4.4. This method adds the specified path to the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} setting and causes the styles to be loaded automatically by the editor. For example:

	CKEDITOR.plugins.add( 'example', {
		init: function( editor ) {
			var pluginDirectory = this.path;
			editor.addContentsCss( pluginDirectory + 'styles/example.css' );
		}
	} );

<info-box hint="">
	The <code>editor.addContentsCss()</code> method can only be executed before the editor is ready &mdash; otherwise it will not take any effect until the data is reloaded or the user switches between the WYSIWYG and Source modes.
</info-box>

## Inline Editor

The {@link guide/dev/inline/README inline editor} cannot automatically load the stylesheet since it is not responsible for the page styling, it just inherits and displays the styles defined for the page by its developer.

In this case the developer integrating CKEditor 4 needs to load the plugin stylesheet by adding it to the `<head>` section of the page that includes the editor.

## Target HTML Pages

The same is true for the final page where the content created by CKEditor 4 is loaded and displayed to the end user &mdash; the additional plugin stylesheet needs to be added to the `<head>` section of the page.

## Note for Plugin Authors

If you are [sharing a plugin](https://ckeditor.com/cke4/addons/plugins/all) that needs to use additional styles:

1. Place the styles in an easily recognizable directory inside the plugin directory (for example, the `styles` directory).
1. Add the path to the plugin stylesheet to the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} setting in your plugin code.
1. Create clear documentation for developers who include your plugin in their builds, urging them to add the plugin stylesheet to the `<head>` section of end-user HTML pages and the pages where inline editor is used.

## Special Case: Stylesheets Required Only Inside the Editor

It may happen that your plugin requires some styles to be applied only inside the editor. For instance, it may add special information about blocks like the [Show Blocks](https://ckeditor.com/cke4/addon/showblocks) plugin. In such case your plugin can use the {@linkapi CKEDITOR.addCss CKEDITOR.addCss} method which lets you include the stylesheets directly in the plugin JavaScript file, without using separate CSS files.

This method has to be called before the {@linkapi CKEDITOR.editable editable} is set up and only once for all editors. Therefore, unlike in the previous example, it should be called from the plugin `onLoad` callback:

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

It may happen that some classes, styles or attributes were removed from the content loaded into the editor. This often means that your plugin is not properly {@link guide/plugin_sdk/integration_with_acf/README integrated with the Advanced Content Filter}.

## Further Reading

Refer to the following resources for more information about creating CKEditor 4 plugins:

* {@link guide/plugin_sdk/sample/README Creating a CKEditor 4 Plugin in 20 Lines of Code} &ndash; Create your first CKEditor 4 plugin that inserts a piece of HTML code into the document.
* {@link guide/plugin_sdk/sample_1/README Simple Plugin, Part 1} &ndash; Develop a basic Abbreviation plugin with a dialog window that lets the user insert an abbreviation element into the document.
* {@link guide/plugin_sdk/sample_2/README Simple Plugin, Part 2} &ndash; Modify the Abbreviation plugin by adding a custom context menu and abbreviation editing capabilities.
* {@link guide/plugin_sdk/integration_with_acf/README Integrating Plugins with Advanced Content Filter} &ndash; Learn how to implement Advanced Content Filter support in your plugins.
