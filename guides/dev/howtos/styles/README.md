<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Styles

The following article contains tips about handling content styles in the editor. Refer to the [Applying Styles to Editor Content](#!/guide/dev_styles) article for an overview of the editor styles system.


## How Do I Customize the Styles Drop-Down List?

You need to pass your own style definitions to the CKEDITOR.stylesSet.add function, giving them a unique name, and then configure the editor to use them by setting the CKEDITOR.config#stylesSet value.

	CKEDITOR.stylesSet.add( 'my_styles', [
		// Block-level styles.
		{ name: 'Blue Title', element: 'h2', styles: { color: 'Blue' } },
		{ name: 'Red Title',  element: 'h3', styles: { color: 'Red' } },

		// Inline styles.
		{ name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
		{ name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
	]);

Depending on whether your definitions were placed inline or in an external file, you need to set the CKEDITOR.config#stylesSet configuration setting accordingly.

	// For inline style definition.
	config.stylesSet = 'my_styles';

	// For a definition in an external file.
	config.stylesSet = 'my_styles:http://www.example.com/styles.js';

For more details on the definition format and best practices on how to customize the styles please refer to the [Applying Styles to Editor Content](#!/guide/dev_styles) article and see the relevant [CKEditor SDK sample](https://sdk.ckeditor.com/samples/styles.html).


### Stylesheet Parser Plugin

You can also populate the **Styles** drop-down list with style definitions added in an external CSS stylesheet file. Check [The Stylesheet Parser Plugin](#!/guide/dev_styles-section-the-stylesheet-parser-plugin) article for more information about using the  optional [Stylesheet Parser](https://ckeditor.com/cke4/addon/stylesheetparser) plugin.


## How Do I Add Existing CSS Styles from an External File to Editor Output and the Styles Drop-Down List?

The optional [Stylesheet Parser](https://ckeditor.com/cke4/addon/stylesheetparser) plugin can be used to point to an external CSS stylesheet containing style definitions. It will help you use existing CSS styles and display them in the **Styles** drop-down list without a need to define them specifically for CKEditor as [described here](#!/guide/dev_howtos_styles-section-how-do-i-customize-the-styles-drop-down-list%3F).

For more information on using the plugin refer to [The Stylesheet Parser Plugin](#!/guide/dev_styles-section-the-stylesheet-parser-plugin) article and see the relevant [CKEditor SDK sample](https://sdk.ckeditor.com/samples/styles.html).


## How Do I Add Custom Styles Based on CSS Classes?

Add a style definition as described in the [How Do I Customize the Styles Drop-Down List?](#!/guide/dev_howtos_styles-section-how-do-i-customize-the-styles-drop-down-list%3F) section above and pass the class name in the `attributes` parameter.

**Note:** Do remember that since some old browsers recognize `class` as a resereved word in JavaScript, you need to place it in quotes.

The following example adds the `myClass` class to an `<img>` element. The image element will now be styled as defined in this CSS class.

	{
		name: 'Custom Image',
		element: 'img',
		attributes: { 'class': 'myClass' }
	}

For more details on the definition format and best practices on how to customize the styles please refer to the [Applying Styles to Editor Content](#!/guide/dev_styles) article.


## How Do I Use the Styles on Images, Tables or Other Elements?

If you added some [custom style definitions](#!/guide/dev_howtos_styles-section-how-do-i-customize-the-styles-drop-down-list%3F) for objects such as tables or images, you need to select these objects first before you will be able to apply the style. Object styles are only shown in the **Styles** drop-down list and can be applied *after* the element was selected in the editor as shown in the image below when the table is selected.

{@img styles_03.png Object styles shown after selecting a table}
