# Styles

The [Styles Combo](http://ckeditor.com/addon/stylescombo) plugin adds a **Styles** drop-down list to the CKEditor toolbar. This list makes it easy to apply customized styles and semantic values to content created in the editor.

The entries available in the Styles drop-down list can be easily customized to suit your needs.

## Defining Styles

The styles definition is a JavaScript array which is registered by calling the {@link CKEDITOR.stylesSet#add CKEDITOR.stylesSet.add} function. A unique name must be assigned to your style definition, so you can later configure each editor instance to load it. This method lets you create a single style definition which is shared by several CKEditor instances present on the page.

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

When the definitions are ready, you must instruct the editor to apply the newly registered styles by using the {@link CKEDITOR.config#stylesSet stylesSet} setting. This may be set in the `config.js` file, for example:

	config.stylesSet = 'my_styles';

### Using an External Styles Definition File

The style definition registration call can be included in an external JavaScript file. By default, CKEditor loads the style definition from the `styles.js` file included in its installation folder.

Your style definition file can be saved in any place of your website (or somewhere in the Internet). You must, however, know the URL required to reach it. For example, you can save the file in the root of your website, and then call it as `/styles.js`, or place it somewhere else, and refer to it using its full URL, like `http://www.example.com/styles.js`.

At that point, change the `stylesSet` setting to point the editor to your file:

	config.stylesSet = 'my_styles:/styles.js';

or:

	config.stylesSet = 'my_styles:http://www.example.com/styles.js';

The syntax for the style definition setting is always: `style definition name : file URL`.

Note that you must use the unique name you have used to register the style definition in the file.

## Style Rules

The entries inside a style definition are called the "style rules". Each rule defines the display name for a single style as well as the element, attributes, and CSS styles to be used for it. The following is a generic representation of a style rule:

	{
		name: 'Name displayed in the Styles drop-down list',
		element: 'HTML element name (for example "span")',
		styles: {
			'css-style1': 'desired value',
			'css-style2': 'desired value',
			...
		}
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
* **Object styles** &ndash; Applied to special selectable objects (not textual), whenever such selection is supported by the browser. These apply to the following elements: `a`, `embed`, `hr`, `img`, `li`, `object`, `ol`, `table`, `td`, `tr`, and `ul`.
* **Inline styles** &ndash; Applied to text selections for style rules using elements not defined in other style types.
* **Custom styles** &ndash; Plugins may define special style handlers which can be applied in special situations. One of such custom handlers is defined for widgets and described in the [Widget Styles](#!/guide/dev_styles-section-widget-styles) section below.

## Widget Styles

[Widgets](#!/guide/dev_widgets) are special rich content units and therefore standard styles (like block or object ones) cannot be applied to them. Only styles of a special type (called simply `'widget'`) work with widgets.

To define a widget style you need to specify two additional properties in your style definition:

* `type` &ndash; Must be set to `'widget'`. This informs the style system that this is a widget style.
* `widget` &ndash; Must be set to the name of the widget to which this style will be applicable. Widget names can be verified by browsing the [editorInstance.widgets.registered](#!/api/CKEDITOR.plugins.widget.repository-property-registered) object in your browser's developer tools.

Since widgets are a lot more complex structures than standard content, only classes defined in the style definition will be applied to them. Other attributes and inline styles will be ignored. Most often classes will be applied to widget's main element, but this behavior may be customized by the widget itself.

Sample widget styles:

	// Enhanced Image (http://ckeditor.com/addon/image2) style.
	{ type: 'widget', widget: 'image', attributes: { 'class': 'bigBanner' } }

	// Code snippet (http://ckeditor.com/addon/codesnippet) style.
	{ type: 'widget', widget: 'codeSnippet', attributes: { 'class': 'pulledSnippet narrow' } }

If you are interested in seeing how this works in practice, see the [little demo of widget styling](http://ckeditor.com/tmp/4.4.0/widget-styles.html) that we prepared. It contains some further explanations as well as a working editor instance that includes the Enhanced Image and Code Snippet widgets with additional styling.

## The Stylesheet Parser Plugin

Another simplified method of customizing the styles for the document created in CKEditor and populating the drop-down list with style definitions coming from an external CSS stylesheet file is also available. The optional [Stylesheet Parser](http://ckeditor.com/addon/stylesheetparser) plugin lets you use your existing CSS styles without the need to define the styles specifically for CKEditor in the format presented above.

Having the Stylesheet Parser [installed](#!/guide/dev_plugins), you need to supply the location of the CSS file that contains your style definitions by using the {@link CKEDITOR.config#contentsCss contentsCss} configuration setting:

	config.contentsCss = 'sample_CSS_file.css';

Finally, if you want to skip loading the styles that are used in CKEditor by default, you may set the `stylesSet` option to an empty value:

	config.stylesSet = [];

This solution lets you configure the editor to use existing CSS stylesheet rules without the need to create separate style definitions for CKEditor. On the other hand, the previously used approach offers more control over which styles are available for the users, so both solutions can be employed interchangeably, according to your needs.

### Choosing the CSS Selectors

The plugin can be fine-tuned to only take into account the CSS selectors that match the {@link CKEDITOR.config#stylesheetParser_validSelectors stylesheetParser_validSelectors} configuration value. The default regular expression accepts all CSS rules in a form of `element.class`, but you can modify it to refer to a limited set of elements, like in the example below.

	// Only add rules for <p> and <span> elements.
	config.stylesheetParser_validSelectors = /\^(p|span)\.\w+/;

### Limiting the CSS Selectors

You can also further customize the plugin by setting the {@link CKEDITOR.config#stylesheetParser_skipSelectors stylesheetParser_skipSelectors} configuration value. The plugin will then ignore the CSS rules that match the regular expression and will not display them in the drop-down list nor use them to output the document content. The default value excludes all rules for the `<body>` element as well as classes defined for no specific element, but you can modify it to ignore a wider set of elements, like in the example below.

	// Ignore rules for <body> and <caption> elements, classes starting with "high",
	// and any class defined for no specific element.
	config.stylesheetParser_skipSelectors = /(^body\.|^caption\.|\.high|^\.)/i;
