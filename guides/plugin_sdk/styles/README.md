# Plugin's content style sheets

Every plugin may require including some additional style sheet files. For instance, the [Code Snippet](ckeditor.com/addon/codesnippet) plugin uses the [highlight.js](https://highlightjs.org/) library which keeps color schemes in separate CSS files. The markup created by highlight.js contains only classes (no inline styles) so in order to highlight code one of the scheme CSS files needs to be loaded.

<p class="tip">
	Unless style sheets are part of some external library (highlight.js for instance), the recommended place to keep them is inside `styles` directory in your plugin's folder.
</p>

Depending on the mode in which editor is used, custom styles may be loaded by the plugin itself (but not on the resulting HTML pages) or it may require some additional handling by the developer who integrates CKEditor with his or her page.

## Classic Editor

In this case the plugin may load the style sheet automatically. The most convenient way is to use the the [editor.addContentsCss()](#!/api/CKEDITOR.editor-method-addContentsCss) method introduced in CKEditor 4.4 which adds the specified path to [`config.contentsCss`](#!/api/CKEDITOR.config-cfg-contentsCss) setting and the styles will be loaded automatically by the [classic editor](#!/guide/dev_framed).

	CKEDITOR.plugins.add( 'example', {
		init: function( editor ) {
			var plugiDirectory = this.path;
			editor.addContentsCss( plugiDirectory + 'styles/example.css' );
		}
	} );

<p class="tip">
	The editor.addContentsCss() method can only be executed before editor is ready &mdash; otherwise it will take an effect unless data is reloaded or user switches between modes.
</p>

## Inline Editor

The [inline editor](#!/guide/dev_inline) cannot automatically load the style sheet since it is not responsible for the page styling, it just inherits and displays the styles defined for the page by its developer.

In this case the developer integrating CKEditor needs to load the plugin's style sheet by adding it to the `<head>` section of the page that includes the editor.

## Resulting HTML Pages

The same is true for the final page where the content created by CKEditor is loaded and displayed to the end user &mdash; the additional plugin style sheet needs to be added to the `<head>` section of the page.

## Note for Plugin Authors

If you are [sharing a plugin](http://ckeditor.com/addons/plugins/all) that needs to use additional styles:

1. Place the styles in an easily recognizable directory inside the plugin directory (for example, the `styles` directory).
1. Add the path to the plugin style sheet to the [config.contentsCss](#!/api/CKEDITOR.config-cfg-contentsCss) setting in your plugin code.
1. Create clear documentation for developers who include your plugin in their builds, urging them to add the plugin style sheet to the `<head>` section of end-user HTML pages and the pages where inline editor is used.

## Special case - style sheets required only inside editor

It may happen that your plugin requires some styles to be applied only inside editor. For instance, it may add special information about blocks like the [Show Blocks](http://ckeditor.com/addon/showblocks) plugin. In such case your plugin can use the [CKEDITOR.addCss()](#!/api/CKEDITOR-method-addCss) which let's you including the style sheets directly in the plugin's JavaScript file, without using separate CSS files.

This method has to be called before the [editable](#!/api/CKEDITOR.editable) is set up and only once for all editors. Therefore, unlike in previous example, it should be called from the plugin's `onLoad` callback:

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

If style sheets added by your plugins do not seem to work, the first thing to check is browser cache. If that does not help, you can open your browser's developer tools and inspect content of editor (it is a fragment of normal HTML page).

Typical problem is that some classes, styles or attributes were removed from the content loaded to editor. This means that your plugin is not [integrated with the Advanced Content Filter](http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf).