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
* Inserting spreadsheets using predefined templates (see {@link guide/dev/integration/spreadsheets/README#templates-plugin-integration Content Template plugin integration guide}).
* Converting existing tables to spreadsheet instances and vice versa.
* Single and multi-column sorting.
* Basic data styling like bold, italics, underline and so on.
* Defining data types and formatting with support for validation invalid data.
* Inserting formulas.
* Applying various conditional formatting rules to single/multiple cells, entire columns or spreadsheets.

## Inserting spreadsheet widget

Spreadsheet widget can be inserted via spreadsheet dialog or using Content Templates plugin with prepared spreadsheet templates. Below you can see simple 3x3 spreadsheet widget right after being inserted into editor.

// TODO image1 - empty 3x3 spreadsheet widget

## Converting existing tables

If you already have tables in your content and plan to use Spreadsheet plugin there is no need to recreate entire table from scratch as you may simply convert them to spreadsheet widget instance:

// TODO image2 - table context menu with Convert option visible

## Sorting

Sorting is a must to efficently analyze and present any tabular data, thus spreadsheet plugin allows for sorting data based on single or multiple columns:

// TODO image3 - spreadsheet with multisort visible

## Basic styles support

While spreadsheets are mostly about data, its presentation is also very important. Basic styles like bold or italics comes handy when trying to highlight or make more visible some parts of data or single spreadsheet cells:

// TODO image4 - spreadsheet with styling

## Data types, formats and validation

Data is the essence of every spreadsheet or data-grid element. This means it requires correct typing so for example formulas and conditional formatting knows how to handle it. Spreadsheet plugin provides few data types like Text, Number, Date, Time, Password and various formats so visually it can be presented in various ways. Additionally, each data type has a strict validation so it is clearly visible when something is not right with the data:

// TODO image5 - spreadsheet with various data types / formats / validation

## Formulas

Formulas provide a way to calculate many different things and automate data processing in any spreadsheet. Just type `=` and the rest of the formula, easy as one two three!

// TODO image6 - spreadsheet with formulas (one calculated on in preview)

## Conditionl formatting

Need to add some colors to your data? Conditional formatting allows to format data (any cell, column or entire table) based on its content. You may mark cells red when they are empty, make them green when theri value is above any threshold or blue if the cell value contains specific text.

Conditional formatting comes with dozen of rules when for each cell any number of rules can be set up allowing for complex formatting and handling advanced cases.

// TODO image7 - conditional formatting

## Spreadsheets Demo

See the {@linksdk spreadsheets working "CKEditor 4 Spreadsheets" sample} that showcases the most important features like styling, sorting, conditional formatting, formulas and more.

## Related Features

Refer to the following resources for more information about tabular data support in CKEditor 4:

* {@link features/pastefromexcel/README Paste from Excel Plugin} allows you to also paste content from **Microsoft Excel** and maintain original content structure and formatting.
* {@link features/table/README Table Plugin} provides support for creating and editing complex tables including features like resizing, styling, custom selection and complex structural changes (merge, split, insert, remove cells, rows, columns).
* {@link guide/dev/integration/spreadsheets/README Spreadsheets Integration} explains how to enable and use Spreadsheet plugin in CKediotr 4 as well as how to customize some of its features.