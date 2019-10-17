---
category: inserting-content
order: 70
url: features/spreadsheets
menu-title: Spreadsheets
meta-title-short: Spreadsheet plugin features overview
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
* Coulmns/row resizing and moving (TODO not sure if we already have this).

Below you can see an image inserted into the editor content with Easy Image. When you hover it with your mouse, the editable areas (the image and its caption) become outlined.

{@img assets/img/easyimage_01.png Easy Image in the editor content}

You can find some additional information about the Easy Image service in the [Cloud Services - Easy Image Overview](https://docs.ckeditor.com/cs/latest/guides/overview.html#easy-image) guide.

## Custom Styles with Classes

The appearance of images inserted with Easy Image can be easily altered by using custom styles. These styles can be applied through the {@link features/balloontoolbar/README balloon toolbar} connected with every Easy Image widget or with the context menu. By default there are two styles available:

*  Full Size Image &ndash; It stretches the image to 100% of the editor width.
*  Side Image &ndash; It changes the image width to 50% of the editor width and puts it aside, on the right.

The list of enabled styles can be changed by the editor's implementer.

{@img assets/img/easyimage_02.png Easy Image styles in the balloon toolbar and context menu}

## Changing Alternative Text

Easy Image allows for changing the default alternative text for the image. Providing a good alternative text for an image is one of the fundamental {@link guide/dev/a11y/README accessibility techniques}, being one of {@link guide/dev/wcag/README#text-alternative success criteria of the WCAG 2.0 standard}.

{@img assets/img/easyimage_03.png Alternative text set in the Easy Image plugin}

## Easy Image Demo

See the {@linksdk easyimage working "Easy Image Plugin" sample} that showcases the Easy Image plugin with its uploading, captioning and custom styles.

## Related Features

Refer to the following resources for more information about image support:

* {@link features/image/README Default Image Plugin} offers pixel-perfect image alignment with vertical and horizotal whitespace, configurable image border and file manager integration.
* {@link features/image2/README Enhanced Image} offers a clean UI with image captions, drag and drop positioning, click and drag resizing and file manager integration.
* {@link guide/dev/integration/easyimage/README Easy Image Integration} explains how to enable the cloud services provider for Easy Image as well as how to customize some of its features.
