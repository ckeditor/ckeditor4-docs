---
category: styling-formatting
order: 120
url: features/colorbutton
menu-title: Text and Background Color
meta-title-short: Text and Background Color
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Setting Text and Background Color

<info-box info="">
 This feature is provided through optional plugins that are only included in the Full preset available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add them to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Color Button](https://ckeditor.com/cke4/addon/colorbutton) plugin provides the ability to define font and background color for text created in CKEditor 4. When enabled, it adds the **Text Color** and **Background Color** toolbar buttons that open a color selection drop-down list. If you want to quickly {@link features/removeformat/README remove colors} from your document, use the **Remove Format** button provided by the [Remove Format](https://ckeditor.com/cke4/addon/removeformat) plugin.

{@img assets/img/colorbutton_05.png The Text Color and Background Color features}

## More Colors Option and Color Dialog

You can also add the optional [Color Dialog](https://ckeditor.com/cke4/addon/colordialog) plugin which extends the color selector with the **More Colors** option and a user-friendly way to select the desired color through a dedicated **Select Color** dialog window. When this plugin is enabled, the **More Colors** option appears automatically for the text and background color.

{@img assets/img/colordialog_03.png The Select Color dialog window}

You can hide the **More Colors** feature by setting the {@linkapi CKEDITOR.config.colorButton_enableMore CKEDITOR.config.colorButton_enableMore} configuration option to `false`.

## Custom Color List

The list of colors available in the color selectors can be customized, for example to include the colors that are used in your website. You may also want to limit user's choice of colors to just selected few in order to avoid the overuse of colors.

Use the {@linkapi CKEDITOR.config.colorButton_colors CKEDITOR.config.colorButton_colors} configuration option to define a custom list available in the **Text Color** and **Background Color** features. For example:

	config.colorButton_colors = 'CF5D4E,454545,FFF,CCC,DDD,CCEAEE,66AB16';

Additionally, since CKEditor 4.5.8 you can also disable the "Automatic" option by setting the {@linkapi CKEDITOR.config.colorButton_enableAutomatic CKEDITOR.config.colorButton_enableAutomatic} option to `false`.

	config.colorButton_enableAutomatic = false;

These settings will cause the color list to only contain the seven colors listed above, with no "Automatic" option available:

{@img assets/img/colorbutton_04.png The customized color list}

<info-box hint="">
 <p>
 	The <strong>Text and Background Color</strong> feature does not create semantically meaningful content. Even if you adjust the color list to match the style of your website, your users will be able to arbitrarily apply colors to text elements without any consistency.
 </p>
 <p>
 	A much better idea for creating semantic content and maintaining consistent styling across your website is to adjust the <strong>{@link features/styles/README Styles}</strong> drop-down list to include some colors that could be applied to user-created content and would still be consistent with your website design.
 </p>
</info-box>

## Custom Color Style Definition

You can also decide how the color definition is stored by setting the {@linkapi CKEDITOR.config.colorButton_foreStyle CKEDITOR.config.colorButton_foreStyle} (for text color) and {@linkapi CKEDITOR.config.colorButton_backStyle CKEDITOR.config.colorButton_backStyle} (for background color) configuration options. By default, the color is added as a `<span>` element with the `style` attribute, but you could also e.g. use the legacy (and not recommended) HTML4 `<font>` element definition:

	config.colorButton_foreStyle = {
		element: 'font',
		attributes: { 'color': '#(color)' }
	};

	config.colorButton_backStyle = {
    	element: 'font',
    	styles: { 'background-color': '#(color)' }
	};

CKEditor 4 will then output the color definition as `<font>` elements with `color` and `style="background-color"` attributes for text and background color, respectively:

	<p><font color="#800080">This is my text color.</font><br/>
	<font style="background-color:#FFFF00;">This is my background color</font></p>

In CKEditor `4.15` the `colorName` property has been introduced that uses a color name instead of a color code, which allows creating descriptive class names.

You can use `colorName` with {@linkapi CKEDITOR.config.colorButton_foreStyle CKEDITOR.config.colorButton_foreStyle} or {@linkapi CKEDITOR.config.colorButton_backStyle CKEDITOR.config.colorButton_backStyle} configuration options:

```javascript
config.colorButton_foreStyle = {
	element: 'span',
	attributes: { 'class': 'text-#(colorName)' }
};

config.colorButton_backStyle = {
	element: 'span',
	attributes: { 'class': 'text-#(colorName)' }
};
```

CKEditor 4 will then output the color definition as `span` with class:

```html
<span class="text-skyblue">Text</span>
```

You can customize color names to more friendly form by setting {@linkapi CKEDITOR.config.colorButton_colors custom color names}:

```javascript
config.colorButton_colors = 'skyblue/87CEEB,crimson/DC143C';
```

## Color History

In CKEditor `4.15` version a new feature was introduced - **Color History**. It is active in the editor by default if the [Color Button](https://ckeditor.com/cke4/addon/colorbutton) plugin is enabled. It adds additional color rows to the color panel, separated from the default palette with a horizontal line. Color History rows are only visible if there are any colors to show in the history:

{@img assets/img/colorbutton_07.png Color History filled with a few colors.}

The number of colors that appears can be controlled using {@linkapi CKEDITOR.config.colorButton_historyRowLimit colorButton_historyRowLimit configuration option} (setting this value to 0 allows to disable the feature entirely).

The Color History feature, in fact, consists of two separate mechanisms to collect and display colors. The first one collects colors from the editor content at initialization time, while the second one adds them to the history dynamically whenever they are used. Let’s talk about each one a little.

### Color Suggestions

During editor initialization, Color History scans editor content for all colors used as text and background styles and adds them to the color history rows in color panel. The order of colors is determined based on the number of their occurrences (the one that appears most often will be displayed as a first one) and later on the order of appearance. This whole procedure happens only once during editor initialization, so if the editor is loaded with colored content you can use all the colors right away! This part of the feature can also be disabled using {@linkapi CKEDITOR.config.colorButton_renderContentColors colorButton_renderContentColors option}.

### Preserving Picked Colors

Every time a color is used (either from the default color palette or from color dialog) it is added to the beginning of a color history row:

{@img assets/img/colorbutton_06.gif Picked colors are preserved in custom palette.}

The most recently used color is always added to the beginning - if a color was already present in the history, it is simply moved to the first position. Text and background colors are tracked separately, in their respective color panels.

As mentioned before, there already may be some colors in the history even if you haven't yet picked any, thanks to the {@link features/colorbutton/README#color-suggestions Color Suggestions feature}. The number of colors preserved in the history can be controlled using the {@linkapi CKEDITOR.config.colorButton_historyRowLimit colorButton_historyRowLimit configuration option}.

## Text and Background Color Demo

See the {@linkexample colorbutton working "Setting Text and Background Color" sample} that showcases the usage and customization of the text and background color features.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link features/copyformatting/README Using the Copy Formatting Feature} article explains how to copy text formatting between document fragments.
* The {@link features/removeformat/README Removing Text Formatting} article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The {@link features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting.
* The {@link features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.
