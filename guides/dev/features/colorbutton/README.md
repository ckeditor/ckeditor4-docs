# Setting Text and Background Color

<p class="requirements">
	This feature is provided through optional plugins that are only included in the Full preset available from the official CKEditor <a href="http://ckeditor.com/download">Download</a> site. You can also <a href="#!/guide/dev_plugins">add them to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

The optional [Color Button](http://ckeditor.com/addon/colorbutton) plugin provides the ability to define font and background color for text created in CKEditor. When enabled, it adds the **Text Color** and **Background Color** toolbar buttons that open a color selection drop-down list. If you want to quickly [remove colors](#!/guide/dev_removeformat) from your document, use the **Remove Format** button provided by the [Remove Format](http://ckeditor.com/addon/removeformat) plugin.

{@img colorbutton_05.png The Text Color and Background Color features}

## More Colors Option and Color Dialog

You can also add the optional [Color Dialog](http://ckeditor.com/addon/colordialog) plugin which extends the color selector with the **More Colors** option and a user-friendly way to select the desired color through a dedicated **Select Color** dialog window. When this plugin is enabled, the **More Colors** option appears automatically for the text and background color. 

{@img colordialog_01.png The Select Color dialog window}

You can hide the **More Colors** feature by setting the CKEDITOR.config.colorButton_enableMore configuration option to `false`.

## Custom Color List

The list of colors available in the color selectors can be customized, for example to include the colors that are used in your website. You may also want to limit user's choice of colors to just selected few in order to avoid the overuse of colors.

Use the CKEDITOR.config.colorButton_colors configuration option to define a custom list available in the **Text Color** and **Background Color** features. For example:

	config.colorButton_colors = 'CF5D4E,454545,FFF,CCC,DDD,CCEAEE,66AB16';

This will cause the color list to only contain the seven colors listed above:

{@img colorbutton_04.png The customized color list}

<div class="tip">
	<p>
		The <strong>Text and Background Color</strong> feature does not create semantically meaningful content. Even if you adjust the color list to match the style of your website, your users will be able to arbitrarily apply colors to text elements without any consistency.
	</p>
	<p>
		A much better idea for creating semantic content and maintaining consistent styling across your website is to adjust the <strong><a href="#!/guide/dev_styles">Styles</a></strong> drop-down list to include some colors that could be applied to user-created content and would still be consistent with your website design.
	</p>
</div>

## Custom Color Style Definition

You can also decide how the color definition is stored by setting the CKEDITOR.config.colorButton_foreStyle (for text color) and CKEDITOR.config.colorButton_backStyle (for background color) configuration options. By default, the color is added as a `<span>` element with the `style` attribute, but you could also e.g. use the legacy (and not recommended) HTML4 `<font>` element definition:

	config.colorButton_foreStyle = {
		element: 'font',
		attributes: { 'color': '#(color)' }
	};
	
	config.colorButton_backStyle = {
    	element: 'font',
    	styles: { 'background-color': '#(color)' }
	};

CKEditor will then output the color definition as `<font>` elements with `color` and `style="background-color"` attributes for text and background color, respectively:

	<p><font color="#800080">This is my text color.</font><br />
	<font style="background-color:#FFFF00;">This is my background color</font></p>

## Text and Background Color Demo 

See the [working "Setting Text and Background Color" sample](http://sdk.ckeditor.com/samples/colorbutton.html) that showcases the usage and customization of the text and background color features.

## Related Features

Refer to the following resources for more information about text styling:

* The [Removing Text Formatting](#!/guide/dev_removeformat) article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The [Basic Text Styles: Bold, Italic and More](#!/guide/dev_basicstyles) article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.
* The [Applying Block-Level Text Formats](#!/guide/dev_format) article presents how to apply formatting to entire text blocks and not just text selections.
