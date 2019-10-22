---
category: integration
order: 25
url: guide/dev_spreadsheets
menu-title: Spreadsheets
meta-title-short: Spreadsheet plugin for CKEditor 4
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 advanced data-grid functionality with Spreadsheet plugin

<info-box info="">
	This feature is compatible with **CKEditor 4** starting from `4.13` version. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site. Read below how to to enable it.
</info-box>

**Spreadsheet plugin** offers **Excel** like functionality right inside CKEditor 4. It allows for creating complex data sheets which integrates smoothly with CKEditor existing functionality and content, providing **styling**, **data types and formatting**, **formulas**, **conditional formatting** and more.

## Quick Start

### Node Package Manager

**Spreadsheet plugin** for CKEditor 4 is available through NPM. To use it, install the `ckeditor4-plugin-spreadsheet` npm package as a dependency of your project:

```bash
npm install --save ckeditor4-plugin-spreadsheet
```

If CKEditor 4 was also installed through NPM (`ckeditor4` package) in your project, the plugin will create a symbolic link itself in CKEditor 4 `plugins/` directory so you don't have to move or copy any files.

If not, copy or link the `spreadsheet` folder from `ckeditor4-plugin-spreadsheet` package to CKEditor 4 `plugins/` directory. If you prefer not to touch any files, you may use [`CKEDITOR.plugins.addExternal`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins.html#method-addExternal) API instead, to load it directly from `node_modules/` directory:

```js
CKEDITOR.plugins.addExternal( 'spreadsheet', '/node-modules/ckeditor4-plugin-spreadsheet/spreadsheet/' );
```

### Custom build with Online Builder

**Spreadsheet plugin** is also available in the [official CKEditor 4 addons repository](https://ckeditor.com/cke4/addons/plugins/all). This allows to automatically include it in any custom build which is created via [online builder](https://ckeditor.com/cke4/builder).

To help you in getting started, below you can find direct links to the online builder with Spreadsheet plugin already included:

 * [Online builder &ndash; Standard preset with Spreadsheet plugin](https://ckeditor.com/builder/TODO)
 * [Online builder &ndash; Full preset with Spreadsheet plugin](https://ckeditor.com/builder/TODO)

If you prefer to simply download a zip package:

 * [Standard preset with Spreadsheet plugin](https://ckeditor.com/builder/download/TODO)
 * [Full preset with Spreadsheet plugin](https://ckeditor.com/builder/download/TODO)

### Download manually from Addson repository

If, for any reason you prefer to download the plugin code manually, you can do this via addons repository. Simply download the [Spreadsheet plugin](https://ckeditor.com/cke4/addon/spreadsheet) and place it in CKEditor 4 `plugins/` directory.

### Enable Spreadsheet plugin

<info-box info="">
	Since Spreadsheet plugin is commercial CKEditor 4 plugin, please request <a href="https://orders.ckeditor.com/trial/cke4-spreadsheets">free trial license key</a> in order to test and use it.
</info-box>

The setup is straightforward as enabling plugin and adding license key in CKEditor 4 configuration:

```js
CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
    spreadsheet_licenseKey: 'yourLicenseKey'
} );
```

The value of `spreadsheet_licenseKey` is unique for each website and can be found in the CKEditor Ecosystem dashboard (go to Website management and press the CKEditor configuration button).

This is all. If you are having trouble in setting up Spreadsheet plugin, please [contact us](https://ckeditor.com/contact/).

## Templates plugin integration

**Spreadsheet plugin** allows to create highly customized spreadsheet widget instances from scratch. However, there are also cases when it is more convenient to insert ready to use spreadsheets with defined structure and formatting.

This is possible thanks to integrating Spreadsheet plugin with [Content Templates plugin](https://ckeditor.com/cke4/addon/templates). The Templates plugin should be enabled and correctly configured:

```js
CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
    spreadsheet_licenseKey: 'yourLicenseKey',
    templates: 'spreadsheets',
    templates_files: [ 'spreadsheet_templates.js' ]
} );
```

See {@linkapi CKEDITOR.config#templates `templates`} and {@linkapi CKEDITOR.config#templates_files `templates_files`} API documentation for more details.

And the `spreadsheet_templates.js` file may look as follows:

```js
CKEDITOR.addTemplates( 'spreadsheets', {
    imagesPath: CKEDITOR.getUrl( 'path/to/images/folder/' ),
    templates: [ {
        title: 'Spreadsheet',
        image: 'template1.gif', // Thumbnail image used in Templates dialog.
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

The above will allow inserting 2x2 Spreadsheet with default ascending sorting order (on first column) and numeric data type (in second column) with just two clicks. See it in action on [Spreadsheets sample page](TODO//Sample page link).

## Convert existing tables automatically

Any existing table can be easily transformed with `Convert to Spreadsheet` option from table context menu. However, it may become cumbersome when dealing with content containing dozen of tables. The entire procedure can be easily automated thanks to CKEditor 4 data processing pipeline.


```js
var editor = CKEDITOR.replace( 'editor', {
    extraPlugins: 'spreadsheet',
    spreadsheet_licenseKey: 'yourLicenseKey'
} );

editor.on( 'toHtml', function( evt ) {
  evt.data.dataValue.forEach( function( node ) {
    if ( node.name && node.name == 'table' ) {
      node.attributes[ 'data-cke-spreadsheet-widget' ] = 1;
    }
  } );
}, null, null, 14 );
```

Adding special `data-cke-spreadsheet-widget` attribute, allows Spreadsheet plugin to identify regular table and transform it into spreadsheet widget.

<info-box hint="">
	Keep in mind that this code will be executed every time data is set in the editor, so it will convert any plain HTML table. It makes sense to use when entirely replacing Table plugin with Spreadsheet plugin.
	Also, since spreadsheets support only plain text cell values, every more complex structure (like lists) will bo converted to plain text.
</info-box>

## Frontend layer integration

The standard CKEditor 4 output produces regular HTML table from any spreadsheet widget. This gives huge flexibility thanks to using standardized structure and allows integrating with variety of tools, workflows, etc, out of the box. However, there are cases where one would like to present the content created in CKEditor 4 with rich spreadsheets functionality on the frontend layer.

This is where Spreadsheets frontend adapter comes into play. With minimal configuration, one may simply recreate the spreadsheet with all it's styling on the frontend layer.

This requires including adapter script which is present in plugin package (`adapters/frontend.js`):

```html
<script src="pluginPath/libs/handsontable.min.js"></script>
<script src="pluginPath/adapters/frontend.js"></script>
```

And initializing it with license key:

```js
CKE4Spreadsheet.licenseKey = 'yourLicenseKey';
```

Adapter will automatically transform all available spreadsheet instances. To transform only specific instances, additional options should be set:

```js
CKE4Spreadsheet.autoConvert = false;
CKE4Spreadsheet.convert( document.querySelector( 'container' ) );
```

## Browser support

Spreadsheet plugin is fully supported on latest **Chrome**, **Firefox** and **Safari** browsers. **Internet Explorer 11** browser support is limited, plugin is usable but there are know, visible issues. **Edge** browser is not supported ate the moment, however we are looking into providing support there too.

## Features overview

For all available features of Spreadsheet plugin refer to {@link features/spreadsheets/README Features Overview – Spreadsheets}.

## Demo

See the {@linksdk spreadsheets working "CKEditor 4 Spreadsheets" sample} that showcases the most important features like styling, sorting, conditional formatting, formulas and more.
