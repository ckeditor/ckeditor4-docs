<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Table Support with Column Resizing

<p class="requirements">
	Features described in this article are provided through several plugins that may not be included in the CKEditor preset available from the <a href="http://ckeditor.com/download">Download</a> site which you are using and may <a href="#!/guide/dev_plugins">need to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

CKEditor support for creating and editing tables is provided by three separate table-related plugins as well as two helper plugins.

* The [Table](http://ckeditor.com/addon/table) plugin &ndash; adds the **Table Properties** dialog window with support for creating tables and setting basic table properties, such as:
	* Number of rows and columns.
	* Table width and height.
	* Cell padding and spacing.
	* Table headers setting.
	* Table border size.
	* Table alignment on the page.
	* Table caption and summary.
* The [Table Tools](http://ckeditor.com/addon/tabletools) plugin &ndash; adds a more advanced context menu for table items and the **Cell Properties** dialog window with support for features such as:
	* Cell type.
	* Cell width and height.
	* Word wrap settings.
	* Horizontal and vertical alignment.
	* Row and column span.
	* Cell and border color.
	* Inserting and deleting cells, rows and columns.
	* Merging and splitting cells horizontally and vertically.
* The [Table Resize](http://ckeditor.com/addon/tableresize) plugin &ndash; adds support for column resizing with your mouse.

The following two helper plugins extend the Table Properties and Cell Properties dialog windows with additional features:

* The [Color Dialog](http://ckeditor.com/addon/colordialog) plugin &ndash; provides a user-friendly way to select the cell background and border color through a dedicated **Select Color** dialog window with a color table.
* The [Advanced Tab for Dialogs](http://ckeditor.com/addon/dialogadvtab) plugin &ndash; provides the **Advanced** tab for the Table Properties dialog window and allows for setting the table ID, language direction, inline CSS style and stylesheet class. 

The **Table** and **Table Tools** plugins are included in the Standard and Full installation packages. **Color Dialog** and  **Advanced Tab for Dialogs** are only available in the Full distribution, while the **Table Resize** plugin is optional &mdash; they may be [added to your CKEditor build](#!/guide/dev_plugins).

The following image presents a table that you can create in CKEditor along with the table context menu options provided by the Table and Table Tools plugins.

{@img table_01.png}

## Table Resizing with Your Mouse

When enabled, the optional Table Resize plugin adds support for column resizing with your mouse.

You need to hover your mouse over the column border to see the cursor change to <img class="inline"  src="guides/dev_table/col_resize_cursor.png"> to indicate that the column can be resized. Click and drag your mouse to set the desired column width.

## Table Support Demo 

See the [working "Table Support with Column Resizing" sample](http://sdk.ckeditor.com/samples/table.html) that showcases CKEditor support for creating and editing tables, including table column resizing with your mouse.