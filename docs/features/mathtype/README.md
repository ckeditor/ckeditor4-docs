---
category: inserting-content
order: 170
url: features/mathtype
menu-title: Mathematical and Chemical Formulas
meta-title-short: Mathematical Formulas
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Creating Mathematical and Chemical Formulas with MathType

<info-box info="">
	This feature is provided as a commercial solution called MathType delivered by our partner, [Wiris](http://www.wiris.com).
	The integration with MathType is in beta version and you can report any issues in the official CKEditor 4 [GitHub repository](https://github.com/ckeditor/ckeditor5/issues). A license can be purchased [here](https://ckeditor.com/contact/).
</info-box>

[MathType](http://www.wiris.com/en/mathtype) is a popular mathematical and science formula editor with classical and handwriting input modes. You can use it to create math equations or chemical formulas right inside the CKEditor 4 content.

Additionally, MathType offers a special tool designed to help you work with chemical notation. When enabled, ChemType adds a specialized toolbar with the common chemical symbols as well as changes the notation to make it more intuitive to work with chemical formulas.

## Installation

To install the MathType plugin, visit the official site of [MathType for CKEditor](https://docs.wiris.com/en/mathtype/mathtype_web/integrations/html/ckeditor) and download the version appropriate for your server software. After downloading the archive, unpack the `ckeditor_wiris` directory into the `plugins` directory of your CKEditor 4 installation. The plugin can be added to the WYSIWYG editor using the {@linkapi CKEDITOR.config.extraPlugins `config.extraPlugins`} configuration option.

Alternatively you can install the npm package:

```bash
npm install @wiris/mathtype-ckeditor4
```

The installed plugin can be later added to the editor using the {@linkapi CKEDITOR.plugins.addExternal `CKEDITOR.plugins.addExternal`} method:

```js
CKEDITOR.plugins.addExternal( 'ckeditor_wiris', '<your-project-directory>/node_modules/@wiris/mathtype-ckeditor4/plugin.js' );

CKEDITOR.replace( 'editor', {
	extraPlugins: 'ckeditor_wiris'
} );
```

Please note that the version installed via npm uses backend services provided by Wiris to transform MathML formulas to images.

## Configuration

To be able to use the plugin, the editor must allow to include MathML syntax via the {@link guide/dev/acf/README Advanced Content Filter} mechanism. 

<info-box info="">
	At the moment the MathType plugin is not compatible with the {@link guide/dev/integration/file_browse_upload/file_upload/README official file upload integration for CKEditor 4}. File upload capabilities must be disabled with the {@linkapi CKEDITOR.config.removePlugins `config.removePlugins`} configuration option to allow the use of MathType.
</info-box>

The sample configuration of CKEditor 4 with MathType included can look like this:

```js
( function() {
	var mathElements = [
		'math',
		'maction',
		'maligngroup',
		'malignmark',
		'menclose',
		'merror',
		'mfenced',
		'mfrac',
		'mglyph',
		'mi',
		'mlabeledtr',
		'mlongdiv',
		'mmultiscripts',
		'mn',
		'mo',
		'mover',
		'mpadded',
		'mphantom',
		'mroot',
		'mrow',
		'ms',
		'mscarries',
		'mscarry',
		'msgroup',
		'msline',
		'mspace',
		'msqrt',
		'msrow',
		'mstack',
		'mstyle',
		'msub',
		'msup',
		'msubsup',
		'mtable',
		'mtd',
		'mtext',
		'mtr',
		'munder',
		'munderover',
		'semantics',
		'annotation',
		'annotation-xml'
	];

	CKEDITOR.replace( 'editor1', {
		extraPlugins: 'ckeditor_wiris',
		// For now, MathType is incompatible with CKEditor file upload plugins.
		removePlugins: 'filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage',
		height: 320,
		// Update the ACF configuration with MathML syntax.
		extraAllowedContent: mathElements.join( ' ' ) + '(*)[*]{*};img[data-mathml,data-custom-editor,role](Wirisformula)'
	} );
}() );
```

## Usage

In order to start creating math or chemical formulas in the WYSIWYG editor below, click the **MathType** or **ChemType** buttons in the toolbar. This will open the relevant dialog on the screen.

{@img assets/img/mathtype_01.png 689 MathType dialog opened from CKEditor 4 WYSIWYG editor.}

The MathType window is split into two main areas: a [tabbed toolbar](https://docs.wiris.com/en/mathtype/mathtype_web/toolbar) that contains a large number of icons that are useful for creating math equations and chemical formulas, and an editing area where you can see your current formula, the location of the cursor, and the text currently selected (if any).

Use the toolbar to write your equation or formula. At any time you can also click the "Go to handwritten mode" button on the right side of the MathType editor to switch to handwriting.

{@img assets/img/mathtype_02.png 685 Handwriting mode in MathType.}

When you are done creating your scientific content, click the "OK" button to insert your formula into CKEditor 4. You can also edit any existing formulas by double-clicking them in your document.

{@img assets/img/mathtype_03.png 654 Math equation inserted into CKEditor 4 WYSIWYG editor with MathType.}

## Editing Modes

MathType lets you choose between two editing modes:
* **Classic input mode** provides options to choose symbols and templates from the MathType or ChemType toolbars and combine them to build the equation.
* **Handwritten input mode** lets you write the equation in your own handwriting. After checking the equation preview to ensure its accuracy, you can insert the equation or switch to classic input for further editing. [Read more here](https://docs.wiris.com/en/mathtype/mathtype_web/handwritten-input).

If you visit a page using MathType with your mobile device, the handwriting interface will appear by default. However, if you visit the same page with a laptop or desktop computer, the classic input will be displayed. The user is always free to change between the two interfaces.

## Input and Output

MathType is based upon standards like MathML for internal representation and the PNG image format for displaying formulas. It can also handle other formats like LaTeX, Flash, SVG and EPS.

Equations and chemical formulas are displayed in the editor as images, so they have {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the entire equation as one entity** and select, delete, or move it with drag and drop in the editor content area as one unit.

## Displaying on Target Page

In order to display mathematical formulas on the target page, i.e. the page where content produced by CKEditor will be visible, the target page needs to [include the MathType script](https://docs.wiris.com/en/mathtype/mathtype_web/integrations/mathml-mode#add_a_script_to_head). For example for the default setting this would be:

```html
<script src="<path-to-your-ckeditor4>/plugins/ckeditor_wiris/integration/WIRISplugins.js?viewer=image"></script>
```

## Mathematical and Chemical Formulas Demo

See the {@linksdk mathtype working "Creating Mathematical and Chemical Formulas with MathType" sample} that showcases the plugin.

## Related Features

Refer to the following resources for more information about related features:

* {@link features/mathjax/README Creating Mathematical Formulas with MathJax} explains how to use an alternative solution, MathJax, to insert mathematical equations into your content.

## Additional Resources

The following resources can come in handy if you want to become proficient at working with MathType:
* [MathType for CKEditor](https://docs.wiris.com/en/mathtype/mathtype_web/integrations/html/ckeditor) discusses different installation and customization options for CKEditor 4.
* [Using MathType Web](https://docs.wiris.com/en/mathtype/mathtype_web/using_mathtype) covers the basics of creating formulas, using your keyboard, moving the cursor in templates, formatting your content or writing on mobile devices.
* [Introductory tutorials](https://docs.wiris.com/en/mathtype/mathtype_web/intro_tutorials) are intended to get you started using MathType.
* [ChemType](https://docs.wiris.com/en/mathtype/mathtype_web/chemistry) explains the features of the dedicated chemistry toolbar.
* [MathType documentation](https://docs.wiris.com/en/mathtype/mathtype_web/start) is a complete reference to all MathType features and settings.
