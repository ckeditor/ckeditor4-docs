<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Magic Line

<p class="requirements">
	This feature is provided through the <a href="https://ckeditor.com/cke4/addon/magicline">Magic Line</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also <a href="#!/guide/dev_plugins">add it to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

Depending on your environment (OS, browser) it might be difficult to place the cursor and add content near some document elements. This pertains to, for example, images, tables or `<div>` elements that start or end a document, lists, or even adjacent horizontal lines.

CKEditor 4 introduced the [Magic Line](https://ckeditor.com/cke4/addon/magicline) plugin that helps overcome these limitations.

## Usage

The Magic Line plugin causes a red line with a handle (<img class="inline" src="guides/dev_magicline/magicline_01.png" alt="Magic Line handle">) to appear when you hover you mouse over any such otherwise inaccessible place in an active editor.

{@img magicline_02.png Using magic line to insert a paragraph inside a nested table.}

When you click the magic line's handle, a new paragraph will be inserted into the document. In this example it was added after a table nested in another table, as visible below.

{@img magicline_03.png A new paragraph inserted after a nested table.}

## Styling the Magic Line

If the default striking red color does not suit you, you can easily modify it by setting the CKEDITOR.config.magicline_color configuration option, for example:

    CKEDITOR.config.magicline_color = '#0000FF';

This will change magic line's color to blue, as presented in the image below.

{@img magicline_04.png Changing the magic line color.}

## Keyboard Shortcuts

To further enhance CKEditor's accessibility, the following [keyboard shortcuts](#!/guide/dev_shortcuts) are available for working with magic line:

* <kbd>Shift+Ctrl+3</kbd> &ndash; Enables enetring content (by adding a new paragraph) **before** a problematic element.
* <kbd>Shift+Ctrl+4</kbd> &ndash; Enables entering content (by adding a new paragraph) **after** a problematic element.

You can also adjust the keyboard shortcuts by setting the CKEDITOR.config.magicline_keystrokeNext and CKEDITOR.config.magicline_keystrokePrevious configuration options, respectively. For example:

    // Changes the keyboard shortcut to Ctrl + ".".
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + 190;

    // Changes the keyboard shortcut to Ctrl + ",".
    CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + 188;

## Adjusting List of Elements Activating Magic Line

It is also possible to modify the default list of elements that trigger the appearance of magic line.

The CKEDITOR.config.magicline_everywhere option activates the all-encompassing mode which causes magic line to appear for all block-level elements as defined in CKEDITOR.dtd.$block.

    CKEDITOR.config.magicline_everywhere = true;

The CKEDITOR.config.magicline_tabuList option lets you blacklist certain elements by providing a list of attributes that, if assigned, prevent magic line from appearing for these elements.

    CKEDITOR.config.magicline_tabuList = [ 'data-tabu' ];

## Magic Line Demo

See the [working "Magic Line" sample](https://sdk.ckeditor.com/samples/magicline.html) that showcases how Magic Line helps solve issues with cursor placement before or after elements such as nested tables, `<div>` elements, adjacent lists, or multiple horizontal rules.
