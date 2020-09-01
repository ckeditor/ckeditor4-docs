---
category: integration
order: 25
url: guide/dev_spreadsheets
menu-title: Spreadsheets
meta-title-short: Spreadsheet plugin for CKEditor 4
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Spreadsheets Integration

<info-box info="">
    This feature is provided as a commercial product and provides integration with our partner solution, [Handsontable](https://handsontable.com/). A license can be purchased [here](https://ckeditor.com/contact/).

    The Spreadsheet plugin is compatible with CKEditor 4 starting from version **4.13**. It is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site. Follow the guide to enable it.
</info-box>

The **Spreadsheet plugin** offers Excel-like functionality right inside CKEditor 4. It allows for creating complex data sheets that integrate smoothly with the existing CKEditor 4 WYSIWYG editor functionality and content, providing **data types, formatting and styling**, **formulas**, **conditional formatting** and more. Refer to the {@link features/spreadsheets/README Creating Data Grids with Spreadsheet Plugin} article to learn more about the available features.

## Quick Start

There are a few methods that you can use in order to add the Spreadsheet plugin to your CKEditor 4 installation.

### Installation with npm

The Spreadsheet plugin for CKEditor 4 is available through npm. To use it, install the `ckeditor4-plugin-spreadsheet` npm package as a dependency of your project:

```plaintext
npm install ckeditor4-plugin-spreadsheet
```

If CKEditor 4 was also installed through npm (using the `ckeditor4` package) in your project, the plugin will create a symbolic link itself in the CKEditor 4 `plugins/` directory so you do not need to move or copy any files.

If you chose another method to install CKEditor 4, copy or link the `spreadsheet` folder from the `ckeditor4-plugin-spreadsheet` package to the CKEditor 4 `plugins/` directory.

If you prefer not to touch any files, you may use the [`CKEDITOR.plugins.addExternal()`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins.html#method-addExternal) API instead to load the Spreadsheet plugin directly from the `node_modules/` directory:

```js
CKEDITOR.plugins.addExternal( 'spreadsheet', './node_modules/ckeditor4-plugin-spreadsheet/spreadsheet/' );
```

### Custom Build with Online Builder

The Spreadsheet plugin is also available in the [official CKEditor 4 Add-ons Repository](https://ckeditor.com/cke4/addon/spreadsheet). This allows you to automatically include it in any custom build which is created with the [online builder](https://ckeditor.com/cke4/builder).

To help you get started, below you can find direct links to the online builder with Spreadsheet plugin already included:

 * [Online builder &ndash; Standard preset with the Spreadsheet plugin](https://ckeditor.com/builder/b4ead606e5bfc1d2e435d753315c19db)
 * [Online builder &ndash; Full preset with the Spreadsheet plugin](https://ckeditor.com/builder/7fcb9e35b8b7398f271e3c6c3c6a368c)

If you prefer to simply download a `zip` package:

 * [Standard preset with the Spreadsheet plugin](https://ckeditor.com/builder/download/b4ead606e5bfc1d2e435d753315c19db)
 * [Full preset with the Spreadsheet plugin](https://ckeditor.com/builder/download/7fcb9e35b8b7398f271e3c6c3c6a368c)

### Download Manually from the Add-ons Repository

If, for any reason, you prefer to download the plugin code manually, you can do this via the Add-ons Repository. Simply download the [Spreadsheet plugin](https://ckeditor.com/cke4/addon/spreadsheet) and place it in the CKEditor 4 `plugins/` directory.

Do note, however, that this method is **not recommended** as it requires you to install all plugin dependencies manually, too.

### Enable the Spreadsheet Plugin

<info-box info="">
	The Spreadsheet plugin is a commercial product and a license can be purchased [here](https://ckeditor.com/contact/). You can request a <a href="https://orders.ckeditor.com/trial/spreadsheets">free trial license key</a> in order to start using it.
</info-box>

The setup is straightforward &mdash; you just need to enable the plugin and add the license key in your CKEditor 4 configuration:

```js
CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
    spreadsheet_licenseKey: 'yourLicenseKey'
} );
```

The value of `spreadsheet_licenseKey` is unique for each website and can be found in the CKEditor Ecosystem customer dashboard. Go to Website management and press the CKEditor configuration button to obtain it.

This is all. If you are having trouble with setting up the Spreadsheet plugin, please [contact us](https://ckeditor.com/contact/).

## Cell References

In most situations the default settings for cell references should suit your needs. However, you can adjust the configuration to customize the behavior of cell referencing if needed.

### Limiting or increasing the number of suggestions

By default, cell references suggestion panel will show 10 items at a time. Completion matches are narrowed down based on the closest pattern match and the Spreadsheets cell order, starting from the top-left corner.

If you find the maximum number of matches limiting, you can customize it using the `spreadsheet_cellReferencesLimit` configuration option:

```js
CKEDITOR.replace( 'editor', {
	spreadsheet_licenseKey: 'yourLicenseKey',

	// Increase the number of suggestions to 20.
	spreadsheet_cellReferencesLimit: 20
} );
```

### Customizing the matching pattern

By default the cell references suggestion panel is triggered by the `$` character. To improve performance and pre-validate Spreadsheet names, it also uses a special pattern when resolving completion matches. The default pattern consists of letters `a-z`, numbers `0-9`, underscore `_`, exclamation mark `!` and a colon `:`.

You can create your own completion pattern if you have any non-standard columns or row names. This can be done using a simple regular expression and the `spreadsheet_cellReferencesPattern` configuration option:

```js
CKEDITOR.replace( 'editor', {
	spreadsheet_licenseKey: 'yourLicenseKey',

	// Use the `%` character as a marker instead of the default `$`.
	spreadsheet_cellReferencesPattern: /\%[:_\!a-zA-Z0-9À-ž]*$/
} );
```

### Throttling the completion panel

Quick typers could overheat suggestions if they were triggered for every character typed. For that purpose, cell references completion algorithm utilizes typing throttling which slightly delays refreshing the suggestion list to make it more performant.

You can change the throttling time if you would like to get quicker response from the editor or increase it to improve performance if you target Spreadsheet instances with many rows and columns:

```js
CKEDITOR.replace( 'editor', {
	spreadsheet_licenseKey: 'yourLicenseKey',

	// Decrease the throttling timeout from 200ms to 50ms for better UX:
	spreadsheet_cellReferencesThrottle: 50
} );
```

## Paste from Excel and Google Sheets

Spreadsheets are able to understand bloated HTML representing tables from external applications like **Microsoft Excel** and **Google Sheets**. They are also able to convert it into much more semantic representation while keeping the most important information unchanged.

To convert any tabular data that comes from **Microsoft Excel**, **Google Sheets** or a plain HTML website to a Spreadsheet instance automatically after pasting it into the editor, use the `spreadsheet_enableAutoConversion` option described in the {@link guide/dev/integration/spreadsheets/README#automatically-convert-existing-tables Automatically Convert Existing Tables} section below.

## Automatically Convert Existing Tables

Any existing {@link features/table/README table} can be easily transformed into a spreadsheet with the {@link features/spreadsheets/README#converting-existing-tables Convert to Spreadsheet} option from the table context menu. However, manual conversion may become cumbersome when dealing with content containing dozens of tables. The entire procedure can thus be easily automated thanks to `spreadsheet_enableAutoConversion` configuration option:

```js
var editor = CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
	spreadsheet_licenseKey: 'yourLicenseKey',
	spreadsheet_enableAutoConversion: true
} );
```

To gain more control over which table elements are converted or to add custom conversion algorithm, one may use `addTableTransformation()` API method instead:

```js
CKEDITOR.plugins.spreadsheet.addTableTransformation( editor, function( element ) {
	// Here you can provide any custom code. If it returns "true"
	// table element will be converted into a Spreadsheet instance.
	return !!element.attributes[ 'data-spreadsheet' ];
} );
```

The above API uses {@linkapi CKEDITOR.filter#addTransformations} method underneath, adding special filter to CKEditor 4 instance.

<info-box hint="">
	Keep in mind that autoconversion (both added via configuration option or API) will be executed every time the data is set in the editor, so it will convert any plain HTML table. It makes sense to use it when entirely replacing the Table plugin with the Spreadsheet plugin.
	Also, since spreadsheets support only plain text cell values, every more complex structure (like lists) will be converted to plain text.
</info-box>

## Frontend Layer Integration

The standard CKEditor 4 output produces a regular HTML table from any spreadsheet widget. This gives huge flexibility thanks to using a standardized structure and allows integrating with a variety of tools or workflows out-of-the-box. However, there are cases where one would like to present the content created in CKEditor 4 with rich spreadsheets functionality on the frontend layer.

This is where the Spreadsheets frontend adapter comes into play. With a minimal configuration, one can simply recreate the spreadsheet with all its styling on the frontend layer.

This requires including the adapter scripts and the stylesheet which is present in the Spreadsheet plugin package (`adapters/frontend.js`):

```html
<link rel="stylesheet" href="pluginPath/libs/handsontable/dist/handsontable.full.min.css">

<script src="pluginPath/libs/handsontable/dist/handsontable.full.min.js"></script>
<script src="pluginPath/adapters/frontend.js"></script>
```

And initializing it with the license key:

```js
CKE4Spreadsheet.licenseKey = 'yourLicenseKey';
```

The frontend adapter will automatically transform all available spreadsheet instances. To transform only specific instances, additional configuration options should be set:

```js
CKE4Spreadsheet.autoConvert = false;
CKE4Spreadsheet.convert( document.querySelector( 'container' ) );
```

## Content Templates Plugin Integration

The Spreadsheet plugin allows you to create highly customized spreadsheet widget instances from scratch. However, there are also cases when it is more convenient to insert a ready-to-use spreadsheet with a predefined structure and formatting.

This is possible thanks to integrating the Spreadsheet plugin with the [Content Templates plugin](https://ckeditor.com/cke4/addon/templates). The Content Templates plugin should be enabled and correctly configured first, though:

```js
CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
    spreadsheet_licenseKey: 'yourLicenseKey',
    templates: 'spreadsheets',
    templates_files: [ 'spreadsheet_templates.js' ]
} );
```

Refer to the {@linkapi CKEDITOR.config#templates `templates`} and {@linkapi CKEDITOR.config#templates_files `templates_files`} configuration options API documentation for more details.

And the `spreadsheet_templates.js` file may look as follows:

```js
CKEDITOR.addTemplates( 'spreadsheets', {
    imagesPath: CKEDITOR.getUrl( 'path/to/images/folder/' ),
    templates: [ {
        title: 'Spreadsheet',
        image: 'template1.gif', // Thumbnail image used in the Content Templates dialog.
        description: '2x2 Spreadsheet',
        html: '' +
            '<table data-cke-spreadsheet-widget="1">' +
                '<thead>' +
                    '<tr>' +
                        '<th></th>' +
                        '<th data-sort-order="asc" data-sort-priority="0">Column 1</th>' +
                        '<th>Column 2</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr>' +
                        '<th>1</th>' +
                        '<td></td>' +
                        '<td data-type="numeric" data-type-pattern="0,0.00"></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<th>2</th>' +
                        '<td></td>' +
                        '<td data-type="numeric" data-type-pattern="0,0.00"></td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>'
    } ]
} );
```

The above template will allow inserting a 2x2 spreadsheet widget with the default ascending sorting order (in the first column) and the numeric data type (in the second column) with just two clicks. See it in action in the {@linkexample spreadsheets working "Creating Data Grids with Spreadsheet Plugin" sample}.

## Manipulating the Spreadsheet Widget Data via API

The Spreadsheet plugin uses the [Handsontable library](https://handsontable.com/) internally. While the Handsontable API can be accessed directly with `CKEDITOR.instances.editor.plugins.spreadsheet.Spreadsheet`, it is not recommended since any direct API calls may break the integration.

For that reason, CKEditor exposes its own API that can be used to insert, update and fetch the data from any spreadsheet widget.

### Inserting a New Spreadsheet Widget

To initialize a spreadsheet instance at the current editor selection:

```js
CKEDITOR.plugins.spreadsheet.toSpreadsheet( editor, [
    [ 1.1, 1.2, 1.3 ],
    [ 2.1, 2.2, 2.3 ],
    [ 3.1, 3.2, 3.3 ]
] );
```

This method accepts an array of arrays as the data source.

### Updating Data in an Existing Spreadsheet Widget

To load new data into an existing spreadsheet widget:

```js
CKEDITOR.plugins.spreadsheet.loadData( widget, [
    [ 1.1, 1.2, 1.3 ],
    [ 2.1, 2.2, 2.3 ],
    [ 3.1, 3.2, 3.3 ]
] );
```

<info-box warning>
    Please note that this method will **replace the entire existing spreadsheet widget data** and reset its styling, data types and formatting.
</info-box>

### Fetching Data from the Spreadsheet Widget

To get the data from an existing spreadsheet widget:

```js
var data = CKEDITOR.plugins.spreadsheet.toData( widget );

console.log( data );
// [
//	[ 1.1, 1.2, 1.3 ],
//	[ 2.1, 2.2, 2.3 ],
//	[ 3.1, 3.2, 3.3 ]
// ]
```

The above API call returns the spreadsheet widget data as an array of arrays.

## Browser Support

The spreadsheet plugin is fully supported in the latest **Chrome**, **Firefox**, **Safari** and **Edge** browsers.

Support for **Internet Explorer 11** is limited: the plugin is usable but there are known, visible issues.

If your application requires wider support for Internet Explorer 11 browser or you have encountered any issues using it, please [contact us](https://ckeditor.com/contact/).

## Functionality Overview

Refer to the {@link features/spreadsheets/README Creating Data Grids with Spreadsheet Plugin} article for an overview of all available features of the Spreadsheet plugin.

## Demo

See the {@linkexample spreadsheets working "Creating Data Grids with Spreadsheet Plugin" sample} that showcases the most important features like styling, sorting, conditional formatting, formulas and more.
