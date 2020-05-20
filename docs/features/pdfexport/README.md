---
category: user-interface
order: 10
url: features/exportpdf
menu-title: Export to PDF
meta-title-short: Export to PDF
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Exporting content to PDF

<info-box info="">
    This feature is provided through the [Export to PDF](https://ckeditor.com/cke4/addon/exportpdf) plugin that is not included in any official CKEditor 4 preset. You can {@link guide/dev/plugins/README add it to your custom build} with [online builder](https://ckeditor.com/cke4/builder) or download as a [npm package](https://www.npmjs.com/package/ckeditor4-plugin-exportpdf).
</info-box>

## Supported features
	more or less the list of HTML elements that can be exported.

## Feature overview
	1.  Browser support (like CKE4 but without IE\<11 - to be checked before release (for now it works well at least on IE10 too).
    2.  How does it work (sending HTML to CS endpoint and getting binary file).
    3.  Not part of any preset for now.
    4.  Reference to endpoint docs.

## A few "How to" guides
    1.  Best projection (setting editor width - #14).
    2.  Sync and async data processing (`pdfExport` event).
    3.  Dynamic file naming (#13).

## Export to PDF demo

See the {@linkexample exportpdf working "Export to PDF" sample} that showcases the export to PDF process.

## Related Features

Refer to the following resources for more information about working with document in CKEditor 4:

* 
* 
* 
