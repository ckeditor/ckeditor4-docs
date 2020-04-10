---
category: inserting-content
order: 70
url: features/spreadsheets
menu-title: Spreadsheets
meta-title-short: Spreadsheet plugin
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Creating Data Grids with Spreadsheet Plugin

<info-box info="">
	This feature is provided as a commercial product and provides integration with our partner solution, [Handsontable](https://handsontable.com/). A license can be purchased [here](https://ckeditor.com/contact/).

	The Spreadsheet plugin is compatible with CKEditor 4 starting from version **4.13**. It is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site. Follow the {@link guide/dev/integration/spreadsheets/README Spreadsheets Integration} guide to enable it.
</info-box>

The optional [Spreadsheet](https://ckeditor.com/cke4/addon/spreadsheet) plugin lets you insert customizable spreadsheet widgets into your WYSIWYG editor. It provides support for:

* Inserting spreadsheets with and without a header row or column and with any number of rows and columns.
* {@link features/spreadsheets/README#cell-referencing Referencing cells} inside the editor content using smart completion.
* {@link features/spreadsheets/README#pasting-from-microsoft-excel-and-google-sheets Autoconverting tabular data} pasted from Microsoft Excel and Google Sheets into a Spreadsheet instance.
* {@link features/spreadsheets/README#converting-existing-tables Converting existing tables} to spreadsheet instances and vice versa.
* Inserting spreadsheets using predefined templates.
* {@link features/spreadsheets/README#spreadsheet-structure-manipulation Spreadsheet structure manipulation} (adding or removing rows and columns).
* {@link features/spreadsheets/README#resizing-rows-and-columns Resizing rows and columns}.
* {@link features/spreadsheets/README#renaming-rows-and-columns-headers Renaming rows and columns headers}.
* Single and multi-column {@link features/spreadsheets/README#sorting sorting}.
* {@link features/spreadsheets/README#basic-styles-support Basic data styling} like bold, italic, underline and so on.
* {@link features/spreadsheets/README#advanced-styles-support Advanced styles support} like text font, cell colors and so on.
* Selecting {@link features/spreadsheets/README#data-types-formats-and-validation cell type and formatting with data validation support}.
* Using {@link features/spreadsheets/README#formulas formulas}.
* {@link features/spreadsheets/README#auto-fill-in-all-directions Auto filling} rows and columns.
* Applying various {@link features/spreadsheets/README#conditional-formatting conditional formatting} rules to single and multiple cells, entire columns or spreadsheets.
* Advanced {@link features/spreadsheets/README#duplicating-spreadsheet-part-with-copy-and-paste copying and pasting}.

{@img assets/img/spreadsheet_01.png A spreadsheet inserted into CKEditor 4 WYSIWYG editor.}

The Spreadsheet plugin allows you to create intelligent, data-driven documents right inside your WYSIWYG editor. This makes it a perfect solution for financial, auditing, engineering, technical and science industries.

## Cell Referencing

What makes Spreadsheets special? First-class integration with content editing! You can start typing `$` to see cell suggestions from the spreadsheets inside your document. Cell references are a living part of your document, which means that editing the spreadsheet cell value, including via the API, will also update all the references automatically. What is even more convenient, you do not need to see the spreadsheet instance in a long document. Smart suggestions and fuzzy matching will simplify connecting the data from any spreadsheet present in the editor with the editor content.

{@img assets/img/spreadsheet_14.png Spreadsheet plugin widget with cell references.}

To display the cell referencing suggestion panel, just type the `$` sign (see {@link guide/dev/integration/spreadsheets/README#customizing-the-matching-pattern how to reconfigure the default matching pattern}). By default, the suggestion panel will show up to 10 items ({@link guide/dev/integration/spreadsheets/README#limiting-or-increasing-the-number-of-suggestions the number of suggestions is configurable}), narrowed down based on the closest pattern match and the spreadsheet cell order, starting from the top-left corner.


Each suggestion consists of six parts. For example, a suggestion like <span style="color:hsl(0, 0%, 45%);">$</span><span style="color:hsl(113, 69%, 26%);">spreadsheet1</span><span style="color:hsl(0, 0%, 45%);">!</span><span style="color:hsl(286, 44%, 47%);">Symbol</span><span style="color:hsl(0, 0%, 45%);">:</span><span style="color:hsl(214, 93%, 41%);">11</span> consists of:

<ol>
	<li>The suggestion prefix (<span style="color:hsl(0, 0%, 45%);">$</span>) &ndash; Opens the suggestions panel.</li>
	<li>The spreadsheet name (<span style="color:hsl(113, 69%, 26%);">spreadsheet1</span>) &ndash; Filters suggestions by spreadsheet names (which can be set via the dialog during the spreadsheet insertion).</li>
	<li>The cell prefix (<span style="color:hsl(0, 0%, 45%);">!</span>) &ndash; Separates the spreadsheet name from the column and row names.</li>
	<li>The column name (<span style="color:hsl(286, 44%, 47%);">Symbol</span>) &ndash; Filters suggestions by column names.</li>
	<li>The column and row name separator (<span style="color:hsl(0, 0%, 45%);">:</span>) &ndash; Separates the column name from the row name.</li>
	<li>The row name (<span style="color:hsl(214, 93%, 41%);">11</span>) &ndash; Filters suggestions by row names.</li>
</ol>

You can try out this feature in the {@linksdk spreadsheets#cell-referencing dedicated sample}.

## Conditional Formatting

Do you need to add some colors to your data? Conditional formatting allows formatting data (any cell, column or entire data grid) based on its content. For example, you can mark cells red when they are empty, make them green when their value is above some threshold or blue if the cell value contains a specific text.

Conditional formatting comes with a dozen of predefined rules. Any number of rules can be set up for each cell, which allows for complex formatting and handling advanced cases. You can even drag and drop conditional formatting rules, changing their priority to easily create features like a color scale. Put your hands on the color scale example in the {@linksdk spreadsheets working Spreadsheets demo}.

{@img assets/img/spreadsheet_10.png Spreadsheet plugin with the Conditional Formatting dialog.}

## Pasting from Microsoft Excel and Google Sheets

Moving your tabular data from Microsoft Excel or Google Sheets is as simple as copying and pasting it into the editor. Once the automatic tables conversion is enabled, Spreadsheets will take care of converting any table to an advanced Spreadsheet instance with all features available.

## Inserting Spreadsheet Widget

The spreadsheet {@link guide/dev/deep_dive/widgets/README widget} can be inserted into your editor content with the Spreadsheet Properties dialog opened with the Insert Spreadsheet toolbar button (<img class="inline" src="%BASE_PATH%/assets/img/spreadsheet-button.png" alt="Insert Spreadsheet toolbar button">). It can also be added through a predefined spreadsheet template when {@link guide/dev/integration/spreadsheets/README#content-templates-plugin-integration using the Content Templates plugin}.

Below you can see a simple 3x3 spreadsheet widget right after being inserted into the WYSIWYG editor.

{@img assets/img/spreadsheet_02.png Spreadsheet plugin widget inserted into CKEditor 4 WYSIWYG editor.}

## Converting Existing Tables

If you already have {@link features/table/README tables} in your content and plan to use the Spreadsheet plugin, there is no need to recreate the entire table from scratch as you may simply convert it to a spreadsheet widget instance:

{@img assets/img/spreadsheet_03.png Spreadsheet plugin converts existing table context menu option.}

Converting all existing tables at once automatically can be also done via {@link guide/dev/integration/spreadsheets/README#automatically-convert-existing-tables configuration option or an API call}.

## Spreadsheet Structure Manipulation

The Spreadsheet plugin allows for easy data structure manipulation with options such as **Insert row above**, **Insert row below**, **Insert column left**, **Insert column right**, **Remove row** or **Remove column**.

{@img assets/img/spreadsheet_04.png Spreadsheet plugin context menu with rows and columns manipulation options}

## Resizing Rows and Columns

Some data points or observations may contain quite long data which might be inconvenient or even unreadable in narrow rows or columns. To solve this issue, you can resize entire columns and rows.

{@img assets/img/spreadsheet_05.png The row and column resizing mechanism of the Spreadsheet plugin.}

## Renaming Rows and Columns Headers

It is important to label your data in a clear and understandable way. Spreadsheet plugin allows easy rows and columns headers renaming via a simple dialog:

{@img assets/img/spreadsheet_colrow_rename.png The rows and columns headers renaming mechanism in the Spreadsheet plugin.}

## Basic Styles Support

While spreadsheets are mostly about data, their presentation is also very important. {@link features/basicstyles/README Basic styles} like bold, italic or alignment come handy when trying to highlight or make some parts of data or individual spreadsheet cells more visible:

{@img assets/img/spreadsheet_07.png Spreadsheet plugin widget with basic styling.}

## Advanced Styles Support

Spreadsheets are integrated with the [Color Button](https://ckeditor.com/cke4/addon/colorbutton) and [Font](https://ckeditor.com/cke4/addon/font) features. This allows for changing the font family, font size, background and text colors for any spreadsheet instance present in the editor.

{@img assets/img/spreadsheet_13.png Spreadsheet plugin widget with advanced styling.}

## Data Types, Formats and Validation

Data is the essence of every spreadsheet or data grid element. The Spreadsheet plugin provides a few data types:

* **Text** &ndash; The default type formatted as a plain text that allows any input.
* **Numeric** &ndash; Reserved for numeric values like accounting records. You can choose one from of the available patterns to format data, like percent, financial, currency, etc.
* **Date** &ndash; Type for presenting dates with a few formats available.
* **Time** &ndash; Time format providing conversion between 12h and 24h format.
* **Password** &ndash; Password type used for masking cell data.

Additionally, each data type has a strict validation so it is clearly visible when something is not right with the data.

{@img assets/img/spreadsheet_08.png Spreadsheet plugin with the Cell Type and Format dialog.}

## Sorting

Sorting is a must to efficiently analyze and present any tabular data, thus the Spreadsheet plugin allows for sorting data based on single or multiple columns:

{@img assets/img/spreadsheet_06.png Spreadsheet plugin widget with multisort.}

To sort by a single column, just click the column header. To use multisort, any column which should be added to sorting should be clicked while the <kbd>Ctrl</kbd> key is pressed.

## Formulas

Formulas provide support for mathematical expression calculations based on input data. Just type `=` and the rest of the formula, using arithmetic expressions and cell references to customize the output. Supported features:

* Any numbers, negative and positive, as float or integer.
* Arithmetic operations such as: `+`, `-`, `/`, `*`, `%`, `^`.
* Logical operations such as: `AND()`, `OR()`, `NOT()`, `XOR()`.
* Comparison operations such as: `=`, `>`, `>=`, `<`, `<=`, `<>`.
* All JavaScript Math constants such as: `PI()`, `E()`, `LN10()`, `LN2()`, `LOG10E()`, `LOG2E()`, `SQRT1_2()`, `SQRT2()`.
* Error handling: `#DIV/0!`, `#ERROR!`, `#VALUE!`, `#REF!`, `#NAME?`, `#N/A`, `#NUM!`.
* String operations such as: `&` (concatenation eq. `=-(2&5)` will return `-25`).
* Relative and absolute cell references such as: `A1`, `$A1`, `A$1`, `$A$1`.
* Built-in variables such as: `TRUE`, `FALSE`, `NULL`.
* Custom variables.
* Nested functions.
* Dynamic updates.

{@img assets/img/spreadsheet_09.png Spreadsheet plugin with formula preview.}

Refer to the official [Handsontable formulas reference](https://handsontable.com/docs/latest/demo-formula-support.html) for more details.

## Auto Fill in All Directions

Auto fill is a mechanism that allows for easy duplication of content in order to fill empty spreadsheet rows and columns (or both at the same time). The little square (fill handle) in the bottom right-hand corner of the selected cell can be dragged to repeat the values from the cell, just like it can be done in Microsoft Excel or Google Sheets.

{@img assets/img/spreadsheet_11.png A data grid with the auto fill feature visible.}

## Duplicating Spreadsheet Part with Copy and Paste

Apart from creating new spreadsheet instances from scratch or from templates, it is easy to duplicate a part or an entire existing spreadsheet with a simple copy and paste (using <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>C</kbd> and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>V</kbd>).

{@img assets/img/spreadsheet_12.png A partially duplicated spreadsheet instance created with copy and paste.}

## Frontend Integration

One of the main features of a WYSIWYG editor is the ability to show the created content in a way that it appears almost identical as during the edition. With the Spreadsheet plugin is it possible to show a regular HTML table with all the styling and colors preserved. Another possibility is to show a fully interactive spreadsheet instance (the same as used during editing) with all styles. The latter option is available thanks to the {@link guide/dev/integration/spreadsheets/README#frontend-layer-integration frontend integration adapter}.

## Spreadsheets Demo

See the {@linksdk spreadsheets working "Creating Data Grids with Spreadsheet Plugin" sample} that showcases the most important features like data styling, sorting, conditional formatting, formulas and more.

## Related Features

Refer to the following resources for more information about tabular data support in CKEditor 4:

* The {@link features/pastefromexcel/README Paste from Excel plugin} allows you to also paste content from Microsoft Excel and maintain original content structure and formatting.
* The {@link features/table/README Table plugin} provides support for creating and editing complex tables including features like resizing, styling, custom selection and complex structural changes (merge, split, insert, remove cells, rows, columns).
* The {@link guide/dev/integration/spreadsheets/README Spreadsheets Integration} guide explains how to enable and use the Spreadsheet plugin in CKEditor 4 as well as how to customize some of its features.
