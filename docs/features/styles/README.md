---
category: styling-formatting
order: 80
url: features/styles
menu-title: Styles Drop-down
meta-title-short: Styles Drop-down
---
<!--
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Applying Styles to Editor Content

<info-box info=""> This feature is provided through the <a href="https://ckeditor.com/cke4/addon/stylescombo">Styles Combo</a> plugin that is included in the Standard and Full presets available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The [Styles Combo](https://ckeditor.com/cke4/addon/stylescombo) plugin adds the **Styles** drop-down list to the CKEditor 4 toolbar. This list makes it easy to apply customized styles and semantic values to content created in the editor. If you want to quickly {@link features/removeformat/README remove inline and object styles} from your document, use the **Remove Format** button provided by the [Remove Format](https://ckeditor.com/cke4/addon/removeformat) plugin.

{@img assets/img/styles_01.png}

The image above shows the **Styles** drop-down with default styles. The entries available in the drop-down list can (and actually should!) be customized to suit your needs.

## Defining Styles

The styles definition is a JavaScript array which is registered by calling the {@linkapi CKEDITOR.stylesSet#add CKEDITOR.stylesSet.add} function. A unique name must be assigned to your style definition, so you can later configure each editor instance to load it. This method lets you create a single style definition which is shared by several CKEditor 4 instances present on the page.

The following code shows how to register a sample style definition.

	CKEDITOR.stylesSet.add( 'my_styles', [
		// Block-level styles
		{ name: 'Blue Title', element: 'h2', styles: { 'color': 'Blue' } },
		{ name: 'Red Title' , element: 'h3', styles: { 'color': 'Red' } },

		// Inline styles
		{ name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
		{ name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
	] );

The definition registration like the one above can be placed inline in the page source, or can live in an external file which is loaded "on demand", when needed only (see below).

When the definitions are ready, you must instruct the editor to apply the newly registered styles by using the  {@linkapi CKEDITOR.config.stylesSet CKEDITOR.config.stylesSet} setting. This may be set by using {@link guide/dev/configuration/README any of the editor configuration methods available}, for example in the `config.js` file:

	config.stylesSet = 'my_styles';

### Using an External Styles Definition File

The style definition registration call can be included in an external JavaScript file. By default, CKEditor 4 loads the style definition from the `styles.js` file included in its installation folder.

Your style definition file can be saved in any place of your website (or somewhere in the Internet). You must, however, know the URL required to reach it. For example, you can save the file in the root of your website, and then call it as `/styles.js`, or place it somewhere else, and refer to it using its full URL, like `http://www.example.com/styles.js`.

At that point, change the {@linkapi CKEDITOR.config.stylesSet CKEDITOR.config.stylesSet} setting to point the editor to your file:

	config.stylesSet = 'my_styles:/styles.js';

or:

	config.stylesSet = 'my_styles:http://www.example.com/styles.js';

The syntax for the style definition setting is always: `style definition name : file URL`.

Note that you must use the unique name you have used to register the style definition in the file.

## Style Rules

The entries inside a style definition are called *the style rules*. Each rule defines the display name for a single style as well as the element, attributes, and CSS styles to be used for it. The following is a generic representation of a style rule:

	{
		name: 'Name displayed in the Styles drop-down list',
		element: 'HTML element name (for example "span")',
		styles: {
			'css-style1': 'desired value',
			'css-style2': 'desired value',
			...
		},
		attributes: {
			'attribute-name1': 'desired value',
			'attribute-name2': 'desired value',
			...
		}
	}

The `name` and `element` values are required, while other values are optional.

## Style Types

There are three standard style types, each one related to the element used in the style rule. Additionally, editor features may define custom style types.

* **Block-level styles** &ndash; Applied to text blocks (paragraphs) as a whole, not limited to text selections. These apply to the following elements: `address`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, and `pre`.
* **Object styles** &ndash; Applied to special selectable objects (non-textual), whenever such selection is supported by the browser. These apply to the following elements: `a`, `embed`, `hr`, `img`, `li`, `object`, `ol`, `table`, `td`, `tr`, and `ul`.
* **Inline styles** &ndash; Applied to text selections for style rules using elements not defined in other style types.
* **Custom styles** &ndash; Plugins may define special style handlers which can be applied in certain situations. One of such custom handlers is defined for widgets and described in the {@link features/styles/README#widget-styles Widget Styles} section below.

## Widget Styles

{@link guide/dev/deep_dive/widgets/README Widgets} are special rich content units and therefore standard styles (like block or object ones) cannot be applied to them. Only styles of a special type (called `'widget'`) work with widgets.

To define a widget style you need to specify two additional properties in your style definition:

* `type` &ndash; Must be set to `'widget'`. This informs the style system that this is a widget style.
* `widget` &ndash; Must be set to the name of the widget to which this style will be applicable. Widget names can be verified by browsing the {@linkapi CKEDITOR.plugins.widget.repository#registered editorInstance.widgets.registered} object in your browser's developer tools.

Starting from **CKEditor 4.6.2** an optional `group` property has been introduced, providing a way to define mutually exclusive styles. It can be set to a string representing a single group or to an array of strings. Two styles from the same `group` cannot be applied to the same widget instance simultaneously. When mutually exclusive styles are applied, the latest one is used while all the previous styles are removed.

Since widgets are a lot more complex structures than standard content, only classes defined in the style definition will be applied to them. Other attributes and inline styles will be ignored. Most often classes will be applied to widget's main element, but this behavior may be customized by the widget itself.

Sample widget styles:

```js
// Enhanced Image (https://ckeditor.com/cke4/addon/image2) style.
{ name: 'Banner', type: 'widget', widget: 'image', attributes: { 'class': 'bigBanner' } }

// Code Snippet (https://ckeditor.com/cke4/addon/codesnippet) style.
{ name: 'Narrow Code', type: 'widget', widget: 'codeSnippet', attributes: { 'class': 'pulledSnippet narrow' } }

// Media Embed (https://ckeditor.com/cke4/addon/embed) styles.
{ name: '240p', type: 'widget', widget: 'embed', attributes: { 'class': 'embed-240p' }, group: 'size' },
{ name: '360p', type: 'widget', widget: 'embed', attributes: { 'class': 'embed-360p' }, group: 'size' },
{ name: '480p', type: 'widget', widget: 'embed', attributes: { 'class': 'embed-480p' }, group: 'size' },
{ name: 'left', type: 'widget', widget: 'embed', attributes: { 'class': 'embed-left' }, group: 'alignment' },
{ name: 'thumb', type: 'widget', widget: 'embed', attributes: { 'class': 'embed-thumb' }, group: [ 'size', 'alignment' ] }
```

To see how this works in practice, refer to the {@linkexample styles#widget-styles Widget Styles} sample. It contains a working editor instance that includes the {@link features/image2/README enhanced image}, {@link features/embed/README embedded media resources} and {@link features/mathjax/README mathematical formulas} widgets with additional styling.

## The Stylesheet Parser Plugin

<info-box info=""> This feature is provided through an optional plugin that is not included in the CKEditor 4 presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

Another method of customizing the styles for the document created in CKEditor 4 and populating the drop-down list with style definitions coming from an external CSS stylesheet file is also available. The optional [Stylesheet Parser](https://ckeditor.com/cke4/addon/stylesheetparser) plugin lets you use your existing CSS styles without the need to define the styles specifically for CKEditor 4 in the format presented above.

<info-box hint=""> Please note that the Stylesheet Parser plugin is incompatible with {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filter}, so it disables the filter after installing.
</info-box>

Having the Stylesheet Parser installed, you need to supply the location of the CSS file that contains your style definitions by using the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} configuration setting:

	config.contentsCss = 'sample_CSS_file.css';

Finally, if you want to skip loading the styles that are used in CKEditor 4 by default, you may set the {@linkapi CKEDITOR.config.stylesSet CKEDITOR.config.stylesSet} option to an empty value:

	config.stylesSet = [];

The image below shows the **Styles** drop-down list populated with entries coming from an external stylesheet, without default styles that were disabled in the editor configuration by setting  {@linkapi CKEDITOR.config.stylesSet CKEDITOR.config.stylesSet} to `[]`.

{@img assets/img/styles_02.png}

This solution lets you configure the editor to use existing CSS stylesheet rules without the need to create separate style definitions for CKEditor 4. On the other hand, the previously used approach offers more control over which styles are available for the users, so both solutions can be employed interchangeably, according to your needs.

### Choosing the CSS Selectors

The Stylesheet Parser plugin can be fine-tuned to only take into account the CSS selectors that match the {@linkapi CKEDITOR.config.stylesheetParser_validSelectors CKEDITOR.config.stylesheetParser_validSelectors} configuration value. The default regular expression accepts all CSS rules in a form of `element.class`, but you can modify it to refer to a limited set of elements, like in the example below.

```js
// Only add rules for <p> and <span> elements.
config.stylesheetParser_validSelectors = /\^(p|span)\.\w+/;
```

### Limiting the CSS Selectors

You can also further customize the Stylesheet Parser plugin by setting the {@linkapi CKEDITOR.config.stylesheetParser_skipSelectors CKEDITOR.config.stylesheetParser_skipSelectors} configuration value. The plugin will then ignore the CSS rules that match the regular expression and will not display them in the **Styles** drop-down list nor use them to output the document content. The default value excludes all rules for the `<body>` element as well as classes defined for no specific element, but you can modify it to ignore a wider set of elements, like in the example below.

```js
// Ignore rules for <body> and <caption> elements, classes starting with "high",
// and any class defined for no specific element.
config.stylesheetParser_skipSelectors = /(^body\.|^caption\.|\.high|^\.)/i;
```

## Editor Styles Demo

See the {@linkexample styles working "Applying Styles to Editor Content" sample} that showcases the use of default editor styles as well as a Stylesheet Parser plugin implementation.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting.
* The {@link features/copyformatting/README Using the Copy Formatting Feature} article explains how to copy text formatting between document fragments.
* The {@link features/removeformat/README Removing Text Formatting} article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The {@link features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.
* The {@link features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.
