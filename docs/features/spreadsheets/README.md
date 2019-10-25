---
category: inserting-content
order: 70
url: features/spreadsheets
menu-title: Spreadsheets
meta-title-short: Spreadsheet plugin
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Spreadsheet plugin features overview

<info-box info="">
	This feature is compatible with **CKEditor 4** starting from `4.13` version. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site. Follow the {@link guide/dev/integration/spreadsheets/README Spreadsheets Integration} guide to enable it.
</info-box>

The optional [Spreadsheet](https://ckeditor.com/cke4/addon/spreadsheet) plugin lets you insert customizable spreadsheet widgets, that has the following capabilities:

* Inserting spreadsheets with and without header row/column and with any number of rows/columns.
* Inserting spreadsheets using predefined templates.
* Converting existing tables to spreadsheet instances and vice versa.
* Spreadsheet structure manipulation (adding/removing rows ans columns).
* Rows and columns resizing.
* Single and multi-column sorting.
* Basic data styling like bold, italics, underline and so on.
* Selecting cell types and formatting with data validation support.
* Formulas support.
* Auto filling.
* Applying various conditional formatting rules to single/multiple cells, entire columns or spreadsheets.
* Advanced copy/paste support

## Inserting spreadsheet widget

Spreadsheet widget can be inserted via spreadsheet dialog or using {@link guide/dev/integration/spreadsheets/README#templates-plugin-integration Content Template} plugin with prepared spreadsheet templates. Below you can see simple 3x3 spreadsheet widget right after being inserted into editor.

{@img assets/img/spreadsheets1.png Spreadsheet plugin widget}

## Converting existing tables

If you already have tables in your content and plan to use Spreadsheet plugin there is no need to recreate entire table from scratch as you may simply convert them to spreadsheet widget instance:

{@img assets/img/spreadsheets2.png Spreadsheet plugin convert existing table context menu option}

## Spreadsheet structure manipulation

Spreadsheet plugin allows for easy structure manipulation with options like **Insert row above**, **Insert row below**, **Insert column left**, **Insert column right**, **Remove row**, **Remove column**.

{@img assets/img/spreadsheets10.png Spreadsheet plugin context menu with rows and columns manipulation options}

## Rows and columns resizing

Some data points or observations may contain quite long data which might be inconvenient or even unreadable in narrow rows or columns, thus it's also possible to resize whole columns and rows.

{@img assets/img/spreadsheets11.png Spreadsheet plugin rows/columns resizing mechanism}

## Sorting

Sorting is a must to efficiently analyze and present any tabular data, thus Spreadsheet plugin allows for sorting data based on single or multiple columns.

{@img assets/img/spreadsheets3.png Spreadsheet plugin widget with multisort}

Sorting by single column is easy as clicking column header. To use multisort, any column which should be added to sorting should be clicked while <kbd>Ctrl</kbd> is pressed.

## Basic styles support

While spreadsheets are mostly about data, its presentation is also very important. Basic styles like bold, italics or alignment comes handy when trying to highlight or make more visible some parts of data or single spreadsheet cells.

{@img assets/img/spreadsheets4.png Spreadsheet plugin widget with basic styling}

## Data types, formats and validation

Data is the essence of every spreadsheet or data-grid element. Spreadsheet plugin provides few data types:

* Text - default type formatted as a plain text which allows any input.
* Numeric - reserved for numeric values like accounting records. You can choose one from available patterns to format data like percentage, financial, currency, etc.
* Date - type for presenting dates with few formats available.
* Time - time format providing conversion between 12h and 24h format.
* Password - password type used for masking cell data.

Additionally, each data type has a strict validation so it is clearly visible when something is not right with the data.

{@img assets/img/spreadsheets5.png Spreadsheet plugin with Cells Type and Format dialog}

## Formulas

Formulas provides support for mathematical expression calculations based on input data. Just type `=` and the rest of the formula, using arithmetic expression and cell references to customize the output. Supported features:

* Any numbers, negative and positive as float or integer.
* Arithmetic operations such as: `+`, `-`, `/`, `*`, `%`, `^`.
* Logical operations such as: `AND()`, `OR()`, `NOT()`, `XOR()`.
* Comparison operations such as: `=`, `>`, `>=`, `<`, `<=`, `<>`.
* All JavaScript Math constants such as: `PI()`, `E()`, `LN10()`, `LN2()`, `LOG10E()`, `LOG2E()`, `SQRT1_2()`, `SQRT2()`.
* Error handling: `#DIV/0!`, `#ERROR!`, `#VALUE!`, `#REF!`, `#NAME?`, `#N/A`, `#NUM!`.
* String operations such as: `&` (concatenation eq. `=-(2&5)` will return `-25`).
* Relative and absolute cell references such as: `A1`, `$A1`, `A$1`, `$A$1`.
* Build-in variables such as: `TRUE`, `FALSE`, `NULL`.
* Custom variables.
* Nested functions.
* Dynamic updates.

{@img assets/img/spreadsheets6.png Spreadsheet plugin with formula preview}

_For full formulas documentation please see official [Handsontable formulas reference](https://handsontable.com/docs/latest/demo-formula-support.html)_.

## Conditional formatting

Do you need to add some colors to your data? Conditional formatting allows formatting data (any cell, column or entire table) based on its content. You can mark cells red when they are empty, make them green when their value is above any threshold or blue if the cell value contains a specific text.

Conditional formatting comes with dozen of rules when for each cell any number of rules can be set up allowing for complex formatting and handling advanced cases. You can even drag and drop conditional formatting rules changing its priority to easily create features like a color scale. Put your hands on the color scale example on {@linksdk spreadsheets working "CKEditor 4 Spreadsheets" demo}.

{@img assets/img/spreadsheets7.png Spreadsheet plugin with Conditional formatting dialog}

## Auto fill in all directions

Auto fill is a mechanism which allows easy duplication of content to fill empty spreadsheet rows and columns (or both at the same time!). The little square (fill handle) in the corner of the selected cell can be dragged to repeat the values from the cell, just like it can be done in Excel or Google Sheets.

{@img assets/img/spreadsheets12.png Spreadsheet plugin with auto fill feature visible}

## Duplicating spreadsheet part with copy/paste

Apart from creating new spreadsheets instances from scratch or from templates, it is easy to duplicate part (or entire) existing spreadsheet with simple copy and paste (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>C</kbd>).

{@img assets/img/spreadsheets13.png Partialy duplicated spreadsheet instance with copy/paste}

## Frontend  integration

One of the main features of WYSIWYG editor is the ability to show the created content in a way that it appears almost identical as during edition. With Spreadsheet plugin is it possible to show regular HTML table with all the styling and colors preserved. The other possibility is to show fully interactive spreadsheet instance (the same as used during editing) with all styles - this option is available thanks to {@link guide/dev/integration/spreadsheets/README#frontend-layer-integration frontend integration adapter}.

## Spreadsheets Demo

See the {@linksdk spreadsheets working "CKEditor 4 Spreadsheets" sample} that showcases the most important features like styling, sorting, conditional formatting, formulas and more.

## Related Features

Refer to the following resources for more information about tabular data support in CKEditor 4:

* {@link features/pastefromexcel/README Paste from Excel Plugin} allows you to also paste content from **Microsoft Excel** and maintain original content structure and formatting.
* {@link features/table/README Table Plugin} provides support for creating and editing complex tables including features like resizing, styling, custom selection and complex structural changes (merge, split, insert, remove cells, rows, columns).
* {@link guide/dev/integration/spreadsheets/README Spreadsheets Integration} explains how to enable and use Spreadsheet plugin in CKediotr 4 as well as how to customize some of its features.
