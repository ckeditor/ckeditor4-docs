<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Styles

<p class="tip">See the <a href="#!/guide/dev_styles">Applying Styles to Editor Content</a> guide for an overview of the styles system.</p>

## How Do I Customize the Styles Drop-Down List?

You need to pass your own style definitions to the CKEDITOR.stylesSet.add function, giving them a unique name, and then configure the editor to use them by setting the stylesSet value.

	CKEDITOR.stylesSet.add( 'my_styles', [
		// Block-level styles.
		{ name: 'Blue Title', element: 'h2', styles: { color: 'Blue' } },
		{ name: 'Red Title',  element: 'h3', styles: { color: 'Red' } },

		// Inline styles.
		{ name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
		{ name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
	]);

Depending on whether your definitions were placed inline or in an external file, you need to set the {@link CKEDITOR.config#stylesSet stylesSet} configuration setting accordingly.

	// For inline style definition.
	config.stylesSet = 'my_styles';

	// For a definition in an external file.
	config.stylesSet = 'my_styles:http://www.example.com/styles.js';

For more details on the definition format and best practices on how to customize the styles please refer to the [Styles](#!/guide/dev_styles) article from the [Developer's Guide](#!/guide/dev).

### Stylesheet Parser Plugin

Note that since CKEditor 3.6 you can also populate the **Styles** drop-down list with style definitions added in an external CSS stylesheet file. Check the [How Do I Add Existing CSS Styles from an External File to the Styles Drop-Down List?](#!/guide/dev_howtos_styles-section-2) article for more information about using the new (and optional) **Stylesheet Parser** plugin.


## How Do I Add Existing CSS Styles from an External File to Editor Output and the Styles Drop-Down List?

CKEditor 3.6 and later includes the **Stylesheet Parser** (`stylesheetparser`) plugin that can be used to point to an external CSS stylesheet containing style definitions. It will help you use existing CSS styles and display them in the **Styles** drop-down list without a need to define them specifically for CKEditor as [described here](#!/guide/dev_howtos_styles-section-1).

For more information on using the plugin refer to the [Stylesheet Parser Plugin](#!/guide/dev_styles-section-4) section of the [Developer's Guide](#!/guide/dev) and check the "Stylesheet Parser plugin" (`stylesheetparser.html`) sample from the `samples/` folder of your CKEditor installation package.


## How Do I Add Custom Styles Based on CSS Classes?

Add a style definition as described in the [How do I customize the Styles drop-down list?](#!/guide/dev_howtos_styles-section-1) article and pass the class name in the `attributes parameter.

**Note:** do remember that since some old browsers recognize `class` as a resereved word in JavaScript, you need to place it in quotes.

The following example adds a myClass class to an img element. The image element will now be styled as defined in this CSS class.

	{
		name: 'Custom Image',
		element: 'img',
		attributes: { 'class': 'myClass' }
	}

For more details on the definition format and best practices on how to customize the styles please refer to the [Styles](#!/guide/dev_styles) article from the [Developer's Guide](#!/guide/dev).


## How Do I Use the Styles on Images, Tables or Other Elements?

If you added some [custom style definitions](#!/guide/dev_howtos_styles-section-1) for objects such as tables or images, you need to select these objects first before you will be able to apply the style. Object styles are only shown in the **Styles** drop-down list and can be applied `after` the element was selected in the editor.